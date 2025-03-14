import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './PayrollManagement.css';
import test from '../assets/test.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EmployerNavbar from "../components/EmployerNavbar";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const PayrollManagement = () => {
  const [payrollSummary, setPayrollSummary] = useState({ totalCost: 0, pendingPayment: 0, approvedPayment: 0, upcomingSalary: '' });
  const [payrollTrend, setPayrollTrend] = useState({ months: [], payrollCosts: [] });
  const [payrollDistribution, setPayrollDistribution] = useState({ labels: [], data: [] });
  const [employees, setEmployees] = useState([]);
  const [visibleEmployees, setVisibleEmployees] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYearTrend, setSelectedYearTrend] = useState(new Date().getFullYear());
  const [selectedYearDistribution, setSelectedYearDistribution] = useState(new Date().getFullYear());
  const [selectedYearTable, setSelectedYearTable] = useState(new Date().getFullYear());  
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [statusList] = useState(['All', 'Paid', 'Processing', 'Unpaid']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📌 **UseRef to capture charts for PDF download**
  const chartsRef = useRef(null);

  useEffect(() => {
    const fetchPayrollData = async () => {
      setLoading(true);
      setError("");
      try {
        const companyId = localStorage.getItem("company_id");
        if (!companyId) throw new Error("Company ID is missing.");

        const storedAuthData = localStorage.getItem("authData");
        if (!storedAuthData) throw new Error("Authentication data is missing.");

        const authData = JSON.parse(storedAuthData);
        const token = authData?.token;
        if (!token) throw new Error("Authentication token is missing.");

        const [summaryRes, trendRes, distributionRes, employeesRes] = await Promise.all([
          fetch(`https://proximahr.onrender.com/payroll-management/summary?company_id=${companyId}`, {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          }),
          fetch(`https://proximahr.onrender.com/payroll-management/cost-trend?company_id=${companyId}&year=${selectedYearTrend}`, {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          }),

          fetch(`https://proximahr.onrender.com/payroll-management/cost-distribution?company_id=${companyId}&year=${selectedYearDistribution}`, {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          }),
          fetch(`https://proximahr.onrender.com/payroll-management/employees?company_id=${companyId}&year=${selectedYearTable}`, {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          }),
        ]);

        if (!summaryRes.ok || !trendRes.ok || !distributionRes.ok || !employeesRes.ok) {
          throw new Error("Failed to fetch payroll data.");
        }

        const [summary, trend, distribution, employeesData] = await Promise.all([
          summaryRes.json(),
          trendRes.json(),
          distributionRes.json(),
          employeesRes.json(),
        ]);
        
        // 🔍 Check API response in console
        console.log("Payroll Trend API Response:", trend);

        console.log("Employees API Response:", employeesData);

        setPayrollSummary({
          totalCost: summary.payroll_cost || 0,
          pendingPayment: summary.pending_payment_count || 0,
          approvedPayment: summary.approved_payroll_count || 0,
          upcomingSalary: summary.upcoming_salary_date ? new Date(summary.upcoming_salary_date).toLocaleDateString('en-GB').replace(/\//g, '-') : ''
        });

        setPayrollTrend({
          months: trend?.payroll_cost_trend?.length
            ? trend.payroll_cost_trend.map(item => `Month ${item.month}`)
            : ["No Data"],
          payrollCosts: trend?.payroll_cost_trend?.length
            ? trend.payroll_cost_trend.map(item => item.payroll_cost)
            : [0]
        });
        
        
          setPayrollDistribution(
            distribution?.allowances_and_contributions ||
            distribution?.deductions ||
            distribution?.net_pay
              ? {
                  labels: ["Allowances & Contributions", "Deductions", "Net Pay"],
                  data: [
                    distribution.allowances_and_contributions ?? 0,
                    distribution.deductions ?? 0,
                    distribution.net_pay ?? 0,
                  ],
                }
              : { labels: [], data: [] } // ❌ Empty if no records exist
          );

        

        const employeesList = employeesData?.employees_data || [];
        setEmployees(employeesList);
        setDepartments(['All', ...new Set(employeesList.map(emp => emp.department))]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  fetchPayrollData();
}, [selectedYearTrend, selectedYearDistribution, selectedYearTable]); // <- This ensures data updates when year changes

  const filteredEmployees = employees.filter(emp => {
    return (
      (searchTerm === '' || emp.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === 'All' || emp.department === selectedDepartment) &&
      (selectedStatus === 'All' || emp.payment_status.toLowerCase() === selectedStatus.toLowerCase())
    );
  });

  // Function to show more employees
  const handleViewMore = () => {
    setVisibleEmployees(prev => prev + 10);
  };

  const handleYearChangeTable = (event) => {
    setSelectedYearTable(event.target.value);
  };
  const handleYearChangeTrend = (event) => {
    setSelectedYearTrend(event.target.value);
  };
  const handleYearChangeDistribution = (event) => {
    setSelectedYearDistribution(event.target.value);
  };
  

  // 📌 **Function to download charts as PDF**
  const downloadPDF = () => {
    if (!chartsRef.current) {
      console.error("Charts container is missing");
      return;
    }

    html2canvas(chartsRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 120);
      pdf.save("payroll-charts.pdf");
    });
  };

  return (
        <div>
          <div className="main-dashboard">
            <Sidebar />
            <div className="dashboard">
              <EmployerNavbar />
              <hr className="horizontal" />
              <div className="dashboard-details">
                <h5>Payroll Management</h5>
                <h6>{new Date().toDateString()}</h6>
              </div>
    
               {/* Get Payroll Summary */}
               <div className="dashboard-details-1">
                <div className="first-grid">
                  <FontAwesomeIcon icon="fa-circle-check" className="dashboard-icon-1" style={{ color: '#22C55E' }} />
                  <div>
                    <h6>Total Payroll Cost</h6>
                    <h5>₦{payrollSummary.totalCost.toLocaleString()}</h5>
                  </div>
                </div>
                <div className="first-grid">
                  <FontAwesomeIcon icon="fa-solid fa-calendar" className="dashboard-icon-2" style={{ color: '#007BFF' }} />
                  <div>
                    <h6>Pending Payment</h6>
                    <h5>{payrollSummary.pendingPayment} employees</h5>
                  </div>
                </div>
                <div className="first-grid">
                  <FontAwesomeIcon icon="fa-clock" className="dashboard-icon-3" style={{ color: '#6F42C1' }} />
                  <div>
                    <h6>Approved Payment</h6>
                    <h5>{payrollSummary.approvedPayment} employees</h5>
                  </div>
                </div>
                <div className="first-grid">
                  <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className="dashboard-icon-4" style={{ color: '#FF6464' }} />
                  <div>
                    <h6>Upcoming Salary</h6>
                    <h5>{payrollSummary.upcomingSalary}</h5>
                  </div>
                </div>
              </div>
    
              <div className="payroll-management-charts">
                      {/* Payroll Cost Trend Chart */}
                      <div className="chart-container trend-chart" 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          height: '400px', 
                          padding: '20px', 
                          boxSizing: 'border-box', 
                          overflow: 'hidden'
                        }}
                      >
                        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Payroll Cost Trend</h3>

                        <select 
                          className="filter-select" 
                          value={selectedYearTrend} 
                          onChange={(e) => setSelectedYearTrend(e.target.value)}
                          style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }}
                        >
                          {[...Array(10).keys()].map((i) => (
                            <option key={i} value={new Date().getFullYear() - i}>
                              {new Date().getFullYear() - i}
                            </option>
                          ))}
                        </select>

                        {/* Ensure Chart Expands Inside the Box */}
                        <div style={{ width: '100%', height: '320px', display: 'flex', justifyContent: 'center' }}>
                          {payrollTrend.payrollCosts.length > 0 && payrollTrend.payrollCosts.some(value => value !== 0) ? (
                            <Line
                              data={{
                                labels: payrollTrend.months,
                                datasets: [{
                                  label: 'Payroll Cost Trend',
                                  data: payrollTrend.payrollCosts,
                                  borderColor: '#36A2EB',
                                  fill: false
                                }]
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false, // Allows chart to stretch inside container
                                plugins: {
                                  legend: { display: true, position: "bottom" }
                                }
                              }}
                            />
                          ) : (
                            <p style={{ textAlign: 'center', fontSize: '16px', color: 'red', marginTop: '50px' }}>
                              No records found for {selectedYearTrend}.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Payroll Cost Distribution Chart */}
                      <div className="chart-container distribution-chart" 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          height: '400px', 
                          padding: '20px', 
                          boxSizing: 'border-box', 
                          overflow: 'hidden'
                        }}
                      >
                        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Payroll Cost Distribution</h3>

                        <select 
                          className="filter-select" 
                          value={selectedYearDistribution} 
                          onChange={(e) => setSelectedYearDistribution(e.target.value)}
                          style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }}
                        >
                          {[...Array(10).keys()].map((i) => (
                            <option key={i} value={new Date().getFullYear() - i}>
                              {new Date().getFullYear() - i}
                            </option>
                          ))}
                        </select>

                        {/* Ensure Chart Expands Inside the Box */}
                        <div style={{ width: '100%', height: '320px', display: 'flex', justifyContent: 'center' }}>
                          {payrollDistribution.data.some(value => value !== 0) && payrollDistribution.labels.length > 0 ? (
                            <Doughnut
                              data={{
                                labels: payrollDistribution.labels,
                                datasets: [{
                                  data: payrollDistribution.data,
                                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                                }]
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false, // Allows chart to stretch inside container
                                plugins: {
                                  legend: { display: true, position: "bottom" }
                                }
                              }}
                            />
                          ) : (
                            <p style={{ textAlign: 'center', fontSize: '16px', color: 'red', marginTop: '50px' }}>
                              No records found for {selectedYearDistribution}.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

 


          {/* Save PDF Button (Now Working ✅) */}
          <div>
            <button onClick={downloadPDF} className="save-pdf-btn">Save PDF</button>
          </div>
          

            {/* Search & Filters */}
            <div className="number-of-employee">
                        <div className="new-div-1">
                        <div className="number-of-employee">
                            <input type="text" placeholder="Search employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <select className="filter-select" value={selectedYearTable} onChange={(e) => setSelectedYearTable(e.target.value)}>
                              {[...Array(10).keys()].map((i) => (
                                <option key={i} value={new Date().getFullYear() - i}>
                                  {new Date().getFullYear() - i}
                                </option>
                              ))}
                            </select>

                          </div>
                        </div>
                        <div className="filters">
                          <select className="filter-select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                            {departments.map((dept, index) => (
                              <option key={index} value={dept}>{dept}</option>
                            ))}
                          </select>
                          <select className="filter-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            {statusList.map((status, index) => (
                              <option key={index} value={status}>{status}</option>
                            ))}
                          </select>
                          <button className="btn">
                            <FontAwesomeIcon icon={faFilter} /> Filter
                          </button>
                        </div>
                      </div>
              <div className="filtered-results">
                <h2>All</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p style={{ color: 'red' }}>{error}</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Base Salary</th>
                        <th>Deductions (PAYE)</th>
                        <th>Net Pay</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee, index) => (
                        <tr key={index}>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>₦{employee.base_salary?.toLocaleString()}</td>
                          <td>₦{employee.deductions?.toLocaleString()}</td>
                          <td>₦{employee.net_pay?.toLocaleString()}</td>
                          <td>{employee.payment_status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', fontSize: '16px', color: 'red', padding: '20px' }}>
                          No records found for {selectedYearTable}.
                        </td>
                      </tr>
                    )}

                    </tbody>
                  </table>
                )}
              </div>
          {/* View Allowance & View More Buttons */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent:"flex-end", gap: '20px' }}>
            <Link to='/AllowanceAndContribution'><button className="view-allowance-btn">View Allowance</button></Link>
            <button onClick={handleViewMore} className="view-more-btn">View More</button>
          </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default PayrollManagement;