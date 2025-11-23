"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Crop,
  Fish,
  Calendar,
  Edit3,
  Save,
  X,
  FileText,
  Landmark,
  UserCheck,
  Shield,
  Camera,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  EyeOff,
  Building,
  IdCard,
  FileCheck,
  Map,
  Navigation,
  CalendarDays,
  UserCog,
  BadgeCheck,
  Star,
  Award,
  Target,
  BarChart3,
  Settings,
  Heart
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("personal");
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchProfileData();
  }, [params.id]);

  const fetchProfileData = async () => {
    try {
      const farmerToken = localStorage.getItem("farmerToken");
      const currentFarmer = JSON.parse(localStorage.getItem("currentFarmer") || "null");

      if (!farmerToken || !currentFarmer) {
        router.push("/signin");
        return;
      }

      setUser(currentFarmer);

      const response = await fetch(`${API_URL}/api/farmer/profile`, {
        headers: {
          Authorization: `Bearer ${farmerToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const farmerToken = localStorage.getItem("farmerToken");
      
      const response = await fetch(`${API_URL}/api/farmer/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${farmerToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
        setEditing(false);
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
      case "Fully Approved":
        return;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "Fully Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-16 h-16 from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
              <p className="text-gray-600">Farmer ID: {user?.id}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile?.approvalStatus?.overallStatus)}`}>
                  {getStatusIcon(profile?.approvalStatus?.overallStatus)}
                  <span className="ml-1">{profile?.approvalStatus?.overallStatus}</span>
                </span>
                <span className="text-xs text-gray-500">
                  Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: "personal", name: "Personal Info", icon: User },
            { id: "farm", name: "Farm Details", icon: Crop },
            { id: "land", name: "Land Records", icon: Landmark },
            { id: "documents", name: "Documents", icon: FileText },
            { id: "approval", name: "Approval Status", icon: BadgeCheck }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Basic Information
                  </h3>
                  
                  <DetailSection>
                    <DetailItem label="Full Name" value={profile?.name} readOnly />
                    <DetailItem label="Phone Number" value={profile?.phone} readOnly />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {editing ? (
                        <input
                          type="email"
                          value={formData.email || ""}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter email address"
                        />
                      ) : (
                        <DisplayValue value={profile?.email} placeholder="Not provided" icon={Mail} />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      {editing ? (
                        <textarea
                          value={formData.address || ""}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          rows="3"
                          placeholder="Enter your complete address"
                        />
                      ) : (
                        <DisplayValue value={profile?.address} placeholder="Not provided" icon={MapPin} />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="Age" value={profile?.age} readOnly />
                      <DetailItem label="Gender" value={profile?.gender} readOnly />
                    </div>
                  </DetailSection>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-purple-600" />
                    Additional Information
                  </h3>
                  
                  <DetailSection>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Crops/Experience
                      </label>
                      {editing ? (
                        <div className="space-y-2">
                          {(formData.previousCrops || []).map((crop, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={crop}
                                onChange={(e) => handleArrayChange("previousCrops", index, e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter crop or experience"
                              />
                              <button
                                type="button"
                                onClick={() => removeArrayItem("previousCrops", index)}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addArrayItem("previousCrops")}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <Plus className="h-4 w-4" />
                            Add another item
                          </button>
                        </div>
                      ) : (
                        <div>
                          {profile?.previousCrops && profile.previousCrops.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {profile.previousCrops.map((crop, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {crop}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No previous crops or experience listed</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      {editing ? (
                        <textarea
                          value={formData.notes || ""}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          rows="3"
                          placeholder="Any additional information..."
                        />
                      ) : (
                        <DisplayValue value={profile?.notes} placeholder="No additional notes" />
                      )}
                    </div>
                  </DetailSection>
                </div>
              </div>
            </div>
          )}

          {/* Farm Details Tab */}
          {activeTab === "farm" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Crop className="h-5 w-5 text-green-600" />
                    Farm Specifications
                  </h3>
                  
                  <DetailSection>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Size
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          value={formData.farmSize || ""}
                          onChange={(e) => handleInputChange("farmSize", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., 2 acres, 5 hectares"
                        />
                      ) : (
                        <DisplayValue value={profile?.farmSize} placeholder="Not specified" />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Type
                      </label>
                      {editing ? (
                        <select
                          value={formData.farmType || ""}
                          onChange={(e) => handleInputChange("farmType", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select farm type</option>
                          <option value="Pond">Pond</option>
                          <option value="Cage">Cage</option>
                          <option value="Tank">Tank</option>
                          <option value="Open Field">Open Field</option>
                          <option value="Greenhouse">Greenhouse</option>
                          <option value="Polyhouse">Polyhouse</option>
                          <option value="Aquaculture Farm">Aquaculture Farm</option>
                        </select>
                      ) : (
                        <DisplayValue value={profile?.farmType} placeholder="Not specified" icon={Fish} />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Farming Experience
                      </label>
                      {editing ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={formData.farmingExperience || ""}
                            onChange={(e) => handleInputChange("farmingExperience", parseInt(e.target.value) || 0)}
                            className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Years"
                            min="0"
                            max="100"
                          />
                          <span className="text-gray-600">years</span>
                        </div>
                      ) : (
                        <DisplayValue 
                          value={profile?.farmingExperience ? `${profile.farmingExperience} years` : null} 
                          placeholder="Not specified" 
                          icon={Calendar}
                        />
                      )}
                    </div>
                  </DetailSection>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    Farming Preferences
                  </h3>
                  
                  <DetailSection>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Fish Type
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          value={formData.preferredFishType || ""}
                          onChange={(e) => handleInputChange("preferredFishType", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., Tilapia, Catla, Rohu, Mrigal"
                        />
                      ) : (
                        <DisplayValue value={profile?.preferredFishType} placeholder="Not specified" />
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Farming Goals
                      </h4>
                      <p className="text-sm text-blue-700">
                        {profile?.notes || "No specific goals mentioned. You can add your farming objectives in the additional notes."}
                      </p>
                    </div>
                  </DetailSection>
                </div>
              </div>
            </div>
          )}

          {/* Land Records Tab */}
          {activeTab === "land" && profile?.landDetails && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-yellow-600" />
                    Land Ownership
                  </h3>
                  
                  <DetailSection>
                    <DetailItem label="Land Owner" value={profile.landDetails.landOwner} />
                    <DetailItem label="Owner Relation" value={profile.landDetails.landOwnerRelation} />
                    <DetailItem label="Khatiyan Number" value={profile.landDetails.khatiyanNo} />
                    <DetailItem label="Plot Number" value={profile.landDetails.plotNo} />
                    <DetailItem 
                      label="Plot Area" 
                      value={profile.landDetails.plotArea ? 
                        `${profile.landDetails.plotArea.value} ${profile.landDetails.plotArea.unit}` : 
                        "Not specified"
                      } 
                    />
                  </DetailSection>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Map className="h-5 w-5 text-green-600" />
                    Location Details
                  </h3>
                  
                  <DetailSection>
                    {profile.landDetails.landLocation?.fullAddress && (
                      <DetailItem 
                        label="Full Address" 
                        value={profile.landDetails.landLocation.fullAddress} 
                      />
                    )}
                    
                    {profile.landDetails.landLocation?.latitude && profile.landDetails.landLocation?.longitude && (
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-medium text-gray-700 mb-1">GPS Coordinates</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Navigation className="h-4 w-4" />
                          <span>Lat: {profile.landDetails.landLocation.latitude}</span>
                          <span>Lng: {profile.landDetails.landLocation.longitude}</span>
                        </div>
                      </div>
                    )}
                  </DetailSection>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && profile?.landDetails && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* KYC Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <IdCard className="h-5 w-5 text-blue-600" />
                    KYC Documents
                  </h3>
                  
                  <DetailSection>
                    <DocumentItem 
                      label="Aadhar Front" 
                      url={profile.landDetails.documents?.kyc?.aadharFront} 
                    />
                    <DocumentItem 
                      label="Aadhar Back" 
                      url={profile.landDetails.documents?.kyc?.aadharBack} 
                    />
                    <DocumentItem 
                      label="PAN Card" 
                      url={profile.landDetails.documents?.kyc?.panCard} 
                    />
                    <DocumentItem 
                      label="Voter ID" 
                      url={profile.landDetails.documents?.kyc?.voterId} 
                    />
                    <DocumentItem 
                      label="Other ID" 
                      url={profile.landDetails.documents?.kyc?.otherId} 
                    />
                  </DetailSection>
                </div>

                {/* Land Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-green-600" />
                    Land Records
                  </h3>
                  
                  <DetailSection>
                    <DocumentItem 
                      label="Khatiyan Document" 
                      url={profile.landDetails.documents?.landRecords?.khatiyanDocument} 
                    />
                    <DocumentItem 
                      label="Plot Document" 
                      url={profile.landDetails.documents?.landRecords?.plotDocument} 
                    />
                    <DocumentItem 
                      label="Land Map" 
                      url={profile.landDetails.documents?.landRecords?.landMap} 
                    />
                    <DocumentItem 
                      label="Other Land Doc" 
                      url={profile.landDetails.documents?.landRecords?.otherLandDoc} 
                    />
                    <DocumentItem 
                      label="NOC Certificate" 
                      url={profile.landDetails.documents?.noc} 
                    />
                    <DocumentItem 
                      label="Lease Agreement" 
                      url={profile.landDetails.documents?.leaseAgreement} 
                    />
                  </DetailSection>
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-purple-600" />
                  Photographs
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DocumentItem 
                    label="Applicant Photo" 
                    url={profile.landDetails.documents?.photos?.applicantPhoto} 
                    isImage 
                  />
                  <DocumentItem 
                    label="Land Photo 1" 
                    url={profile.landDetails.documents?.photos?.landPhoto1} 
                    isImage 
                  />
                  <DocumentItem 
                    label="Land Photo 2" 
                    url={profile.landDetails.documents?.photos?.landPhoto2} 
                    isImage 
                  />
                  <DocumentItem 
                    label="Land Photo 3" 
                    url={profile.landDetails.documents?.photos?.landPhoto3} 
                    isImage 
                  />
                </div>
              </div>
            </div>
          )}


          {/* Approval Status Tab */}
          {activeTab === "approval" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ApprovalCard
                  title="Sales Employee Approval"
                  status={profile?.approvalStatus?.salesEmployeeApproved}
                  approvedBy="Sales Team"
                />
                <ApprovalCard
                  title="Team Leader Approval"
                  status={profile?.approvalStatus?.teamLeaderApproved}
                  approvedBy="Team Leader"
                />
                <ApprovalCard
                  title="HR Approval"
                  status={profile?.approvalStatus?.hrApproved}
                  approvedBy="HR Department"
                />
              </div>

              <div className="from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Overall Application Status
                    </h3>
                    <p className="text-gray-600">
                      {profile?.approvalStatus?.overallStatus === "Fully Approved" 
                        ? "Your application has been fully approved and you can access all features."
                        : "Your application is under review. Some features may be limited until full approval."
                      }
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(profile?.approvalStatus?.overallStatus)}`}>
                    {getStatusIcon(profile?.approvalStatus?.overallStatus)}
                    <span className="ml-2">{profile?.approvalStatus?.overallStatus}</span>
                  </div>
                </div>
              </div>

              {profile?.landDetails?.verificationNotes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Verification Notes
                  </h4>
                  <p className="text-yellow-800 text-sm">{profile.landDetails.verificationNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DetailSection({ children }) {
  return <div className="space-y-3">{children}</div>;
}

function DetailItem({ label, value, readOnly = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className={`p-2 rounded border ${readOnly ? 'bg-gray-50 text-gray-900' : 'bg-white'}`}>
        {value || <span className="text-gray-500">Not provided</span>}
      </div>
    </div>
  );
}

function DisplayValue({ value, placeholder, icon: Icon }) {
  return (
    <div className="p-2 bg-gray-50 rounded border text-gray-900 flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-gray-400" />}
      {value || <span className="text-gray-500">{placeholder}</span>}
    </div>
  );
}

function DocumentItem({ label, url, isImage = false }) {
  if (!url) {
    return (
      <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">Not uploaded</p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80"
            title="View document"
          >
            <Eye className="h-4 w-4" />
          </a>
          <a
            href={url}
            download
            className="text-gray-600 hover:text-gray-800"
            title="Download document"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>
      {isImage ? (
        <img
          src={url}
          alt={label}
          className="w-full h-20 object-cover rounded border"
        />
      ) : (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
          <FileText className="h-8 w-8 text-gray-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {label} Document
            </p>
            <p className="text-xs text-gray-500">Click icons to view/download</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ApprovalCard({ title, status, approvedBy }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Approved":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-5 w-5" />,
          badge: "bg-green-500"
        };
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Clock className="h-5 w-5" />,
          badge: "bg-yellow-500"
        };
      case "Rejected":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertCircle className="h-5 w-5" />,
          badge: "bg-red-500"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Clock className="h-5 w-5" />,
          badge: "bg-gray-500"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className={`w-3 h-3 rounded-full ${config.badge}`}></div>
      </div>
      
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${config.color} mb-3`}>
        {config.icon}
        <span className="text-sm font-medium">{status}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <UserCheck className="h-4 w-4" />
        <span>Approved by: {approvedBy}</span>
      </div>
    </div>
  );
}

// Plus icon component for the add button
function Plus(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
