// CabList.jsx
import React, { useEffect, useState } from 'react';
// import { FaSearch } from 'react-icons/fa'; // Import the search icon
// import AddVehicle from '../pages/AddVehicles'; // Import the AddCab component
import '../styles/Vehicles.css'; // Optional: Import CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { getVehicles } from '../storage/adminStorage';

const CabList = () => {
  const [cabs, setCabs] = useState([]); // State to hold the list of cabs
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [blacklistedCabs, setBlacklistedCabs] = useState([]); // State for blacklisted cabs
  const state = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const addCab = (cabData) => {
    setCabs([...cabs, cabData]); // Add the new cab to the state
  };

  console.log(state.vehicles);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm with user input
  };

  // Function to edit a cab's information
  const handleEdit = (index) => {
    // Implement edit functionality, like showing an edit form
    console.log("Edit cab at index:", index);
  };

  // Function to blacklist a cab
  const handleBlacklist = (index) => {
    const cabToBlacklist = cabs[index];
    setBlacklistedCabs([...blacklistedCabs, cabToBlacklist]); // Add to blacklisted cabs
    // Optionally, remove from the main list or just mark it
    const updatedCabs = cabs.filter((_, i) => i !== index);
    setCabs(updatedCabs);
    console.log("Blacklisted cab at index:", index);
  };

  // Filter cabs based on searchTerm
  const filteredCabs = cabs.filter(cab =>
    cab.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cab.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cab.vehicleCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(()=>{
    dispatch(getVehicles());
  },[])

  return (
    <div className="cab-list-container">
      {/* <AddVehicle addCab={addCab} /> Pass the addCab function as a prop */}
      <div className='title'>
        <h2>Cab List</h2>
      </div>

      <div className="search-bar">
        {/* <FaSearch className="search-icon" /> Search icon inside the bar */}
        <input
          type="text"
          placeholder="Search by Vehicle No, Brand or Category"
          value={searchTerm}
          onChange={handleSearchChange} // Update searchTerm on input change
        />
      </div>

      {filteredCabs.length == 0 ? (
        <table className="cab-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle No</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Model Type</th>
              <th>Fuel Type</th>
              <th>Vehicle Ownership</th>
              <th>Registration Date</th>
              <th>Insurance Valid Up To</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {state?.vehicles?.map((cab, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cab.vehicle_number}</td>
                <td>{cab.vehicle_category}</td>
                <td>{cab.brand}</td>
                <td>{cab.model_type}</td>
                <td>{cab.fuel_type}</td>
                <td>{cab.vehicle_ownership}</td>
                <td>{cab.registration_date}</td>
                <td>{cab.insurance_valid}</td>
                <td>
                  <button className='editbtn' onClick={() => handleEdit(index)}>Edit</button>
                  <button className='editbtn' onClick={() => handleBlacklist(index)}>Blacklist</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cabs added yet.</p>
      )}

      {/* Optional: Blacklisted cabs section */}
      {blacklistedCabs.length > 0 && (
        <div className="blacklisted-cabs">
          <h3>Blacklisted Cabs</h3>
          <ul>
            {blacklistedCabs.map((cab, index) => (
              <li key={index}>{cab.vehicleNo} - {cab.brand}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CabList;
