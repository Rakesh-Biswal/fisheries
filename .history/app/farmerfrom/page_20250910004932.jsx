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

  const requiredFields = [
    "aadhaar",
    "name",
    "mobile",
    "gender",
    "dob",
    "category",
    "fatherName",
    "differentlyAbled",
    "employment",
    "district",
    "block",
    "gpWard",
    "village",
    "address",
    "photo",
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully ✅");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-lg font-semibold mb-6">
        Scheme :{" "}
        <span className="text-green-700">
          Construction of Growout Tanks (PMMSY)
        </span>
      </h2>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">
          Farmer Information
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">
          Scheme Information
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Documents</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="font-bold text-md mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Aadhaar */}
            <div>
              <label className="block mb-1">
                Aadhaar Number <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  name="aadhaar"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Verify
                </button>
              </div>
              {errors.aadhaar && (
                <p className="text-red-500 text-sm">{errors.aadhaar}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Transgender"
                    onChange={handleChange}
                  />{" "}
                  Transgender
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Category</option>
                <option value="GEN">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Father Name */}
            <div>
              <label className="block mb-1">
                Father&apos;s / Husband&apos;s Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm">{errors.fatherName}</p>
              )}
            </div>

            {/* Differently Abled */}
            <div>
              <label className="block mb-1">
                Differently Abled <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="differentlyAbled"
                    value="No"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="differentlyAbled"
                    value="Yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
              </div>
              {errors.differentlyAbled && (
                <p className="text-red-500 text-sm">
                  {errors.differentlyAbled}
                </p>
              )}
            </div>

            {/* Qualification */}
            <div>
              <label className="block mb-1">Educational Qualification</label>
              <input
                type="text"
                name="qualification"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              />
            </div>

            {/* Employment */}
            <div>
              <label className="block mb-1">
                Employment <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="employment"
                    value="Employed"
                    onChange={handleChange}
                  />{" "}
                  Employed
                </label>
                <label>
                  <input
                    type="radio"
                    name="employment"
                    value="Unemployed"
                    onChange={handleChange}
                  />{" "}
                  Unemployed
                </label>
              </div>
              {errors.employment && (
                <p className="text-red-500 text-sm">{errors.employment}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 border rounded-md flex items-center justify-center overflow-hidden bg-gray-100">
                {formData.photo ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    alt="Placeholder"
                    className="w-30 h-30 "
                  />
                )}
              </div>

              <input
                type="file"
                name="photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="mt-3 block w-full text-sm text-gray-200 border rounded-md cursor-pointer focus:outline-none"
              />

              <small className="text-red-500 mt-1">
                * (.jpg, .jpeg, .png only and max size of 1 MB)
              </small>
            </div>
          </div>
        </div> {/* ✅ closes Basic Information */}

        {/* Communication Address */}
        <div>
          <h3 className="font-bold text-md mb-4">Communication Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District */}
            <div>
              <label className="block mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select District</option>
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">{errors.district}</p>
              )}
            </div>

            {/* Block */}
            <div>
              <label className="block mb-1">
                Block / ULB <span className="text-red-500">*</span>
              </label>
              <select
                name="block"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Block / ULB</option>
              </select>
              {errors.block && (
                <p className="text-red-500 text-sm">{errors.block}</p>
              )}
            </div>

            {/* GP / Ward */}
            <div>
              <label className="block mb-1">
                GP / Ward <span className="text-red-500">*</span>
              </label>
              <select
                name="gpWard"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select GP / Ward</option>
              </select>
              {errors.gpWard && (
                <p className="text-red-500 text-sm">{errors.gpWard}</p>
              )}
            </div>

            {/* Village */}
            <div>
              <label className="block mb-1">
                Village <span className="text-red-500">*</span>
              </label>
              <select
                name="village"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Village</option>
              </select>
              {errors.village && (
                <p className="text-red-500 text-sm">{errors.village}</p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-red-500 text-white rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded-md"
          >
            Save As Draft
          </button>
        </div>
      </form>
    </div>
  );
}
