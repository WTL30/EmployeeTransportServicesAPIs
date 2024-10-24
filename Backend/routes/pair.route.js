import express from "express";
import { Driver } from "../module/driver.module.js";
import { Vehicle } from "../module/vehicle.module.js";
import Pair from "../module/pair.module.js";
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

const router = express.Router();

router.get("/searchVehicle/:name", async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');

        const vehicle = await Vehicle.find({ vehicle_number: { $regex: regex } });

        res.status(200).json({
            vehicle,
        })


    } catch (error) {
        console.log(error);
    }
});

router.get("/searchDriver/:name", async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');

        const driver = await Driver.find({ name: { $regex: regex } });

        res.status(200).json({
            driver,
        })


    } catch (error) {
        console.log(error);
    }
});


router.delete("/unpair/:vehicle/:driver/:pair", async (req, res) => {
    try {
        const { vehicle, driver, pair } = req.params;

        await Driver.findByIdAndUpdate(vehicle, { paired: false });
        await Vehicle.findByIdAndUpdate(driver, { paired: false });


        await Pair.findByIdAndDelete(pair)

        res.json({
            message: "unpaired data successfully"
        })

    } catch (error) {
        console.log(error)
    }
})


router.get("/get", async (req, res)=>{
    try {
        const result = await Pair.aggregate([
            {
              $lookup: {
                from: Driver.collection.name,   // Using the collection name of the Driver model
                localField: 'driver',           // The field in pairs referencing the driver
                foreignField: '_id',           // The output field to store the populated driver details
                as: "driver"
              }
            },
            {
              $unwind: '$driver'          // Unwind the array of driver details
            },
            {
              $match: { 
                'driver.name': "suresh" // Use the passed driverName variable
              }
            },
            {
                $lookup: {
                  from: Vehicle.collection.name,   // Using the collection name of the Driver model
                  localField: 'vehicle',           // The field in pairs referencing the driver
                  foreignField: '_id',           // The output field to store the populated driver details
                  as: "vehicle"
                }
              },
              {
                $unwind: '$vehicle'          // Unwind the array of driver details
              },
              {
                $match: { 
                  'driver.name': "suresh" // Use the passed driverName variable
                }
              }
          ]);

          console.log(result[0]._id);

          await

        
          res.json({
            // result
          })

    } catch (error) {
        console.log(error);
    }
})


router.post("/addPair/:vehicle/:driver", async (req, res) => {
    try {
        const { vehicle, driver } = req.params;

        const pairData = await Pair.create({ vehicle, driver })

        await Vehicle.findByIdAndUpdate(vehicle, { paired: true })
        await Driver.findByIdAndUpdate(driver, { paired: true })

        res.json({
            pairData
        })

    } catch (error) {
        console.log(error);
    }
})

router.get("/getPairs", async (req, res) => {
    try {
        const pairs = await Pair.find({}).populate("vehicle").populate("driver");

        console.log(pairs);

        res.json({
            pairs
        })

    } catch (error) {
        console.log(error)
    }
})


export default router;