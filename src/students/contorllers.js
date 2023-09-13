const studentService = require('./service');

const getStudents = async (req, res) => {
  try {
    const response = await studentService.getStudents();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getStudentsById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await studentService.getStudentsById(id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  try {
    await studentService.addStudent(name, email, age, dob);
    res.status(201).json({ success: true, message: "Student Created Successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const removeStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await studentService.removeStudent(id);
    res.status(200).json({ success: true, message: "Student removed successfully" });
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    await studentService.updateStudent(id, name);
    res.status(200).json({ success: true, message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  getStudents,
  getStudentsById,
  addStudent,
  removeStudent,
  updateStudent,
};
