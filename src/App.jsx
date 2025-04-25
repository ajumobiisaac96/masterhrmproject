// import React from 'react';
// import './styles/custom.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Auth Pages
// import HRregister from './pages/auth/HRregister.jsx';
// import CompanyRegister from './pages/auth/CompanyRegister.jsx';
// import HRlogin from './pages/auth/HRlogin.jsx';
// import Forgotpassword from './pages/auth/Forgotpassword.jsx';
// import Verifyemail from './pages/auth/Verifyemail.jsx';
// import ConfirmPassword from './pages/auth/ConfirmPassword.jsx';

// // Dashboard Pages
// import Dashboard from './pages/Dashboard.jsx';
// import EmployeeManagment from './pages/EmployeeManagment.jsx';
// import Profile from './pages/Profile.jsx';
// import AddEmployee from './pages/AddEmployee.jsx';
// import Department from './pages/Department.jsx';
// import AddDepartment from './pages/AddDepartment.jsx';
// import AddEmployeeDepartment from './pages/AddEmployeeDepartment.jsx';
// import EditDepartment from './pages/EditDepartment.jsx';
// import FirstEditDepartment from './pages/FirstEditDepartment.jsx';
// import SearchEmployee from './pages/SearchEmployee.jsx';
// import AddEmployeeToDepartment from './pages/AddEmployeeToDepartment.jsx';
// import EditProfile from './pages/EditProfile.jsx';
// import SuspendEmployee from './pages/SuspendEmployee.jsx';
// import DeactivateEmployee from './pages/DeactivateEmployee.jsx';
// import AttendanceAndTracking from './pages/AttendanceAndTracking.jsx';
// import LeaveManagment from './pages/LeaveManagment.jsx';
// import PayrollManagement from './pages/PayrollManagement.jsx';
// import AllowanceAndContribution from './pages/AllowanceAndContribution.jsx';
// import ReportAndAnalysis from './pages/ReportAndAnalysis.jsx';
// import AdminProfile from './pages/AdminProfile.jsx';
// import OvertimeHoursTable from './pages/OvertimeHoursTable.jsx';
// import Notification from './pages/Notification.jsx';
// import AttendancePerformanceTable from './pages/AttendancePerformanceTable.jsx';

// // Employee Pages
// import EmployeeDashboard from './EmployeePages/EmployeeSide/pages/EmployeeDashboard.jsx';
// import EmployeeAttendance from './EmployeePages/EmployeeSide/pages/EmployeeAttendance.jsx';
// import EmployeeLeave from './EmployeePages/EmployeeSide/pages/EmployeeLeave.jsx';
// import NewLeaveRequest from './EmployeePages/EmployeeSide/pages/NewLeaveRequest.jsx';
// import ProfileDashboard from './EmployeePages/EmployeeSide/pages/ProfileDashboard.jsx';
// import EmployeeLogin from './EmployeePages/EmployeeSide/pages/EmployeeLogin.jsx';

// // Public Pages
// import LandingPage from './pages/LandingPage.jsx';



// function App() {
//   const isAuthenticated = localStorage.getItem('authData'); // Check if the user is authenticated (token in localStorage)
//   const isEmployeeAuthenticated = localStorage.getItem('employeeAuthToken');

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Navigate to="/LandingPage" />} />
//           <Route path="/companyregister" element={<CompanyRegister />} />
//           <Route path="/register" element={<HRregister />} />
//           <Route path="/login" element={<HRlogin />} />
//           <Route path="/EmployeeLogin" element={<EmployeeLogin />} />

//           {/* Auth Routes */}
//           <Route path="/forgotpassword" element={isAuthenticated ? <Forgotpassword /> : <Navigate to="/login" />} />
//           <Route path="/verifyemail" element={isAuthenticated ? <Verifyemail /> : <Navigate to="/login" />} />
//           <Route path="/confirmPassword" element={isAuthenticated ? <ConfirmPassword /> : <Navigate to="/login" />} />

//           {/* Dashboard Routes */}
//           <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path="/employee-managment" element={isAuthenticated ? <EmployeeManagment /> : <Navigate to="/login" />} />
//           <Route path="/employee-managment/view-profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
//           <Route path="/employee-managment/add-employee" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
//           <Route path="/search-employee" element={isAuthenticated ? <SearchEmployee /> : <Navigate to="/login" />} />
//           <Route path="/add-employee-to-department" element={isAuthenticated ? <AddEmployeeToDepartment /> : <Navigate to="/login" />} />
//           <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
//           <Route path="/employee-managment/suspend-employee" element={isAuthenticated ? <SuspendEmployee /> : <Navigate to="/login" />} />
//           <Route path="/employee-managment/Deactivate-employee" element={isAuthenticated ? <DeactivateEmployee /> : <Navigate to="/login" />} />
//           <Route path="/attendance-and-tracking" element={isAuthenticated ? <AttendanceAndTracking /> : <Navigate to="/login" />} />
//           <Route path="/LeaveManagment" element={isAuthenticated ? <LeaveManagment /> : <Navigate to="/login" />} />
//           <Route path="/PayrollManagement" element={isAuthenticated ? <PayrollManagement /> : <Navigate to="/login" />} />
//           <Route path="/AllowanceAndContribution" element={isAuthenticated ? <AllowanceAndContribution /> : <Navigate to="/login" />} />
//           <Route path="/notification" element={isAuthenticated ? <Notification /> : <Navigate to="/login" />} />
//           <Route path="/ReportAndAnalysis" element={isAuthenticated ? <ReportAndAnalysis /> : <Navigate to="/login" />} />
//           <Route path="/Profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/login" />} />
//           <Route path="/ReportAndAnalysis/OvertimeHours" element={isAuthenticated ? <OvertimeHoursTable /> : <Navigate to="/login" />} />
//           <Route path="/ReportAndAnalysis/AttendancePerformanceTable" element={isAuthenticated ? <AttendancePerformanceTable /> : <Navigate to="/login" />} />


//           {/* Employee Routes */}
//           <Route path="/EmployeeDashboard" element={isEmployeeAuthenticated ? <EmployeeDashboard /> : <Navigate to="/EmployeeLogin" />} />
//           <Route path="/EmployeeAttendance" element={isEmployeeAuthenticated ? <EmployeeAttendance /> : <Navigate to="/EmployeeLogin" />} />
//           <Route path="/EmployeeLeave" element={isEmployeeAuthenticated ? <EmployeeLeave /> : <Navigate to="/EmployeeLogin" />} />
//           <Route path="/EmployeeLeave/NewLeaveRequest" element={isEmployeeAuthenticated ? <NewLeaveRequest /> : <Navigate to="/EmployeeLogin" />} />
//           <Route path="/ProfileDashboard" element={isEmployeeAuthenticated ? <ProfileDashboard /> : <Navigate to="/EmployeeLogin" />} />
          
//           {/* Landing Page */}
//           <Route path="/LandingPage" element={<LandingPage />} />

//           {/* Department Routes */}
//           <Route path="/department" element={isAuthenticated ? <Department /> : <Navigate to="/login" />} />
//           <Route path="/department/edit-department" element={isAuthenticated ? <EditDepartment /> : <Navigate to="/login" />} />
//           <Route path="/department/first-edit-department" element={isAuthenticated ? <FirstEditDepartment /> : <Navigate to="/login" />} />
//           <Route path="/department/add-new-department" element={isAuthenticated ? <AddDepartment /> : <Navigate to="/login" />} />
//           <Route path="/department/add-employee-department" element={isAuthenticated ? <AddEmployeeDepartment /> : <Navigate to="/login" />} />
          
//           {/* Catch-all Route */}
//           <Route path="*" element={<HRlogin />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;







import React from 'react';
import './styles/custom.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';

// Auth Pages
import HRregister from './pages/auth/HRregister.jsx';
import CompanyRegister from './pages/auth/CompanyRegister.jsx';
import HRlogin from './pages/auth/HRlogin.jsx';
import Forgotpassword from './pages/auth/Forgotpassword.jsx';
import Verifyemail from './pages/auth/Verifyemail.jsx';
import ConfirmPassword from './pages/auth/ConfirmPassword.jsx';

//EmployeeAuth pages
import EmployeeLogin from './EmployeePages/EmployeeSide/pages/EmployeeLogin.jsx';
import EmployeeVerifyemail from './EmployeePages/EmployeeSide/pages/EmployeeVerifyemail.jsx';
import EmployeeForgotpassword from './EmployeePages/EmployeeSide/pages/EmployeeForgotpassword.jsx';
import EmployeeConfirmPassword from './EmployeePages/EmployeeSide/pages/EmployeeConfirmPassword.jsx';

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
import EditEmployeeForm from './pages/EditEmployeeForm.jsx';

// Employee Pages
import EmployeeDashboard from './EmployeePages/EmployeeSide/pages/EmployeeDashboard.jsx';
import EmployeeAttendance from './EmployeePages/EmployeeSide/pages/EmployeeAttendance.jsx';
import EmployeeLeave from './EmployeePages/EmployeeSide/pages/EmployeeLeave.jsx';
import NewLeaveRequest from './EmployeePages/EmployeeSide/pages/NewLeaveRequest.jsx';
import ProfileDashboard from './EmployeePages/EmployeeSide/pages/ProfileDashboard.jsx';



// Import TimerProvider
import { TimerProvider } from './context/TimerContext';

function App() {
  const isAuthenticated = localStorage.getItem('authData'); // Check if the user is authenticated (token in localStorage)
  const isEmployeeAuthenticated = localStorage.getItem('employeeAuthToken');

  return (
    // Wrap the entire app with TimerProvider
    <TimerProvider>
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
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/verifyemail" element={<Verifyemail /> } />
            <Route path="/confirmPassword" element={<ConfirmPassword />} />


            {/* EmployeeAuth Routes */}
            <Route path="/EmployeeForgotpassword" element={<EmployeeForgotpassword />} />
            <Route path="/EmployeeVerifyemail" element={<EmployeeVerifyemail />} />
            <Route path="/EmployeeConfirmPassword" element={<EmployeeConfirmPassword />} />

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
            <Route path="/edit-employee" element={isAuthenticated ? <EditEmployeeForm/> : <Navigate to="/login" />} />

            {/* Employee Routes */}
            <Route path="/EmployeeDashboard" element={isEmployeeAuthenticated ? <EmployeeDashboard /> : <Navigate to="/EmployeeLogin" />} />
            <Route path="/EmployeeAttendance" element={isEmployeeAuthenticated ? <EmployeeAttendance /> : <Navigate to="/EmployeeLogin" />} />
            <Route path="/EmployeeLeave" element={isEmployeeAuthenticated ? <EmployeeLeave /> : <Navigate to="/EmployeeLogin" />} />
            <Route path="/EmployeeLeave/NewLeaveRequest" element={isEmployeeAuthenticated ? <NewLeaveRequest /> : <Navigate to="/EmployeeLogin" />} />
            <Route path="/ProfileDashboard" element={isEmployeeAuthenticated ? <ProfileDashboard /> : <Navigate to="/EmployeeLogin" />} />

            {/* Landing Page */}
            <Route path="/LandingPage" element={<LandingPage />} />

            {/* Department Routes */}
            <Route path="/department" element={isAuthenticated ? <Department /> : <Navigate to="/login" />} />
            <Route path="/department/edit-department/:departmentId" element={isAuthenticated ? <EditDepartment /> : <Navigate to="/login" />} />
            <Route path="/department/first-edit-department" element={isAuthenticated ? <FirstEditDepartment /> : <Navigate to="/login" />} />
            <Route path="/department/add-new-department" element={isAuthenticated ? <AddDepartment /> : <Navigate to="/login" />} />
            <Route path="/department/add-employee-department/:departmentId" element={isAuthenticated ? <AddEmployeeDepartment /> : <Navigate to="/login" />} />

            {/* Catch-all Route */}
            <Route path="*" element={<HRlogin />} />
          </Routes>
        </div>
      </Router>
    </TimerProvider>  
  );
}

export default App;
