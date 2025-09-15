import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let students = [];
let admins = [];


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); 
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);


app.get('/api/students', (req, res) => {
  res.json(students);
});


app.post('/api/students', (req, res) => {
  const { studentID, firstName, lastName, section } = req.body;

  if (!studentID || !firstName || !lastName || !section) {
    return res.status(400).json({ message: 'All student fields are required.' });
  }

  const newStudent = {
    studentID,
    firstName,
    lastName,
    section,
    createdAt: new Date()
  };

  students.push(newStudent);
  console.log("Student Added:", newStudent);
  res.status(201).json(newStudent);
});


app.get('/api/admin', (req, res) => {
  res.json(admins);
});


app.post('/api/admin', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: 'Error uploading file' });

    const uploadedFile = req.files && req.files['file'] ? req.files['file'][0] : null;

    const newAdmin = {
      adminID: req.body.adminID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      uploadedFile: uploadedFile ? uploadedFile.path : null,
    };

    admins.push(newAdmin);
    console.log("Admin Added:", newAdmin);
    res.status(201).json(newAdmin);
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
