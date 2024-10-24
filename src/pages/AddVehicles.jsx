import React, { useState } from 'react';
import '../styles/addVehicles.css'; // Import CSS for styling
import axios from 'axios';

const AddCab = () => {
  const [cabData, setCabData] = useState({
    vehicle_number: '',
    vehicle_category: '',
    brand: '',
    model_type: '',
    fuel_type: '',
    vehicle_ownership: '',
    insurance_valid: '',
    insurance_copy: null,
    register_certificate_front: null,
    register_certificate_back: null,
    registration_date: '',
    car_number_photo: null,
  });

  // Handle changes to form inputs (both text and files)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCabData({
        ...cabData,
        [name]: files[0], // Store the first selected file
      });
    } else {
      setCabData({
        ...cabData,
        [name]: value, // Store text inputs
      });
    }

    console.log(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append text and file fields to formData
    formData.append("vehicle_number", cabData.vehicle_number);
    formData.append("vehicle_category", cabData.vehicle_category);
    formData.append("brand", cabData.brand);
    formData.append("model_type", cabData.model_type);
    formData.append("fuel_type", cabData.fuel_type);
    formData.append("vehicle_ownership", cabData.vehicle_ownership);
    formData.append("insurance_valid", cabData.insurance_valid);
    formData.append("insurance_copy", cabData.insurance_copy); // File
    formData.append("register_certificate_front", cabData.register_certificate_front); // File
    formData.append("register_certificate_back", cabData.register_certificate_back); // File
    formData.append("registration_date", cabData.registration_date);
    formData.append("car_number_photo", cabData.car_number_photo); // File

    // Debugging: Log form data
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    console.log(formData);

    try {
      // Make the POST request with form data
      const response = await axios.post('http://localhost:8080/addVehicle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log(response);
      // Reset form fields after successful submission
      setCabData({
        vehicle_number: '',
        vehicle_category: '',
        brand: '',
        model_type: '',
        fuel_type: '',
        vehicle_ownership: '',
        insurance_valid: '',
        insurance_copy: null,
        register_certificate_front: null,
        register_certificate_back: null,
        registration_date: '',
        car_number_photo: null,
      });
    } catch (error) {
      console.error('Error uploading vehicle data', error);
    }
  };

  return (
    <div className="add-cab-container">
      <h2 className="form-title">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="add-cab-form">
        {/* Vehicle Number */}
        <div className="form-group">
          <label>Vehicle No:</label>
          <input
            type="text"
            name="vehicle_number"
            value={cabData.vehicle_number}
            onChange={handleChange}
            // required
          />
        </div>

        {/* Vehicle Category */}
        <div className="form-group">
          <label>Vehicle Category:</label>
          <input
            type="text"
            name="vehicle_category"
            value={cabData.vehicle_category}
            onChange={handleChange}
            // required
          />
        </div>

        {/* Brand and Model Type */}
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={cabData.brand}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Model Type:</label>
          <input
            type="text"
            name="model_type"
            value={cabData.model_type}
            onChange={handleChange}
            // required
          />
        </div>

        {/* Fuel Type and Vehicle Ownership */}
        <div className="form-group">
          <label>Fuel Type:</label>
          <input
            type="text"
            name="fuel_type"
            value={cabData.fuel_type}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Ownership:</label>
          <input
            type="text"
            name="vehicle_ownership"
            value={cabData.vehicle_ownership}
            onChange={handleChange}
            // required
          />
        </div>

        {/* Registration Date and Insurance Validity */}
        <div className="form-group">
          <label>Registration Date:</label>
          <input
            type="date"
            name="registration_date"
            value={cabData.registration_date}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Insurance Valid Up To:</label>
          <input
            type="date"
            name="insurance_valid"
            value={cabData.insurance_valid}
            onChange={handleChange}
            // required
          />
        </div>

        {/* File Uploads */}
        <div className="form-group">
          <label>Insurance Copy (PDF):</label>
          <input
            type="file"
            name="insurance_copy"
            accept="application/pdf"
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Registration Certificate Front (Image):</label>
          <input
            type="file"
            name="register_certificate_front"
            accept="image/*"
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Registration Certificate Back (Image):</label>
          <input
            type="file"
            name="register_certificate_back"
            accept="image/*"
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label>Car Number Photo (Image):</label>
          <input
            type="file"
            name="car_number_photo"
            accept="image/*"
            onChange={handleChange}
            // required
          />
        </div>

        {/* Submit Button */}
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddCab;



