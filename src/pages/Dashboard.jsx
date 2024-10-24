import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

let carObj = {
  title: "Total Cars",
  totalNumber: 0,
  icon: "ri-police-car-line",
};

let tripObj = {
  title: "Daily Trips",
  totalNumber: 0,
  icon: "ri-steering-2-line",
};

let clientObj = {
  title: "Clients Annually",
  totalNumber: "0k",
  icon: "ri-user-line",
};

let distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 2167,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  const [datas, setdatas] = React.useState(null);
  const state = useSelector(state => state.admin);
  const dispatch = useDispatch();

  console.log(state)
  useEffect(()=>{
  },[])
  
  useEffect(() => {
    const fetchData = () => {
      if(datas == null){
      fetch('http://localhost:8080/total')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.length > 0) {
            setdatas(data[0]);
           console.log(data[0])
           carObj ={
            title:data[0].name,
              totalNumber:data[0].value ,
           }
           tripObj = {
            title:data[1].name,
              totalNumber:data[1].value ,
          };
          clientObj = {
            title:data[2].name,
            totalNumber:data[2].value ,
          };
          distanceObj = {
            title: data[3].name,
            totalNumber: data[2].value,
          };
          } else {
            console.warn('No data found');
          }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    }};

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every X milliseconds
    // Adjust the interval time as needed (e.g., 5000 ms = 5 seconds)

    // Cleanup function to clear the interval when the component unmounts or when `datas` changes
    return () => fetchData()
  }, [datas]);
  
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} /> 
           <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
