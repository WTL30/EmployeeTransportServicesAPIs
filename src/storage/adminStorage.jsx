import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const addVehicle = createAsyncThunk("addVehicle", async (vehicle) =>{
    const res = await axios.post("http://localhost:8080/addVehicle", vehicle);
    
    return res.data;
})

export const getVehicles = createAsyncThunk("getVehicles", async () =>{
    const res = await axios.get("http://localhost:8080/getVehicles");
    return res.data;
})




export const addDriver = createAsyncThunk("addDriver",async (driver)=>{
    try {
        const res = await axios.post("http://localhost:8080/addDriver", driver);

        console.log(res);
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
})

export const getDrivers = createAsyncThunk("getDrivers",async (driver)=>{
    try {
        const res = await axios.get("http://localhost:8080/getDrivers");

        console.log(res);
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
})


export const search_driver = createAsyncThunk("search_driver", async (name)=>{
    try {
        console.log(name);
        const driver = await axios.get(`http://localhost:8080/searchDriver/${name}`);
        
        // console.log(driver)
        return driver.data;

    } catch (error) {
        console.log(error)
    }
})

export const search_vehicle = createAsyncThunk("search_vehicle", async (number)=>{
    try {
        console.log(number);
        const vehicle = await axios.get(`http://localhost:8080/searchVehicle/${number}`);


        return vehicle.data;

    } catch (error) {
        console.log(error)
    }
})

export const pair_vehicle_and_driver = createAsyncThunk("pair_vehicle_and_driver",async ({vehicle, driver})=>{
    try {
        console.log(vehicle, driver)
        const pair = await axios.post(`http://localhost:8080/addPair/${vehicle}/${driver}`);
        
        return pair.data;
    } catch (error) {
        
    }
})

export const unpair_vehicle_and_driver = createAsyncThunk("unpair_vehicle_and_driver",async ({vehicle, driver, pair})=>{
    try {
        console.log(vehicle, driver)
        const unpair = await axios.delete(`http://localhost:8080/unpair/${vehicle}/${driver}/${pair}`);
        
        return unpair.data;
    } catch (error) {
        
    }
})

export const unpair_vehicle_and_driver_by_driver = createAsyncThunk("unpair_vehicle_and_driver_by_driver",async ({driver})=>{
    try {
        console.log(driver);
        const unpair = await axios.delete(`http://localhost:8080/unpairByDriverId/${driver}`);
        
        return unpair.data;
    } catch (error) {
        console.log(error);
    }
})

export const get_pair_vehicle_and_driver = createAsyncThunk("get_pair_vehicle_and_driver",async ()=>{
    try {

        const pair = await axios.get(`http://localhost:8080/getPairs`);
        
        return pair.data;

    } catch (error) {
        console.log(error)
    }
})

export const addEmployee = createAsyncThunk("addEmployee", async (employee)=>{
    try {
        const res = await axios.post("http://localhost:8080/addEmployee", employee);

        return res.data;
    } catch (error) {
        console.log(error);
    }
})


export const getEmployees = createAsyncThunk("getEmployee", async ()=>{
    try {
        const res = await axios.get("http://localhost:8080/getEmployees");
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    uploaded:false,
    vehicles:[],
    drivers:[],
    employees:[],
    search_driver:[],
    search_vehicle:[],
    paired_vehicle: []
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(addVehicle.fulfilled, (state, action)=>{
            state.uploaded = true;
        })
        builder.addCase(getVehicles.fulfilled, (state, action)=>{
            state.vehicles = action.payload.vehicles;
        })
        builder.addCase(addDriver.fulfilled, (state, payload)=>{
            
        })
        builder.addCase(getDrivers.fulfilled, (state, action)=>{
            state.drivers = action.payload.drivers;
        })
        builder.addCase(addEmployee.fulfilled, (state, action)=>{
            
        })
        builder.addCase(getEmployees.fulfilled, (state, action)=>{
            state.employees = action.payload.employees
        })
        builder.addCase(search_vehicle.fulfilled, (state, action)=>{
            state.search_vehicle = action.payload.vehicle
        })
        builder.addCase(search_driver.fulfilled, (state, action)=>{
            state.search_driver = action.payload.driver
        })
        builder.addCase(pair_vehicle_and_driver.fulfilled, (state, action)=>{

        })
        builder.addCase(get_pair_vehicle_and_driver.fulfilled, (state, action)=>{
            state.paired_vehicle = action.payload.pairs;
        })
        builder.addCase(unpair_vehicle_and_driver.fulfilled, (state, action)=>{

        })
    }
})

export default adminSlice.reducer;