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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

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
          <h3 className="font-bold text-md mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar Number"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md">
                Verify
              </button>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <div className="flex flex-col">
              <label className="text-sm">Gender</label>
              <div className="flex space-x-4">
                <label><input type="radio" name="gender" value="Female" onChange={handleChange}/> Female</label>
                <label><input type="radio" name="gender" value="Male" onChange={handleChange}/> Male</label>
                <label><input type="radio" name="gender" value="Transgender" onChange={handleChange}/> Transgender</label>
              </div>
            </div>

            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <select
              name="category"
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option value="">Select Category</option>
              <option value="GEN">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>

            <input
              type="text"
              name="fatherName"
              placeholder="Father's / Husband's Name"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <div className="flex flex-col">
              <label className="text-sm">Differently Abled</label>
              <div className="flex space-x-4">
                <label><input type="radio" name="differentlyAbled" value="No" onChange={handleChange}/> No</label>
                <label><input type="radio" name="differentlyAbled" value="Yes" onChange={handleChange}/> Yes</label>
              </div>
            </div>

            <input
              type="text"
              name="qualification"
              placeholder="Educational Qualification"
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <div className="flex flex-col">
              <label className="text-sm">Employment</label>
              <div className="flex space-x-4">
                <label><input type="radio" name="employment" value="Employed" onChange={handleChange}/> Employed</label>
                <label><input type="radio" name="employment" value="Unemployed" onChange={handleChange}/> Unemployed</label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 border rounded-md flex items-center justify-center">
                <span className="text-gray-400">Photo</span>
              </div>
              <input
                type="file"
                name="photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="mt-2"
              />
              <small className="text-red-500">(.jpg, .jpeg, .png only, max size 1 MB)</small>
            </div>
          </div>
        </div>

        {/* Communication Address */}
        <div>
          <h3 className="font-bold text-md mb-4">Communication Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="district" onChange={handleChange} className="border rounded-md p-2">
              <option value="">Select District</option>
            </select>

            <select name="block" onChange={handleChange} className="border rounded-md p-2">
              <option value="">Select Block / ULB</option>
            </select>

            <select name="gpWard" onChange={handleChange} className="border rounded-md p-2">
              <option value="">Select GP / Ward</option>
            </select>

            <select name="village" onChange={handleChange} className="border rounded-md p-2">
              <option value="">Select Village</option>
            </select>

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="border rounded-md p-2 col-span-2"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="button" className="px-6 py-2 bg-red-500 text-white rounded-md">Back</button>
          <button type="submit" className="px-6 py-2 bg-yellow-500 text-white rounded-md">Save As Draft</button>
        </div>
      </form>
    </div>
  );
}
