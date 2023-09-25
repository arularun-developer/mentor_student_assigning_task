# mentor_student_assigning_task
Mentor and Student Assigned with Database

create to mentor
API :http://localhost:3000/mentor

example:{
    "name": "Arun Kumar",
    "students": [],
    "_id": "65113408fe23baf0555881e4",
    "__v": 0
}

 create to student
 API:http://localhost:3000/student
 
 example:
 {
    "name": "arunkumar",
    "pMentor": [],
    "_id": "65113429fe23baf0555881e6",
    "__v": 0
}

  //assign mentor and student 
  
   http://localhost:3000 /mentor/:mentorId/assign
  API:http://localhost:3000/mentor/65104a40a3a25af67826f423/assign
  
  //assign mentor are change in the new mentor
  
   http://localhost:3000 /student/:studentId/assignMentor/:mentorId
  API:http://localhost:3000/student/65104bf6ca26c35db86348a6/assignMentor/65104a40a3a25af67826f423
  
  // Show all students for a particular mentor
  
     http://localhost:3000/student/:studentid/pMentor
     API:http://localhost:3000/student/65104bf6ca26c35db86348a6/pMentor

