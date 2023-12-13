import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/student`).then((res) => {
      console.log(res);
      setStudent(res.data.students);
      // setLoading(false);
    });
  }, []);

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
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.errors);
            // setLoading(false);
            thisClicked.innerText = "Delete";
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            // setLoading(false);
          }
        }
      });
  };

  let studentDetails = "";
  studentDetails = student.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.nama}</td>
        <td>{item.alamat}</td>
        <td>{item.email}</td>
        <td>
          <Link to={`/edit/${item.id}`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteStudent(e, item.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mb-5">
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
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
