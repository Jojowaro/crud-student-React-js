import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/student`)
      .then((res) => {
        const siswa = res.data.data
        console.log(siswa);
        setStudents(siswa);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // ======== delete student ========
  const deleteStudent = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting ...";

    axios
      .get(`http://localhost:8000/api/student/delete/${id}`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.errors);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      })
      .finally(() => {
        thisClicked.innerText = "Delete";
      });
  };

  let studentDetails = null;
  if (Array.isArray(students) && students.length > 0) {
    studentDetails = students.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.id}</td>
          <td>{student.nama}</td>
          <td>{student.alamat}</td>
          <td>{student.email}</td>
          <td>
            <Link to={`/edit/${student.id}`} className="btn btn-success">
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteStudent(e, student.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  } else {
    //show student is not array or null
    studentDetails = (
      <tr>
        <td colSpan="10">No student data available</td>
      </tr>
    );
  }
    
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Students Data
                <Link to="/add" className="btn btn-primary float-end">
                  Add Student
                </Link>
              </h4>
            </div>

            <div className="card-body">
              <table className="table table-stripped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {studentDetails} 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
