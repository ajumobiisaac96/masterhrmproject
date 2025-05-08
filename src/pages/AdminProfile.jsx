import { React, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import test from "../assets/test.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faPhone, faLocationDot,
  faUsers, faBuilding, faCalendar,
  faRightFromBracket, faPlus, faEdit, faChartBar, faCamera
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import './AdminProfile.css'; // Import 
import EmployerNavbar from "../components/EmployerNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";  // Add this import at the top of your component
import "react-toastify/dist/ReactToastify.css";  // Add this to import Toastify styles
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  // Add this import
import { logout } from '../utils/Logout'; // Import the logout function



const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent black background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Ensure it's above other content
};

const modalContentStyle = {
  backgroundColor: "#fff", // White background for the modal
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  width: "400px",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // Shadow for the modal
};

const modalButtonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  marginTop: "10px",
};

const cancelButtonStyle = {
  backgroundColor: "gray",
  color: "#fff",
};

const submitButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  marginLeft: "10px",
};



const AdminProfile = () => {
  // ✅ State variables for Company Data
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [newDepartmentCount, setNewDepartmentCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For managing modal visibility
  const [profileImage, setProfileImage] = useState(null); // For storing profile image
  const [imageUploadStatus, setImageUploadStatus] = useState(null); // Track image upload status (success or failure)
  const navigate = useNavigate(); // Hook to navigate
  const [newEmail, setNewEmail] = useState("");          // For storing new email input
  const [newPassword, setNewPassword] = useState("");    // For storing new password input
  const [confirmPassword, setConfirmPassword] = useState(""); // For confirming the new password
  const [currentPassword, setCurrentPassword] = useState(""); // For current password
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // To control email modal visibility
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // To control password modal visibility
  const [successMessage, setSuccessMessage] = useState(null); // For success message
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  // const location = useLocation(); // Get the current path
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Add this state to track logout modal visibility
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] = useState(false); // For managing personal details modal visibility
  const [showSwitchModal, setShowSwitchModal] = useState(false); // For the "Switch to Employee Portal" modal


console.log('recentActivities:', recentActivities); // Log the recent activities
  

  // Open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEmailModal = () => setIsEmailModalOpen(true);
  const closeEmailModal = () => setIsEmailModalOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

const openPersonalDetailsModal = () => {
  if (adminData) {
    setFormData({
      date_of_birth: adminData.date_of_birth || "",
      gender: adminData.gender || "",
      phone_number: adminData.phone_number || "",
      address: adminData.address || "",
    });
  }
  setIsPersonalDetailsModalOpen(true);
};


  const [isEditing, setIsEditing] = useState(false);  // Track if editing is enabled
  const [isSaving, setIsSaving] = useState(false);  // Track if saving changes
  const [formData, setFormData] = useState({
    date_of_birth: "",
    gender: "",
    phone_number: "",
    address: "",
  });

  // Define handleCloseModal function
  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  const [formErrors, setFormErrors] = useState({
    date_of_birth: "",
    gender: "",
    phone_number: "",
    address: "",
  });

  // const companyId = localStorage.getItem("company_id");
  let accessToken = null;

  try {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData.access_token) {
      accessToken = authData.access_token;
    }
  } catch (err) {
    console.error("Error parsing authData from local storage", err);
  }

  // Function to determine greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Fetch admin data from API
  const fetchAdminData = async () => {
    if (!accessToken) {
      console.error("❌ Missing required authentication details:", { accessToken });
      setError("Missing required authentication details");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://proximahr.onrender.com/api/v2/admin/profile`, {
        // params: { company_id: companyId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("✅ API Response:", response.data);
      setAdminData(response.data);

      // Fetch Company Overview Stats
      const apiUrl = `https://proximahr.onrender.com/api/v2/dashboard/company-overview`;
      const companyResponse = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = companyResponse.data;

      // ✅ Update company data State
      setTotalEmployees(data.total_employees);
      setNewDepartmentCount(data.department_count);
      setPendingLeaveCount(data.pending_leave_count);
      setAttendancePercentage(data.attendance_percentage);
      // Remove or comment out this line if it is overwriting the state
      // setRecentActivities(data.recent_activities || []);

      setLoading(false);
    } catch (err) {
      console.error("❌ API request failed:", err.response ? err.response.data : err.message);
      setError("Failed to fetch admin profile");
      setLoading(false);
    }
  };

  // Add this function to fetch recent activities
const fetchRecentActivities = async () => {
  if (!accessToken) {
    console.error("❌ Missing required authentication details:", { accessToken });
    setError("Missing required authentication details");
    return;
  }

  try {
    const response = await axios.get("https://proximahr.onrender.com/api/v2/admin/recent-activities", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("✅ Recent Activities API Response:", response.data); // Log the response
    const activities = response.data.admin_activities || [];
    console.log("Activities to be set in state:", activities); // Log the activities before setting state
    setRecentActivities(activities); // Update state with the correct field
    console.log("Updated Recent Activities State:", activities); // Log the updated state
  } catch (err) {
    console.error("❌ Failed to fetch recent activities:", err.response ? err.response.data : err.message);
    setError("Failed to fetch recent activities");
  }
};

  useEffect(() => {
    fetchAdminData(); // Call fetchAdminData on component mount
    fetchRecentActivities(); // Fetch recent activities
  }, [accessToken]);

useEffect(() => {
  if (accessToken) {
    fetchRecentActivities(); // Fetch recent activities only if accessToken is available
  }
}, [accessToken]);

useEffect(() => {
  console.log("Recent Activities State Updated:", recentActivities);
}, [recentActivities]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);  // Toggle the edit mode
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate each field
    if (!formData.date_of_birth) errors.date_of_birth = "Date of Birth is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.phone_number) errors.phone_number = "Phone Number is required.";
    if (!formData.address) errors.address = "Address is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle profile image change
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageSave = () => {
    // Here, you can call an API to upload the image
    console.log("Profile image saved.");
    setIsModalOpen(false); // Close modal after saving
  };


// Handle file selection (for click-to-upload)
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0]; // For file selection (clicking the "browse" button)
  if (selectedFile) {
    // Check if the file is an image
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(selectedFile); // Convert to DataURL for preview
      setFile(selectedFile); // Store the file for later upload
    } else {
      toast.error("Please upload a valid image file.");
    }
  }
};
  

  const handleSaveImage = async () => {
    if (!file) {
      console.error("❌ No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("image_file", file);  // Ensure 'image_file' matches the backend expectation
  
    setIsSaving(true);  // Indicate saving in progress
  
    try {
      const response = await axios.post(
        "https://proximahr.onrender.com/api/v2/admin/profile-image-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log("✅ Image uploaded successfully:", response.data);
  
      // Update the adminData state
      setAdminData((prevData) => ({
        ...prevData,
        profile_image: response.data.profile_image,
      }));
  
      setImageUploadStatus("File uploaded successfully");
      setIsSaving(false);
      closeModal();
  
      // Reload the page to reflect the changes
      window.location.reload();
    } catch (err) {
      console.error("❌ Error uploading image:", err.response ? err.response.data : err.message);
      setError("Failed to upload image");
      setIsSaving(false);
      setImageUploadStatus("Failed to upload file");
    }
  };
  
  const handleSaveChanges = async () => {
    if (!validateForm()) {
      console.log("❌ Form validation failed. Please check the errors above.");
      return;
    }

    // const companyId = localStorage.getItem("company_id");
    const storedAuthData = localStorage.getItem("authData");
    const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

    if (!token) {
      console.error("❌ Missing company ID or authorization token.");
      return;
    }

    setIsSaving(true);  // Start saving

    try {
      const response = await axios.put(
        "https://proximahr.onrender.com/api/v2/admin/update-admin",
        {
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          phone_number: formData.phone_number,
          address: formData.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },  // Use the auth token in headers
        }
      );
      console.log("✅ Admin profile updated:", response.data);
      setIsSaving(false);  // Stop saving
      setIsEditing(false);  // Exit edit mode
      fetchAdminData();  // Refresh the data from the server to show the latest
    } catch (err) {
      console.error("❌ Error updating admin profile:", err.response ? err.response.data : err.message);
      setError("Failed to update admin profile");
      setIsSaving(false);  // Stop saving in case of an error
    }
  };
  
console.log("Admin Data:", adminData); // Log the admin data to check its structure

const handleEmailChange = async (e) => {
  e.preventDefault(); // Prevent default form submit

  try {
    const response = await axios.post(
      "https://proximahr.onrender.com/api/v2/company/auth/change-email",
      { new_email: newEmail },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setSuccessMessage("Email updated successfully!");
    closeEmailModal(); // Close modal after success
    fetchAdminData(); // Refresh data
  } catch (err) {
    setError("Failed to update email.");
  }
};


const handlePasswordChange = async (e) => {
  e.preventDefault();

  // Validation: Check if the passwords match
  if (newPassword !== confirmPassword) {
    toast.error("New passwords do not match.", { autoClose: 3000 });
    return;
  }

  // Validation: Check if the passwords meet the required strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,100}$/;
  if (!passwordRegex.test(newPassword)) {
    toast.error(
      "Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, and one number.",
      { autoClose: 3000 }
    );
    return;
  }

  // Check if current password is entered
  if (!currentPassword) {
    toast.error("Current password is required.", { autoClose: 3000 });
    return;
  }

  try {
    const response = await axios.post(
      "https://proximahr.onrender.com/api/v2/company/auth/change-password",
      {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // Success: Password change successful
    toast.success("Password changed successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    closePasswordModal(); // Close modal after success
    fetchAdminData(); // Refresh data
  } catch (err) {
    // Error: Display error message
    toast.error(err.response?.data?.detail || "Failed to change password.", {
      autoClose: 3000,
    });
  }
};

// Open and close the "Switch to Employee Portal" modal
const handleSwitchClick = () => setShowSwitchModal(true);
const handleSwitchCancel = () => setShowSwitchModal(false);
const handleSwitchConfirm = () => {
  logout(); // Call the logout function to clear the token
  navigate('/EmployeeLogin'); // Redirect to the Employee Login page
  setShowSwitchModal(false); // Close the modal
};

// Open and close the "Logout" modal
const handleLogoutClick = () => setShowLogoutModal(true);
const handleLogoutCancel = () => setShowLogoutModal(false);
const handleLogoutConfirm = () => {
  logout(); // Call the logout function to clear the token
  navigate('/login'); // Redirect to the Login page
  setShowLogoutModal(false); // Close the modal
};

// Handle the drop of an image file (from drag-and-drop)
const handleDrop = (e) => {
  e.preventDefault(); // Prevent the default behavior (e.g., opening the file)
  
  const file = e.dataTransfer.files[0]; // Get the first dropped file
  
  if (file) {
    // Check if the file is an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file); // Convert to DataURL for preview
      setFile(file); // Store the file for later upload
    } else {
      toast.error("Please drop a valid image file.");
    }
  }
};

const closePersonalDetailsModal = () => {
  setIsPersonalDetailsModalOpen(false); // Close the modal
};


  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="dashboard">
          <EmployerNavbar style={{ width: "100%", display: "flex", justifyContent: "space-between" }} />
          <hr className="horizontal" />

          {loading ? (
            <p>Loading admin profile...</p>
          ) : error ? (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          ) : (
            <>
            {/* 🔹 Profile Section */}
            <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div 
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={adminData?.profile_image || profileImage || test}
                    alt="Admin Profile"
                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  />
                  <FontAwesomeIcon
                    icon={faCamera}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      background: "white",
                      borderRadius: "50%",
                      fontSize: "20px",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsModalOpen(true)} // Open modal to change profile picture
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>
                    {adminData?.first_name} {adminData?.last_name}
                  </h3>
                  <p style={{ margin: "5px 0", color: "#6C757D" }}>{adminData?.email}</p>
                </div>
                </div>

                <button className='switch'  style={{
                  font:'Inter',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight:'100%',
                  padding: '10px 20px',
                  backgroundColor: '#F8F8F8',
                  border: '1px solid #E0E0E0',
                  cursor: 'pointer',
                }}
                onClick={handleSwitchClick} // Add this onClick handler
                >Switch to Employee Portal <FontAwesomeIcon icon="fa-solid fa-repeat" style={{marginLeft:'10px'}} /></button>
              </div>

              {/* Modal for Profile Image */}
{/* Modal for Profile Image */}
{isModalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000, // Ensure it's on top
    }}
  >
    <div
      style={{
        backgroundColor: "#fff", // White background for the modal
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
        width: "400px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // Shadow for the modal
      }}
    >
      <h3>Change Profile Photo</h3>

      {/* Drag-and-Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()} // Allow dragging over the area
        onDrop={handleDrop} // Handle drop event
        style={{
          border: "2px dashed #D0D0D0", // Dashed border for the drop area
          borderRadius: "10px",
          padding: "30px",
          marginBottom: "20px",
          color: "#6C757D",
          cursor: "pointer", // Show pointer cursor to indicate it's clickable
        }}
        onClick={() => document.getElementById("profileImageInput").click()} // Trigger input click
      >
        <p>Drag and drop your file here, or click to browse</p>
        
        {/* Display preview if an image is selected or dropped */}
        {profileImage ? (
          <img
            src={profileImage} // Show the image preview
            alt="Profile Preview"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        ) : (
          <p style={{ fontSize: "12px", color: "#6C757D" }}>Max 5MB, JPEG, PNG</p>
        )}

        {/* Hidden file input to handle file selection */}
        <input
          type="file"
          id="profileImageInput" // The input field for file selection
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the default input field
        />
      </div>

      {/* Save and Cancel Buttons */}
      <div>
        <button
          onClick={handleCloseModal}
          style={{
            backgroundColor: "gray",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSaveImage}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          disabled={isSaving} // Disable while saving
        >
          {isSaving ? "Saving..." : "Save Photo"} {/* Show 'Saving...' while uploading */}
        </button>
      </div>

      {/* Image upload status */}
      {imageUploadStatus && (
        <p
          style={{
            color: imageUploadStatus.includes("Failed")
              ? "red"
              : "green",
          }}
        >
          {imageUploadStatus}
        </p>
      )}
    </div>
  </div>
)}


              {/* Email Modal */}
                {isEmailModalOpen && (
                  <div style={backdropStyle}>
                    <div style={modalContentStyle}>
                      <h4>Change Email</h4>
                      <form onSubmit={handleEmailChange}>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="Enter new email"
                          required
                          style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                        <button type="button" onClick={closeEmailModal} style={{ ...modalButtonStyle, ...cancelButtonStyle }}>
                            Cancel
                          </button>
                          
                          <button type="submit" style={{ ...modalButtonStyle, ...submitButtonStyle }}>
                            Save Email
                          </button>

                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Password Modal */}
{isPasswordModalOpen && (
  <div style={backdropStyle}>
    <div style={modalContentStyle}>
      <h4>Change Password</h4>
      <form onSubmit={handlePasswordChange}>
        {/* Current Password */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <FontAwesomeIcon
            icon={isPasswordVisible ? faEyeSlash : faEye} // Toggle between eye and eye-slash
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
          />
        </div>

        {/* New Password */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type={isNewPasswordVisible ? "text" : "password"} // Toggle password visibility
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <FontAwesomeIcon
            icon={isNewPasswordVisible ? faEyeSlash : faEye} // Toggle between eye and eye-slash
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)} // Toggle visibility
          />
        </div>

        {/* Confirm Password */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"} // Toggle password visibility
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            style={{ padding: "10px", width: "100%" }}
          />
          <FontAwesomeIcon
            icon={isConfirmPasswordVisible ? faEyeSlash : faEye} // Toggle between eye and eye-slash
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} // Toggle visibility
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={closePasswordModal}
            style={{ ...modalButtonStyle, ...cancelButtonStyle }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ ...modalButtonStyle, ...submitButtonStyle }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
)}



              {/* 🔹 Stats Section */}
              <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                {[ 
                  { icon: faUsers, label: "Total Employees", value: totalEmployees },
                  { icon: faBuilding, label: "Departments", value: newDepartmentCount },
                  { icon: faCalendar, label: "Pending Leaves", value: pendingLeaveCount }
                ].map((stat, index) => (
                  <div key={index} style={{ flex: 1, textAlign: "center", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                    <FontAwesomeIcon icon={stat.icon} style={{ fontSize: "20px", marginBottom: "10px", color: "#007BFF" }} />
                    <h5 style={{ margin: 0 }}>{stat.value}</h5>
                    <p style={{ color: "#6C757D", margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* 🔹 Employee Actions Section */}
                <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                  {[
                    { icon: faPlus, label: "Add Employees", color: "#007BFF", route: "/employee-managment/add-employee" },
                    { icon: faEdit, label: "Edit Department", color: "#FFC107", route: "/Department" },
                    { icon: faChartBar, label: "View Report", color: "#28A745", route: "/ReportAndAnalysis" }
                  ].map((action, index) => (
                    <div 
                      key={index}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "20px", background: "#fff", borderRadius: "10px", width: "100%",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", margin: "0 15px", cursor: "pointer"
                      }}
                      onClick={() => navigate(action.route)} // Navigate to the specified route
                    >
                      <FontAwesomeIcon icon={action.icon} style={{ fontSize: "20px", color: action.color, marginBottom: "10px" }} />
                      <h5 style={{ margin: 0, fontSize: "14px", color: "#333" }}>{action.label}</h5>
                    </div>
                  ))}
                </div>

              {/* Personal Details Section */}
                  <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                    <h5>Personal Details</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      <p>Date of Birth: <br /> <strong>{new Date(adminData?.date_of_birth).toLocaleDateString() || "N/A"}</strong></p>
                      <p>Gender: <br /> <strong>{adminData?.gender || "N/A"}</strong></p>
                      <p>Phone: <br /> <strong>{adminData?.phone_number || "N/A"}</strong></p>
                      <p>Address: <br /> <strong>{adminData?.address || "N/A"}</strong></p>
                      <button onClick={openPersonalDetailsModal} style={{ color: '#007BFF', fontSize: '16px', border: 'none', background: 'none', cursor: 'pointer' }}>
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Modal for Editing Personal Details */}
                  {isPersonalDetailsModalOpen && (
                    <div style={backdropStyle}>
                      <div style={modalContentStyle}>
                        <h4>Edit Personal Details</h4>
                        <form onSubmit={handleSaveChanges}>
                          <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            placeholder="Date of Birth"
                            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
                          />
                          <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            placeholder="Gender"
                            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
                          />
                          <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
                          />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
                          />
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button type="button" onClick={closePersonalDetailsModal} style={{ ...modalButtonStyle, ...cancelButtonStyle }}>
                              Cancel
                            </button>
                            <button type="submit" style={{ ...modalButtonStyle, ...submitButtonStyle }}>
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

              {error && <div className="error-box">{error}</div>}
              {successMessage && <div className="success-box">{successMessage}</div>}

              {/* Account Details */}
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", fontStyle:'Inter' }}>
                <h5>Account Details</h5>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                  <p style={{fontFamily:'Inter', fontSize:'16px', }} >Email:  <br /> <strong>{adminData?.email}</strong></p>
                  <button onClick={openEmailModal} style={{color:'#007BFF' , fontSize:'16px', border:'none', background:'none', cursor:'pointer'}} >Edit Email</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
                  <p style={{fontFamily:'Inter', fontSize:'16px', }}>Password: <br /> <strong>**********</strong></p>
                  <button onClick={openPasswordModal} style={{color:'#007BFF' , fontSize:'16px', border:'none', background:'none', cursor:'pointer'}} >Edit Password</button>
                </div>
              </div>

              {/* 🔹 Recent System Activity */}
                <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                  <h5 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>Recent System Activity</h5>
                  {recentActivities && recentActivities.length > 0 ? (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", fontSize: "16px" }}>Action</th>
                          <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", fontSize: "16px" }}>Timestamp</th>
                          <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd", fontWeight: "bold", fontSize: "16px" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivities.map((activity) => (
                          <tr key={activity._id}>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontSize: "14px", color: "#333" }}>{activity.action}</td>
                            <td style={{ padding: "10px", borderBottom: "1px solid #ddd", fontSize: "14px", color: "#333" }}>
                              {new Date(activity.timestamp).toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                borderBottom: "1px solid #ddd",
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: activity.status === "success" ? "#22C55E" : "#FF6464",
                              }}
                            >
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ textAlign: "center", color: "#6C757D", fontSize: "14px" }}>No recent activity</p>
                  )}
                </div>

              <div style={{ display: "flex", justifyContent:'flex-end', marginTop: "20px" }}>
                {/* Logout Button */}
                <button
                  style={{
                    background: "red",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>

            </>
          )}
        </div>
      </div>

      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', /* Transparent black background */
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000, /* Ensure the modal is on top */
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '300px',
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>
              Are you sure you want to Switch to Employee Portal?
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
              <button 
                onClick={handleLogoutCancel} 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#D9D9D9',
                  border: '1px solid #D9D9D9 ',
                  color: '#2E2E2E',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                No
              </button>
              <button 
                onClick={handleLogoutConfirm} 
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FF6464',
                  border: '1px solid',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Personal Details */}
      {isPersonalDetailsModalOpen && (
        <div style={backdropStyle}>
          <div style={modalContentStyle}>
            <h4>Edit Personal Details</h4>
            <form onSubmit={handleSaveChanges}>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                placeholder="Date of Birth"
                style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
              />
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                placeholder="Gender"
                style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
              />
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Phone Number"
                style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" onClick={closePersonalDetailsModal} style={{ ...modalButtonStyle, ...cancelButtonStyle }}>
                  Cancel
                </button>
                <button type="submit" style={{ ...modalButtonStyle, ...submitButtonStyle }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Switch to Employee Portal Modal */}
{showSwitchModal && (
  <div style={backdropStyle}>
    <div style={modalContentStyle}>
      <h3 style={{ marginBottom: "20px" }}>Do you want to switch to the Employee Portal?</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleSwitchCancel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D9D9D9",
            border: "1px solid #D9D9D9",
            color: "#2E2E2E",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          No
        </button>
        <button
          onClick={handleSwitchConfirm}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            border: "1px solid",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

{/* Logout Modal */}
{showLogoutModal && (
  <div style={backdropStyle}>
    <div style={modalContentStyle}>
      <h3 style={{ marginBottom: "20px" }}>Are you sure you want to log out?</h3>
      <p style={{ font: 'Inter', weight: '400', fontSize: '14px', textAlign: 'center' }}>
        You’ll be signed out from Proxima. Save all changes before logging out.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
        <button
          onClick={handleLogoutCancel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D9D9D9",
            border: "1px solid #D9D9D9",
            color: "#2E2E2E",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          No
        </button>
        <button
          onClick={handleLogoutConfirm}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            border: "1px solid",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
      
    </div>
  );
};

export default AdminProfile;

