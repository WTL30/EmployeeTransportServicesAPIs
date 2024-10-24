import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PairingVehicle.css";
import { useDispatch, useSelector } from "react-redux";
import { get_pair_vehicle_and_driver, pair_vehicle_and_driver, search_driver, search_vehicle, unpair_vehicle_and_driver, unpair_vehicle_and_driver_by_driver } from "../storage/adminStorage";

const PairingVehicle = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleSearchTerm, setVehicleSearchTerm] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state.admin);

  console.log(state);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getDrivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching driver data", error);
      }
    };
    fetchDrivers();
  }, []);

  const handlePairDriver = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true); // Open the modal
  };

  // Dummy vehicle list
  const vehicles = [
    { id: 1, vehicleNo: "ABC123" },
    { id: 2, vehicleNo: "XYZ456" },
    { id: 3, vehicleNo: "LMN789" },
  ];

  // Demo driver details
  const demoDrivers = [
    { id: 1, name: "Vishal" },
    { id: 2, name: "Gaurav" },
    { id: 3, name: "Rhugved" },
  ];

  // const filteredDrivers = [...drivers, ...demoDrivers].filter((driver) =>
  //   driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredVehicles = vehicles.filter((vehicle) =>
  //   vehicle.vehicleNo.toLowerCase().includes(vehicleSearchTerm.toLowerCase())
  // );

  const handleAddVehicle = (vehicle) => {
    // Logic for adding the vehicle can be implemented here
    console.log(`Vehicle added: ${vehicle.vehicle_number}`);
    console.log(state.search_driver[0].name);
    dispatch(pair_vehicle_and_driver({ vehicle: vehicle._id, driver: state.search_driver[0]._id }))

  };

  const handleSearchVehicle = (e) => {
    setVehicleSearchTerm(e.target.value);
    dispatch(search_vehicle(e.target.value));
  }


  useEffect(() => {
    dispatch(get_pair_vehicle_and_driver())
  }, []);

  return (
    <div className="pairing-vehicle-container">
      <h2>Pair Vehicle with Driver</h2>

      <div className="search_bar" style={{ display: "flex" }}>
        <input
          className="search"
          type="text"
          placeholder="Search by Driver Name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button className="search_button" onClick={() => { dispatch(search_driver(searchTerm)) }}>
          Search
        </button>
      </div>

      {/* Display the driver list only if there is a search term */}
      {searchTerm && (
        <div className="table">
          <div className="table_head">
            <table className="cab-list-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Driver Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.search_driver.map((driver, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{driver.name}</td>
                    <td>
                      {
                        state.search_driver.paired ?
                          <button onClick={() => handlePairDriver(driver)}>
                            Pair Vehicle
                          </button>
                          : <></>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Vehicle List */}
      {isModalOpen && selectedDriver && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Vehicle List for {selectedDriver.name}</h2>
            <input
              className="search"
              type="text"
              placeholder="Search Vehicle"
              value={vehicleSearchTerm}
              onChange={(e) => handleSearchVehicle(e)}
            />
            {/* Display the vehicle list only if there is a search term */}
            {vehicleSearchTerm && (
              <table className="cab-list-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vehicle No</th>
                    <th>Action</th> {/* Added Action header */}
                  </tr>
                </thead>
                <tbody>
                  {state.search_vehicle.map((vehicle, index) => (
                    <tr key={vehicle.id}>
                      <td>{index + 1}</td>
                      <td>{vehicle.vehicle_number}</td>
                      <td>
                        <button onClick={() => handleAddVehicle(vehicle)}>Add Vehicle</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PairingVehicle;
