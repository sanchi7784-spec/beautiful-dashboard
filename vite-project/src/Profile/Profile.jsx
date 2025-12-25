import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save, X } from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, City, State 12345",
    role: "Administrator",
    joinedDate: "January 15, 2024",
    bio: "Passionate about creating amazing user experiences and building innovative solutions.",
    avatar: ""
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const displayData = isEditing ? tempData : profileData;

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 mt-20 text-slate-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">My Profile</h1>
            <p className="text-gray-400 text-sm">Manage your profile information</p>
          </div>
          
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f141c] rounded-xl border border-white/10 p-6">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-40 h-40 mx-auto rounded-full bg-gray-800 border-4 border-white/10 flex items-center justify-center overflow-hidden">
                  {displayData.avatar ? (
                    <img 
                      src={displayData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-gray-600" />
                  )}
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-2 right-[calc(50%-80px)] bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full cursor-pointer transition-colors shadow-lg">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name & Role */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {displayData.name}
                </h2>
                <p className="text-gray-400 text-sm">{displayData.role}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-300">Joined {displayData.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-300 truncate">{displayData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-300">{displayData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-[#0f141c] rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white">
                      <User size={18} className="text-gray-400" />
                      {displayData.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white">
                      <Mail size={18} className="text-gray-400" />
                      {displayData.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white">
                      <Phone size={18} className="text-gray-400" />
                      {displayData.phone}
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Role
                  </label>
                  <div className="px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white">
                    {displayData.role}
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={tempData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-lg text-white">
                      <MapPin size={18} className="text-gray-400" />
                      {displayData.address}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Change Section */}
              {isEditing && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Current Password */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bio Section */}
            <div className="bg-[#0f141c] rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                About Me
              </h3>
              
              {isEditing ? (
                <textarea
                  name="bio"
                  value={tempData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">
                  {displayData.bio || "No bio available"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;