import React, { useEffect, useState } from 'react';
// import { FaSearch } from 'react-icons/fa';  
// import AddDriver from './AddDrivers'; // Import AddDriver form
import '../styles/Drivers.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../storage/adminStorage';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]); // Store driver data
  const [searchTerm, setSearchTerm] = useState('');
  const state = useSelector(state => state.admin);
  const dispatch = useDispatch();

  console.log(state);

  useEffect(()=>{
    dispatch(getDrivers());

  },[])
  const addDriver = (driver) => {
    // Add new driver to the list
    setDrivers([...drivers, driver]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm with user input
  };

  const handleEditDriver = (index) => {
    // Placeholder for editing driver
    alert(`Edit driver at index ${index + 1}`);
  };

  const handleBlacklistDriver = (index) => {
    // Placeholder for blacklisting driver
    alert(`Blacklist driver at index ${index + 1}`);
  };




  return (
    <div className="driver-list-container">
      {/* <AddDriver addDriver={addDriver} /> Pass the addDriver function */}

      <h2>Driver List</h2>
      <div className="search-bar">
        {/* <FaSearch className="search-icon" /> Search icon inside the bar */}
        <input
          type="text"
          placeholder="Search by Vehicle No, Brand or Category"
          value={searchTerm}
          onChange={handleSearchChange} // Update searchTerm on input change
        />
      </div>
      
        <table className="driver-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Date of Birth</th>
              <th>License ID</th>
              <th>License Expiry</th>
              <th>ID Proof Type</th>
              <th>Actions</th> {/* Add a column for actions */}
            </tr>
          </thead>
          <tbody>
            {state.drivers.map((driver, index) => (
              
              <tr key={index}>
                <td>{index + 1}</td> {/* Display index + 1 for numbering */}
                <td>{driver.name}</td>
                <td>{driver.mobile}</td>
                <td>{driver.data_of_birth}</td>
                <td>{driver.license_id_number}</td>
                <td>{driver.license_expire_date}</td>
                <td>{driver.select_id_proof}</td>
                <td>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEditDriver(index)}
                  >
                    Edit
                  </button>
                  <button 
                    className="blacklist-btn" 
                    onClick={() => handleBlacklistDriver(index)}
                  >
                    Blacklist
                  </button>
                </td> {/* Edit and Blacklist buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default DriverList;
