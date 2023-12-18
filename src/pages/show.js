import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  let { id } = useParams();
  const [student, setStudent] = useState({ name: "", address: "", email: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/student/show/${id}`)
      .then((res) => {
        const siswa = res.data.data;
        console.log(siswa);
        setStudent(siswa);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 400) {
            alert(error.response.data.message);
          }
        }
      });
  }, [id]);

//   const handleInput = (e) => {
//     e.persist();
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

  const showStudent = (e) => {
    e.preventDefault();
  };

  if (!student || Object.keys(student).length === 0) {
    return (
      <div className="container">
        <h4>Tidak ada siswa yang ditemukan</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Student
                <Link to="/" className="btn btn-primary float-end">
                  Back
                </Link>
              </h4>
            </div>

            <div className="card-body">
              <form onSubmit={showStudent}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    readOnly
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={student.address}
                    readOnly
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={student.email}
                    readOnly
                    className="form-control"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
