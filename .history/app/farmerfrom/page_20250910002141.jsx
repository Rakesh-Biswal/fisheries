"use client";

import { useState } from "react";

export default function FarmerForm() {
  const [formData, setFormData] = useState({
    aadhaar: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    category: "",
    fatherName: "",
    differentlyAbled: "",
    employment: "",
    qualification: "",
    district: "",
    block: "",
    gpWard: "",
    village: "",
    address: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Required fields configuration
  const requiredFields = {
    aadhaar: true,
    name: true,
    mobile: true,
    gender: true,
    dob: true,
    category: true,
    fatherName: true,
    differentlyAbled: true,
    employment: true,
    district: true,
    block: true,
    gpWard: true,
    village: true,
    address: true,
    photo: true
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(requiredFields).forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validations
    if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
    }

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mark all required fields as touched to show errors
      const allTouched = {};
      Object.keys(requiredFields).forEach(field => {
        allTouched[field] = true;
      });
      setTouched(allTouched);
      
      alert("Please fill all required fields marked with red star");
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  const RequiredStar = () => <span className="text-red-500">*</span>;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-lg font-semibold mb-6">
        Scheme : <span className="text-green-700">Construction of Growout Tanks (PMMSY)</span>
      </h2>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Farmer Information</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Scheme Information</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Documents</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="font-bold text-md mb-4">Basic Information <RequiredStar /></h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Aadhaar Number */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Aadhaar Number <RequiredStar />
              </label>
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border rounded-md p-2 ${errors.aadhaar ? 'border-red-500' : ''}`}
                  maxLength={12}
                />
                <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md whitespace-nowrap">
                  Verify
                </button>
              </div>
              {touched.aadhaar && errors.aadhaar && (
                <span className="text-red-500 text-xs">{errors.aadhaar}</span>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Name <RequiredStar />
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.name ? 'border-red-500' : ''}`}
              />
              {touched.name && errors.name && (
                <span className="text-red-500 text-xs">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.email ? 'border-red-500' : ''}`}
              />
              {touched.email && errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Mobile Number <RequiredStar />
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.mobile ? 'border-red-500' : ''}`}
                maxLength={10}
              />
              {touched.mobile && errors.mobile && (
                <span className="text-red-500 text-xs">{errors.mobile}</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Gender <RequiredStar />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Female" onChange={handleChange} className="mr-1"/>
                  Female
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Male" onChange={handleChange} className="mr-1"/>
                  Male
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Transgender" onChange={handleChange} className="mr-1"/>
                  Transgender
                </label>
              </div>
              {touched.gender && errors.gender && (
                <span className="text-red-500 text-xs">{errors.gender}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Date of Birth <RequiredStar />
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.dob ? 'border-red-500' : ''}`}
              />
              {touched.dob && errors.dob && (
                <span className="text-red-500 text-xs">{errors.dob}</span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Category <RequiredStar />
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select Category</option>
                <option value="GEN">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              {touched.category && errors.category && (
                <span className="text-red-500 text-xs">{errors.category}</span>
              )}
            </div>

            {/* Father's Name */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Father's / Husband's Name <RequiredStar />
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.fatherName ? 'border-red-500' : ''}`}
              />
              {touched.fatherName && errors.fatherName && (
                <span className="text-red-500 text-xs">{errors.fatherName}</span>
              )}
            </div>

            {/* Differently Abled */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Differently Abled <RequiredStar />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="differentlyAbled" value="No" onChange={handleChange} className="mr-1"/>
                  No
                </label>
                <label className="flex items-center">
                  <input type="radio" name="differentlyAbled" value="Yes" onChange={handleChange} className="mr-1"/>
                  Yes
                </label>
              </div>
              {touched.differentlyAbled && errors.differentlyAbled && (
                <span className="text-red-500 text-xs">{errors.differentlyAbled}</span>
              )}
            </div>

            {/* Educational Qualification */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Educational Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            {/* Employment */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Employment Status <RequiredStar />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="employment" value="Employed" onChange={handleChange} className="mr-1"/>
                  Employed
                </label>
                <label className="flex items-center">
                  <input type="radio" name="employment" value="Unemployed" onChange={handleChange} className="mr-1"/>
                  Unemployed
                </label>
              </div>
              {touched.employment && errors.employment && (
                <span className="text-red-500 text-xs">{errors.employment}</span>
              )}
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">
                Photo <RequiredStar />
              </label>
              <div className="w-28 h-28 border rounded-md flex items-center justify-center mb-2">
                {formData.photo ? (
                  <span className="text-green-600">Photo selected</span>
                ) : (
                  <span className="text-gray-400">Upload Photo</span>
                )}
              </div>
              <input
                type="file"
                name="photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="mt-2"
              />
              <small className="text-red-500">(.jpg, .jpeg, .png only, max size 1 MB)</small>
              {touched.photo && errors.photo && (
                <span className="text-red-500 text-xs">{errors.photo}</span>
              )}
            </div>
          </div>
        </div>

        {/* Communication Address */}
        <div>
          <h3 className="font-bold text-md mb-4">Communication Address <RequiredStar /></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                District <RequiredStar />
              </label>
              <select 
                name="district" 
                value={formData.district}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.district ? 'border-red-500' : ''}`}
              >
                <option value="">Select District</option>
              </select>
              {touched.district && errors.district && (
                <span className="text-red-500 text-xs">{errors.district}</span>
              )}
            </div>

            {/* Block */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Block / ULB <RequiredStar />
              </label>
              <select 
                name="block" 
                value={formData.block}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.block ? 'border-red-500' : ''}`}
              >
                <option value="">Select Block / ULB</option>
              </select>
              {touched.block && errors.block && (
                <span className="text-red-500 text-xs">{errors.block}</span>
              )}
            </div>

            {/* GP/Ward */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                GP / Ward <RequiredStar />
              </label>
              <select 
                name="gpWard" 
                value={formData.gpWard}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.gpWard ? 'border-red-500' : ''}`}
              >
                <option value="">Select GP / Ward</option>
              </select>
              {touched.gpWard && errors.gpWard && (
                <span className="text-red-500 text-xs">{errors.gpWard}</span>
              )}
            </div>

            {/* Village */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                Village <RequiredStar />
              </label>
              <select 
                name="village" 
                value={formData.village}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.village ? 'border-red-500' : ''}`}
              >
                <option value="">Select Village</option>
              </select>
              {touched.village && errors.village && (
                <span className="text-red-500 text-xs">{errors.village}</span>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm mb-1">
                Address <RequiredStar />
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-md p-2 ${errors.address ? 'border-red-500' : ''}`}
                rows={3}
              ></textarea>
              {touched.address && errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button type="button" className="px-6 py-2 bg-red-500 text-white rounded-md">Back</button>
          <button type="submit" className="px-6 py-2 bg-yellow-500 text-white rounded-md">Save As Draft</button>
        </div>
      </form>
    </div>
  );
}