import express from 'express';
import { Positiondetails } from '../../database/Position';
const Router = express.Router();
Router.post('/position', async (req, res) => {
    try {
      if (!req.body.position) {
        return res.status(400).send("Position is required");
      }
      
      const existingPosition = await Positiondetails.findOne({ position: req.body.position });
      if (existingPosition) {
        return res.status(600).send("Position already exists");
      }
  
      const position1 = new Positiondetails(req.body);
      await position1.save();
      res.status(201).send(position1);
    } catch (error) {
      res.status(500).send(error.message || "An unexpected error occurred");
    }
  });
export default Router;