import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import Employees from "../pages/Employees";
import AddEmployees from "../pages/AddEmployees";
import AddVehicle from "../pages/AddVehicles";
import Drivers from "../pages/Drivers"
import AddDrivers from "../pages/AddDrivers";
import Vehicles from "../pages/Vehicles";
import PairingVehicle from "../pages/PairingVehicle";

// import Drivers from "../pages/Drivers";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/employees" element={<Employees/>} />
      <Route path="/addEmployees" element={<AddEmployees/>} />
      <Route path="/addVehicles" element={<AddVehicle/>} />
      <Route path="/Drivers" element={<Drivers/>} />
      <Route path="/addDrivers" element={<AddDrivers/>} />
      <Route path="/vehicles" element={<Vehicles/>} />
      <Route path="/PairingVehicle" element={<PairingVehicle/>}/>
      {/* <Route path="/drivers" element={<Drivers/>} /> */}
    </Routes>
  );
};

export default Router;
