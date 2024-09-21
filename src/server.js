import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
// import { type } from 'os';

const app = express();
const port = 5000;

// Get the directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/election_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Position Schema
const positionSchema = new mongoose.Schema({
  position: { type: String, required: true },
});

const Positiondetails = mongoose.model('Positiondetails', positionSchema);

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  area: { type: String, required: true },
  image: { type: String, required: true },
  vote_count:{type:Number}
});

const Candidate = mongoose.model('Candidate', candidateSchema);

// Fetch all positions for dropdown
app.get('/positions', async (req, res) => {
  try {
    const positions = await Positiondetails.find({});
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching positions' });
  }
});

// Add new candidate
app.post('/candidates', upload.single('image'), async (req, res) => {
  const { name, position, area } = req.body;
  const image = req.file.filename;

  try {
    const candidate = new Candidate({ name, position, area, image });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error saving candidate' });
  }
});

// Fetch all candidates
app.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

// Edit candidate
app.put('/candidates/:id', upload.single('image'), async (req, res) => {
  const { name, position, area } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { name, position, area, ...(image && { image }) },
      { new: true }
    );
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating candidate' });
  }
});

// Delete candidate
app.delete('/candidates/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Candidate deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting candidate' });
  }
});

// Voter Schema
const voterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  aadhar_number: { type: String, required: true },
  password: { type: String, required: true },
  votedCandidates:{type:Boolean,default:true}
});

const Voter = mongoose.model('Voter', voterSchema);

// Aadhar Schema
const aadharSchema = new mongoose.Schema({
  aadhar_number: { type: String, required: true },
});

const AadharNumber = mongoose.model('AadharNumber', aadharSchema);

app.post('/aadharbyadmin', async (req, res) => {
  try {
    const { aadhar_number } = req.body;
    const checkAadharExist = await AadharNumber.findOne({ aadhar_number });

    if (checkAadharExist) {
      return res.status(409).json({ message: "Aadhar Number already exists" }); // Return 409 Conflict if duplicate
    }

    const aadhar = new AadharNumber(req.body);
    await aadhar.save();
    res.status(200).json(aadhar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Voter Registration Route
app.post('/register', async (req, res) => {
  try {
    const { email, aadhar_number, phone, password } = req.body;

    const existingAadhar = await AadharNumber.findOne({ aadhar_number });
    if (!existingAadhar) {
      return res.status(502).json({ message: 'Invalid Aadhar number' });
    }

    const existingVoter = await Voter.findOne({
      $or: [{ email }, { aadhar_number }, { phone }],
    });

    if (existingVoter) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const voter = new Voter({ ...req.body, password: hashedPassword });
    await voter.save();
    res.status(201).json(voter);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Admin Schema and Routes
const adminSchema = new mongoose.Schema({
  Admin_mail: { type: String, required: true },
  Admin_password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

app.post('/addadmindata', async (req, res) => {
  const { Admin_mail, Admin_password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ Admin_mail });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(Admin_password, 10);
    const adminDetails = new Admin({
      Admin_mail,
      Admin_password: hashedPassword,
    });
    await adminDetails.save();
    res.status(201).json(adminDetails);
  } catch (error) {
    res.status(600).json({ message: 'Server error', error });
  }
});

app.post('/admin_login', async (req, res) => {
  const { email_admin, admin_password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ Admin_mail: email_admin });

    if (!existingAdmin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(admin_password, existingAdmin.Admin_password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', admin: existingAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Voter Login
app.post("/voterslogin", async (req, res) => {
  const { email_voter, password, aadhar_number } = req.body;
  try {
    const voterAuthentication = await Voter.findOne({ email: email_voter });

    if (!voterAuthentication) {
      return res.status(400).json({ message: 'Email not found' });
    }
    if (voterAuthentication.aadhar_number !== aadhar_number) {
      return res.status(400).json({ message: 'Incorrect Aadhar number' });
    }

    const isMatch = await bcrypt.compare(password, voterAuthentication.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', voter: {name:voterAuthentication.name,email: voterAuthentication.email,
      aadhar_number: voterAuthentication.aadhar_number} });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add position (POST)
app.post("/position", async (req, res) => {
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

//Get request for candidate
app.get('/getusers',async(req,res)=>
{
  
  Candidate.find()
  .then(candidate=>res.json(candidate))
  .catch(err=>res.json(err))
})

// app.post('/vote', async (req, res) => {
//   const { userId } = req.body; // Extract userId from request body

//   try {
//     // Find the user (candidate) by their ID
//     const user = await Candidate.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'Candidate not found' });
//     }

//     // Increment the vote count
//     user.vote_count += 1;

//     // Save the updated user document back to the database
//     await user.save();

//     res.status(200).json({ message: 'Vote successfully recorded' });
//   } catch (error) {
//     console.error('Error recording vote:', error);
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// });
//fetching voter details
app.get('/voterdetails', async (req, res) => {
  const { checkAadhar } = req.query; // Use query parameters
  try {
    // Find the user (candidate) by their Aadhar
    const voterid = await Voter.findOne({ aadhar_number: checkAadhar });
    if (!voterid) {
      return res.status(404).json({ message: `Candidate with Aadhar number ${checkAadhar} not found` });
    }

    res.status(200).json({ name: voterid.name, aadhar: voterid.aadhar_number, votedCandidates: voterid.votedCandidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});


// Backend route to update the voter's voted status
// app.post('/updateVotedStatus', (req, res) => {
//   const { aadhar, voted } = req.body;

//   Voter.updateOne({ aadhar: aadhar }, { $set: { votedCandidates: voted } })
//     .then(() => res.send("Voter status updated successfully"))
//     .catch(err => res.status(500).send("Error updating voter status: " + err));
// });

// Endpoint to cast a vote and update votedCandidates status
app.post('/vote', (req, res) => {
  const { userId, aadhar } = req.body;

  // Logic to increment the vote count for the candidate (user)
  Candidate.findByIdAndUpdate(
    userId,
    { $inc: { vote_count: 1 } },  // Increment the candidate's vote count
    { new: true }
  )
    .then(() => {
      // After the candidate's vote count is updated, update the voter
      Voter.findOneAndUpdate(
        { aadhar_number: aadhar },
        { $set: { votedCandidates: false } }  // Set votedCandidates to false
      )
        .then(() => {
          res.status(200).send('Vote recorded and voter updated');
        })
        .catch((err) => {
          res.status(500).send('Error updating voter status');
        });
    })
    .catch((err) => {
      res.status(500).send('Error updating candidate vote count');
    });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});