import mongoose from "mongoose";
const positionSchema = new mongoose.Schema({
    position: { type: String, required: true },
  });
export const Positiondetails = mongoose.model('Positiondetails', positionSchema);
