const getStudents = "SELECT * FROM students";
const getStudentsById = "SELECT * FROM students WHERE id = :id";
const checkEmailExists = "SELECT * FROM students WHERE email = :email";
const addStudent = "INSERT INTO students (name, email, age, dob) VALUES (:name, :email, :age, :dob)";
const removeStudent = "DELETE FROM students WHERE id = :id";
const updateStudent = "UPDATE students SET name = :name WHERE id = :id";

module.exports = {
  getStudents,
  getStudentsById,
  checkEmailExists,
  addStudent,
  removeStudent,
  updateStudent,
};

