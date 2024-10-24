// import React from "react";
// import "../styles/employees.css";

// const Employees = () => {
//   // Sample data for employee details
//   const employeeData = [
//     {
//       id: 1,
//       name: "John Doe",
//       contactNo: "+880 17*******",
//       licenseNo: "LIC123456",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       contactNo: "+880 17*******",
//       licenseNo: "LIC654321",
//     },
//     // Add more sample employees as needed
//   ];

//   return (
//     <div className="employees">
//       <div className="employees__wrapper">
//         <h2 className="employees__title">Employee Details</h2>

//         <div className="employees__top">
//           <button className="employee__btn">All Employees</button>
//         </div>

//         <div className="employee__cards">
//           {employeeData.map((employee) => (
//             <div key={employee.id} className="employee__card">
//               <h3 className="employee__name">{employee.name}</h3>
//               <p className="employee__contact">Contact No: {employee.contactNo}</p>
//               <p className="employee__license">License No: {employee.licenseNo}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Employees;










// EmployeeList.js
import React, { useEffect } from 'react';
import '../styles/employees.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../storage/adminStorage';

const EmployeeList = ({ employees }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.admin);

  useEffect(()=>{
    dispatch(getEmployees());
  },[])

  console.log(state);
  return (
    <div>
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Shift Time</th>
          </tr>
        </thead>
        <tbody>
          {state.employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.gender}</td>
              <td>{employee.email}</td>
              <td>{employee.pickup_location}</td>
              <td>{employee.drop_location}</td>
              <td>{employee.shift_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

