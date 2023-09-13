const sequelize = require("../../db");
const queries = require("./queries");

const getStudents = async (req, res) => {
  try {
    const [results] = await sequelize.query(queries.getStudents);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getStudentsById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [results] = await sequelize.query(queries.getStudentsById, {
      replacements: [id],
    });
    if (results.length === 0) {
      res.status(404).json({ success: false, error: "Student not found" });
    } else {
      res.status(200).json({ success: true, data: results });
    }
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  try {
    // Check if email exists
    const [emailCheck] = await sequelize.query(queries.checkEmailExists, {
      replacements: [email],
    });

    if (emailCheck.length > 0) {
      res.status(400).json({ success: false, error: "Email already exists" });
    } else {
      // Add student to DB
      await sequelize.query(queries.addStudent, {
        replacements: [name, email, age, dob],
      });
      res.status(201).json({ success: true, message: "Student Created Successfully" });
      console.log("Student Created");
    }
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const removeStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [results] = await sequelize.query(queries.removeStudent, {
      replacements: [id],
    });

    if (results.affectedRows === 0) {
      res.status(404).json({ success: false, error: "Student does not exist in the database" });
    } else {
      res.status(200).json({ success: true, message: "Student removed successfully" });
    }
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const [results] = await sequelize.query(queries.getStudentsById, {
      replacements: [id],
    });

    if (results.length === 0) {
      res.status(404).json({ success: false, error: "Student does not exist in the database" });
    } else {
      await sequelize.query(queries.updateStudent, {
        replacements: [name, id],
      });
      res.status(200).json({ success: true, message: "Student updated successfully" });
    }
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
