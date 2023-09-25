const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())
PORT = 3000;
const DB_URL = "mongodb://0.0.0.0:27017/admin"
//import the models

const Mentor = require("./model/Mentor");
const Student = require("./model/Student");

mongoose
    .connect(DB_URL, {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB", err));
//inital start with server response//
app.get("/", (req, res) => {
    res.status(200).send("Hi, hello!! welcome ");
});

//create to mentor

app.post("/mentor", async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.send(mentor)

    } catch (error){
       res.status(400).send(err)
    }
})
// CREATE Student
app.post("/student", async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  //assign mentor and student 
  app.post("/mentor/:mentorId/assign", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      const students = await Student.find({ _id: { $in: req.body.students } });
      students.forEach((student) => {
        student.cMentor = mentor._id;
        student.save();
      });
      mentor.students = [
        ...mentor.students,
        ...students.map((student) => student._id),
      ];
      await mentor.save();
      res.send(mentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//assign mentor are change in the new mentor
app.put("/student/:studentId/assignMentor/:mentorId", async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const nMentor = await Mentor.findById(req.params.mentorId);
  
      if (student.cMentor) {
        student.pMentor.push(student.cMentor);
      }
  
      student.cMentor = nMentor._id;
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  // Show all students for a particular mentor
app.get("/mentor/:mentorId/students", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId).populate(
        "students"
      );
      res.send(mentor.students);
    } catch (error) {
      res.status(400).send(error);
    }
  });
 app.get("/student/:studentid/pMentor",async (req,res)=>{
  try{
         const student = await Student.findById(req.params.studentid).populate("pMentor");
         if(!student.pMentor){
          return res.status(404).json({error:"no previous mentor available"})
         }else{
          res.send(student.pMentor);
         }
  }catch(error){
    res.status(400).send(error)

  }
 })
app.listen(PORT, () => {
    console.log("successfully running on the port", PORT)
})