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
import EmployerNavbar from "../components/EmployerNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  // Open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const companyId = localStorage.getItem("company_id");
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
    if (!companyId || !accessToken) {
      console.error("❌ Missing required authentication details:", { companyId, accessToken });
      setError("Missing required authentication details");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://proximahr.onrender.com/api/v2/admin/profile`, {
        params: { company_id: companyId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("✅ API Response:", response.data);
      setAdminData(response.data);

      // Fetch Company Overview Stats
      const apiUrl = `https://proximahr.onrender.com/api/v2/dashboard/company-overview?company_id=${companyId}`;
      const companyResponse = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = companyResponse.data;

      // ✅ Update company data State
      setTotalEmployees(data.total_employees);
      setNewDepartmentCount(data.department_count);
      setPendingLeaveCount(data.pending_leave_count);
      setAttendancePercentage(data.attendance_percentage);
      setRecentActivities(data.recent_activities || []);

      setLoading(false);
    } catch (err) {
      console.error("❌ API request failed:", err.response ? err.response.data : err.message);
      setError("Failed to fetch admin profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData(); // Call fetchAdminData on component mount
  }, [companyId, accessToken]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
          params: { company_id: companyId },
        }
      );

      console.log("✅ Image uploaded successfully:", response.data);

      // ✅ Update the adminData state
      setAdminData((prevData) => ({
        ...prevData,
        profile_image: response.data.profile_image,
      }));

      setImageUploadStatus("File uploaded successfully"); // Set status message
      setIsSaving(false);
      closeModal();

      // ✅ Reload the page to reflect the changes
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

    const companyId = localStorage.getItem("company_id");
    const storedAuthData = localStorage.getItem("authData");
    const token = storedAuthData ? JSON.parse(storedAuthData).access_token : null;

    if (!companyId || !token) {
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
          params: { company_id: companyId },  // Pass company_id as a query parameter
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
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
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

              {/* Modal for Profile Image */}
              {isModalOpen && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "30px",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "400px",
                      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3>Change Profile Photo</h3>
                    <div
                      style={{
                        border: "2px dashed #D0D0D0",
                        borderRadius: "10px",
                        padding: "30px",
                        marginBottom: "20px",
                        color: "#6C757D",
                      }}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="profileImageInput"
                      />
                      <label
                        htmlFor="profileImageInput"
                        style={{
                          cursor: "pointer",
                          color: "#007BFF",
                          fontSize: "16px",
                        }}
                      >
                        Drag and drop or browse files
                      </label>
                      <p style={{ fontSize: "12px", color: "#6C757D" }}>
                        Max 5MB, JPEG, PNG
                      </p>
                    </div>
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
                        disabled={isSaving} // Disable button while saving
                      >
                        {isSaving ? "Saving..." : "Save Photo"} {/* Show 'Saving...' while uploading */}
                      </button>
                    </div>
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

              {/* Personal Details */}
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <h5>Personal Details</h5>
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      style={{ marginBottom: "10px" }}
                    />
                    {formErrors.date_of_birth && <p style={{ color: "red" }}>{formErrors.date_of_birth}</p>}
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      placeholder="Gender"
                      style={{ marginBottom: "10px" }}
                    />
                    {formErrors.gender && <p style={{ color: "red" }}>{formErrors.gender}</p>}
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      style={{ marginBottom: "10px" }}
                    />
                    {formErrors.phone_number && <p style={{ color: "red" }}>{formErrors.phone_number}</p>}
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      style={{ marginBottom: "10px" }}
                    />
                    {formErrors.address && <p style={{ color: "red" }}>{formErrors.address}</p>}
                    <button onClick={handleSaveChanges}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <>
                    <p>Date of Birth: <strong>{adminData?.date_of_birth || "N/A"}</strong></p>
                    <p>Gender: <strong>{adminData?.gender || "N/A"}</strong></p>
                    <p>Phone: <strong>{adminData?.phone_number || "N/A"}</strong></p>
                    <p>Address: <strong>{adminData?.address || "N/A"}</strong></p>
                    <button onClick={handleEditToggle}>Edit</button>
                  </>
                )}
              </div>

              {/* 🔹 Account Details */}
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <h5>Account Details</h5>
                <p>Email: <strong>{adminData?.email}</strong></p>
                <p>Password: <strong>**********</strong></p>
              </div>

              {/* 🔹 Recent System Activity */}
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", marginTop: "20px", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <h5>Recent System Activity</h5>
                <ul>
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))
                  ) : (
                    <li>No recent activity</li>
                  )}
                </ul>
              </div>

              {/* 🔹 Logout Section */}
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <Link to={'/login'}>
                  <button style={{ background: "red", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
