import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    require:true,
    unique:true
  }
},{
  timestamps:true
})


const User = mongoose.model("User", UserSchema);
export {User};