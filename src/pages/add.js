import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();

    // setLoading(true);
    const data = {
      name: student.name,
      address: student.address,
      email: student.email,
    };

    axios
      .post("http://localhost:8000/api/student", data)
      .then((res) => {
        alert(res.data.students);
        navigate("/");
        // setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
            // setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            // setLoading(false);
          }
        }
      });
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Student
                <Link to="/" className="btn btn-primary float-end">
                  Back
                </Link>
              </h4>
            </div>

            <div className="card-body">
              <form onSubmit={saveStudent}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={student.address}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.address}</span>
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={student.email}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save Students
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
