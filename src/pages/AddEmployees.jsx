import React, { useState } from "react";
import "../styles/addEmployees.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../storage/adminStorage";

const AddEmployeeForm = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [pickup_location, setPickupLocation] = useState("");
  const [drop_location, setDropLocation] = useState("");
  const [shift_time, setShiftTime] = useState("");
  const dispatch= useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi")
    const newEmployee = {
      name,
      phone_number,
      gender,
      email,
      pickup_location,
      drop_location,
      shift_time,
    };
    console.log(newEmployee);
    // Call the addEmployee function passed via props
    dispatch(addEmployee(newEmployee));

    // Clear the form after submission
    // setName("");
    // setPhoneNumber("");
    // setGender("male");
    // setEmail("");
    // setPickupLocation("");
    // setDropLocation("");
    // setShiftTime("");
  };

  return (
    <div className="add-employee-form">
      <div>
      <h2 className="form-title">Add New Employee</h2>
      </div>
      <form onSubmit={handleSubmit} className="allform">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="Enter your Pickup Location"
            value={pickup_location}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Drop Location</label>
          <input
            type="text"
            placeholder="Enter your Drop Location"
            value={drop_location}
            onChange={(e) => setDropLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Shift Time</label>
          <input
            type="time"
            value={shift_time}
            onChange={(e) => setShiftTime(e.target.value)}
            required
          />
        </div>
        <div className="addbtn">
        <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
