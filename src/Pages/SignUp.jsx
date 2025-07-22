import React from "react";
import dance from "/Dance.png";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   // Handle form submission here
  //   alert("Form submitted successfully!");
  // };

  // const SignUp = () => {
  return (
    <div className="bg-[#434e7552]  h-full w-full p-16 ">
      <div className="w-[1200px] bg-white mx-auto rounded-lg grid grid-cols-2 shadow-lg overflow-hidden">
        <div
          className="h-[800px] w-full bg-no-repeat bg-cover bg-center relative"
          style={{ backgroundImage: "url('/Dance.png')" }}
        >
          <div className="absolute inset-0 bg-[#7f95d258]"></div>
        </div>
        <div className="p-8">
          <h1 className="font-bold text-[20px] mt-20">Sign Up</h1>

          {/* Email Input */}
          <label htmlFor="email" className="block mt-6 font-semi-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full mt-4 px-4 py-3 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
