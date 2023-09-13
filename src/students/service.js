const studentRepository = require('./repository');
const sequelize = require("../../db");
const { QueryTypes } = require('sequelize');

const getStudents = async () => {
    try {
      const [results] = await sequelize.query(studentRepository.getStudents, {
        type: QueryTypes.SELECT
      });
      return results;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const getStudentsById = async (id) => {
    try {
      const [results] = await sequelize.query(studentRepository.getStudentsById, {
        replacements: {id: id},
        type: QueryTypes.SELECT
      });
      if (results.length === 0) {
        throw new Error("Student not found");
      } else {
        return results;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const addStudent = async (name, email, age, dob) => {
    try {
      // Check if email exists
      const [emailCheck] = await sequelize.query(studentRepository.checkEmailExists, {
        replacements: {email: email},
        type: QueryTypes.SELECT
      });
  
      if (emailCheck.length > 0) {
        throw new Error("Email already exists" );
      } else {
        // Add student to DB
        await sequelize.query(studentRepository.addStudent, {
          replacements: {name: name, email: email, age: age, dob: dob},
          type: QueryTypes.INSERT
        });
        console.log("Student Created");
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const removeStudent = async (id) => {
    try {
      const [results] = await sequelize.query(studentRepository.removeStudent, {
        replacements: {id: id},
        type: QueryTypes.DELETE
      });
  
      if (results.affectedRows === 0) {
        throw new Error("Student does not exist in the database");
      }

      return;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const updateStudent = async (id, name) => {
    try {
      const [results] = await sequelize.query(studentRepository.getStudentsById, {
        replacements: {id: id},
        type: QueryTypes.SELECT
      });
  
      if (results.length === 0) {
        throw new Error("Student does not exist in the database");
      } else {
        await sequelize.query(studentRepository.updateStudent, {
          replacements: {name: name, id: id},
          type: QueryTypes.UPDATE
        });

        return;
      }
    } catch (error) {
        throw new Error(error);
    }
  };

  module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent,
    updateStudent,
  };