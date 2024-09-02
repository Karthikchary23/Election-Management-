import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'; // Import bcrypt

const app = express();
const port = 5000;

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

// Voter Schema
const voterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  aadhar_number: { type: String, required: true },
  password: { type: String, required: true },
});

const Voter = mongoose.model('Voter', voterSchema);

// Aadhar Schema
const aadharSchema = new mongoose.Schema({
  aadhar_number: { type: String, required: true },
});

const AadharNumber = mongoose.model('AadharNumber', aadharSchema);

app.post('/aadharbyadmin', async (req, res) => {
  try {
    const aadhar = new AadharNumber(req.body);
    await aadhar.save();
    res.status(201).send(aadhar);
  } catch (error) {
    res.status(401).send(error);
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

    // Hash the password before saving
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

    // Hash the admin password before saving
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

    // Compare the hashed password with the plain text password
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
    const voterAutentication = await Voter.findOne({ email: email_voter });

    if (!voterAutentication) {
      return res.status(400).json({ message: 'Email not found' });
    }
    if (voterAutentication.aadhar_number !== aadhar_number) {
      return res.status(400).json({ message: 'Incorrect Aadhar number' });
    }

    // Compare the hashed password with the plain text password
    const isMatch = await bcrypt.compare(password, voterAutentication.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', voter: voterAutentication });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

//Position Schema
const positionSchema = new mongoose.Schema({
  position: { type: String, required: true },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  
});
const Positiondetails = mongoose.model('Positiondetails', positionSchema);

app.post("/position",async(req,res) =>
{
  try {
    const position = new Positiondetails(req.body);
    await position.save();
    res.status(201).send(position);
  } catch (error) {
    res.status(401).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
