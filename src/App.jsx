  // import React from 'react';
  // import './styles/custom.css';
  // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  // import PrivateRoute from './pages/PrivateComponent.jsx';
  // import HRregister from './pages/auth/HRregister.jsx';
  // import CompanyRegister from './pages/auth/CompanyRegister.jsx';
  // import HRlogin from './pages/auth/HRlogin.jsx';
  // import Forgotpassword from './pages/auth/Forgotpassword.jsx';
  // import Verifyemail from './pages/auth/Verifyemail.jsx';
  // import ConfirmPassword from './pages/auth/ConfirmPassword.jsx';
  // import Dashboard from './pages/Dashboard.jsx';
  // import EmployeeManagment from './pages/EmployeeManagment.jsx';
  // import Profile from './pages/Profile.jsx';
  // import AddEmployee from './pages/AddEmployee.jsx';
  // import Department from './pages/Department.jsx'
  // import AddDepartment from './pages/AddDepartment.jsx';
  // import AddEmployeeDepartment from './pages/AddEmployeeDepartment.jsx'
  // import EditDepartment from './pages/EditDepartment.jsx'
  // import FirstEditDepartment from './pages/FirstEditDepartment.jsx'
  // import SearchEmployee from './pages/SearchEmployee.jsx';
  // import AddEmployeeToDepartment from './pages/AddEmployeeToDepartment.jsx'
  // import EditProfile from './pages/EditProfile.jsx'
  // import SuspendEmployee from './pages/SuspendEmployee.jsx'
  // import DeactivateEmployee from './pages/DeactivateEmployee.jsx'
  // import AttendanceAndTracking from './pages/AttendanceAndTracking.jsx'
  // import LeaveManagment from './pages/LeaveManagment.jsx'
  // import PayrollManagement from './pages/PayrollManagement.jsx'
  // import AllowanceAndContribution from './pages/AllowanceAndContribution.jsx';
  // import ReportAndAnalysis from './pages/ReportAndAnalysis.jsx';
  // import AdminProfile from './pages/AdminProfile.jsx';
  // import OvertimeHoursTable from './pages/OvertimeHoursTable.jsx'
  // import Notification from './pages/Notification.jsx';
  // import AttendancePerformanceTable from './pages/AttendancePerformanceTable.jsx'
  // import LandingPage from './pages/LandingPage.jsx';
  // import EmployeeDashboard from './EmployeePages/EmployeeSide/pages/EmployeeDashboard.jsx'
  // import EmployeeAttendance from './EmployeePages/EmployeeSide/pages/EmployeeAttendance.jsx'
  // import EmployeeLeave from './EmployeePages/EmployeeSide/pages/EmployeeLeave.jsx'
  // import NewLeaveRequest from './EmployeePages/EmployeeSide/pages/NewLeaveRequest.jsx'
  // import ProfileDashboard from './EmployeePages/EmployeeSide/pages/ProfileDashboard.jsx'
  // import EmployeeLogin from './EmployeePages/EmployeeSide/pages/EmployeeLogin.jsx'


  // function App() {
  //   return (
  //     <Router>
  //       <div className="App">
  //         <Routes>
  //           <Route path="/" element={<Navigate to="/Landingpage" />}/>
  //           <Route path="/companyregister" element={<CompanyRegister />} />
  //           <Route path="/register" element={<HRregister />} />
  //           <Route path="/login" element={<HRlogin />} />
  //           <PrivateRoute path="/forgotpassword" element={<Forgotpassword />} />
  //           <PrivateRoute path="/verifyemail" element={<Verifyemail/>} />
  //           <PrivateRoute path="/confirmPassword" element={<ConfirmPassword/>} />
  //           <PrivateRoute path="/dashboard" element={<Dashboard/>} />
  //           <PrivateRoute path="/department" element={<Department/>} />
  //           <PrivateRoute path="/department/edit-department" element={<EditDepartment/>} />
  //           <PrivateRoute path="/department/first-edit-department" element={<FirstEditDepartment/>} />
  //           <PrivateRoute path="/department/add-new-department" element={<AddDepartment/>} />
  //           <PrivateRoute path="/department/add-employee-department" element={<AddEmployeeDepartment/>} />
  //           <PrivateRoute path="/employee-managment" element={<EmployeeManagment/>} />
  //           <PrivateRoute path="/employee-managment/view-profile" element={<Profile/>} />
  //           <PrivateRoute path="/employee-managment/add-employee" element={<AddEmployee/>} />
  //           <PrivateRoute path="/search-employee" element={<SearchEmployee/>} />
  //           <PrivateRoute path="/add-employee-to-department" element={<AddEmployeeToDepartment/>} />
  //           <PrivateRoute path="/edit-profile" element={<EditProfile/>} />
  //           <PrivateRoute path="/employee-managment/suspend-employee" element={<SuspendEmployee/>} />
  //           <PrivateRoute path="/employee-managment/Deactivate-employee" element={<DeactivateEmployee/>} />
  //           <PrivateRoute path="/attendance-and-tracking" element={<AttendanceAndTracking/>} />
  //           <PrivateRoute path="/LeaveManagment" element={<LeaveManagment/>} />
  //           <PrivateRoute path="/PayrollManagement" element={<PayrollManagement/>} />
  //           <PrivateRoute path="/AllowanceAndContribution" element={<AllowanceAndContribution/>} />
  //           <PrivateRoute path="/notification" element={<Notification/>} />
  //           <PrivateRoute path="/ReportAndAnalysis" element={<ReportAndAnalysis/>} />
  //           <PrivateRoute path="/Profile" element={<AdminProfile/>} />
  //           <PrivateRoute path="/ReportAndAnalysis/OvertimeHours" element={<OvertimeHoursTable/>} />
  //           <PrivateRoute path="/ReportAndAnalysis/AttendancePerformanceTable" element={<AttendancePerformanceTable/>} />
  //           <PrivateRoute path="/LandingPage" element={<LandingPage/>} />
  //           <PrivateRoute path="/EmployeeDashboard" element={<EmployeeDashboard/>} />
  //           <PrivateRoute path="/EmployeeAttendance" element={<EmployeeAttendance/>} />
  //           <PrivateRoute path="/EmployeeLeave" element={< EmployeeLeave/>} />
  //           <PrivateRoute path="/EmployeeLeave/NewLeaveRequest" element={< NewLeaveRequest/>} />
  //           <PrivateRoute path="/ProfileDashboard" element={< ProfileDashboard/>} />
  //           <Route path="/EmployeeLogin" element={< EmployeeLogin/>} />
  //           <Route path="*"  element={<HRlogin />} />
  //         </Routes>
  //       </div>
  //     </Router>
  //   );
  // }

  // export default App;

























  import React from 'react';
import './styles/custom.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import HRregister from './pages/auth/HRregister.jsx';
import CompanyRegister from './pages/auth/CompanyRegister.jsx';
import HRlogin from './pages/auth/HRlogin.jsx';
import Forgotpassword from './pages/auth/Forgotpassword.jsx';
import Verifyemail from './pages/auth/Verifyemail.jsx';
import ConfirmPassword from './pages/auth/ConfirmPassword.jsx';

// Dashboard Pages
import Dashboard from './pages/Dashboard.jsx';
import EmployeeManagment from './pages/EmployeeManagment.jsx';
import Profile from './pages/Profile.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import Department from './pages/Department.jsx';
import AddDepartment from './pages/AddDepartment.jsx';
import AddEmployeeDepartment from './pages/AddEmployeeDepartment.jsx';
import EditDepartment from './pages/EditDepartment.jsx';
import FirstEditDepartment from './pages/FirstEditDepartment.jsx';
import SearchEmployee from './pages/SearchEmployee.jsx';
import AddEmployeeToDepartment from './pages/AddEmployeeToDepartment.jsx';
import EditProfile from './pages/EditProfile.jsx';
import SuspendEmployee from './pages/SuspendEmployee.jsx';
import DeactivateEmployee from './pages/DeactivateEmployee.jsx';
import AttendanceAndTracking from './pages/AttendanceAndTracking.jsx';
import LeaveManagment from './pages/LeaveManagment.jsx';
import PayrollManagement from './pages/PayrollManagement.jsx';
import AllowanceAndContribution from './pages/AllowanceAndContribution.jsx';
import ReportAndAnalysis from './pages/ReportAndAnalysis.jsx';
import AdminProfile from './pages/AdminProfile.jsx';
import OvertimeHoursTable from './pages/OvertimeHoursTable.jsx';
import Notification from './pages/Notification.jsx';
import AttendancePerformanceTable from './pages/AttendancePerformanceTable.jsx';

// Employee Pages
import EmployeeDashboard from './EmployeePages/EmployeeSide/pages/EmployeeDashboard.jsx';
import EmployeeAttendance from './EmployeePages/EmployeeSide/pages/EmployeeAttendance.jsx';
import EmployeeLeave from './EmployeePages/EmployeeSide/pages/EmployeeLeave.jsx';
import NewLeaveRequest from './EmployeePages/EmployeeSide/pages/NewLeaveRequest.jsx';
import ProfileDashboard from './EmployeePages/EmployeeSide/pages/ProfileDashboard.jsx';
import EmployeeLogin from './EmployeePages/EmployeeSide/pages/EmployeeLogin.jsx';

// Public Pages
import LandingPage from './pages/LandingPage.jsx';



function App() {
  const isAuthenticated = localStorage.getItem('authData'); // Check if the user is authenticated (token in localStorage)

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/LandingPage" />} />
          <Route path="/companyregister" element={<CompanyRegister />} />
          <Route path="/register" element={<HRregister />} />
          <Route path="/login" element={<HRlogin />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />

          {/* Auth Routes */}
          <Route path="/forgotpassword" element={isAuthenticated ? <Forgotpassword /> : <Navigate to="/login" />} />
          <Route path="/verifyemail" element={isAuthenticated ? <Verifyemail /> : <Navigate to="/login" />} />
          <Route path="/confirmPassword" element={isAuthenticated ? <ConfirmPassword /> : <Navigate to="/login" />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/employee-managment" element={isAuthenticated ? <EmployeeManagment /> : <Navigate to="/login" />} />
          <Route path="/employee-managment/view-profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/employee-managment/add-employee" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
          <Route path="/search-employee" element={isAuthenticated ? <SearchEmployee /> : <Navigate to="/login" />} />
          <Route path="/add-employee-to-department" element={isAuthenticated ? <AddEmployeeToDepartment /> : <Navigate to="/login" />} />
          <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/employee-managment/suspend-employee" element={isAuthenticated ? <SuspendEmployee /> : <Navigate to="/login" />} />
          <Route path="/employee-managment/Deactivate-employee" element={isAuthenticated ? <DeactivateEmployee /> : <Navigate to="/login" />} />
          <Route path="/attendance-and-tracking" element={isAuthenticated ? <AttendanceAndTracking /> : <Navigate to="/login" />} />
          <Route path="/LeaveManagment" element={isAuthenticated ? <LeaveManagment /> : <Navigate to="/login" />} />
          <Route path="/PayrollManagement" element={isAuthenticated ? <PayrollManagement /> : <Navigate to="/login" />} />
          <Route path="/AllowanceAndContribution" element={isAuthenticated ? <AllowanceAndContribution /> : <Navigate to="/login" />} />
          <Route path="/notification" element={isAuthenticated ? <Notification /> : <Navigate to="/login" />} />
          <Route path="/ReportAndAnalysis" element={isAuthenticated ? <ReportAndAnalysis /> : <Navigate to="/login" />} />
          <Route path="/Profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/login" />} />
          <Route path="/ReportAndAnalysis/OvertimeHours" element={isAuthenticated ? <OvertimeHoursTable /> : <Navigate to="/login" />} />
          <Route path="/ReportAndAnalysis/AttendancePerformanceTable" element={isAuthenticated ? <AttendancePerformanceTable /> : <Navigate to="/login" />} />

          {/* Employee Routes */}
          <Route path="/EmployeeDashboard" element={isAuthenticated ? <EmployeeDashboard /> : <Navigate to="/login" />} />
          <Route path="/EmployeeAttendance" element={isAuthenticated ? <EmployeeAttendance /> : <Navigate to="/login" />} />
          <Route path="/EmployeeLeave" element={isAuthenticated ? <EmployeeLeave /> : <Navigate to="/login" />} />
          <Route path="/EmployeeLeave/NewLeaveRequest" element={isAuthenticated ? <NewLeaveRequest /> : <Navigate to="/login" />} />
          <Route path="/ProfileDashboard" element={isAuthenticated ? <ProfileDashboard /> : <Navigate to="/login" />} />
          
          {/* Landing Page */}
          <Route path="/LandingPage" element={<LandingPage />} />

          {/* Department Routes */}
          <Route path="/department" element={isAuthenticated ? <Department /> : <Navigate to="/login" />} />
          <Route path="/department/edit-department" element={isAuthenticated ? <EditDepartment /> : <Navigate to="/login" />} />
          <Route path="/department/first-edit-department" element={isAuthenticated ? <FirstEditDepartment /> : <Navigate to="/login" />} />
          <Route path="/department/add-new-department" element={isAuthenticated ? <AddDepartment /> : <Navigate to="/login" />} />
          <Route path="/department/add-employee-department" element={isAuthenticated ? <AddEmployeeDepartment /> : <Navigate to="/login" />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<HRlogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
