import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/loading'


const Edit = () => {

    let { id } = useParams();

    const[loading, setLoading] = useState(false)
    const[inputErrorList, setInputErrorList] = useState({})
    const[student, setStudent] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/student/update/${id}`).then(res => {
            console.log(res)
            setStudent(res.data.students);
            setLoading(false);
        })
        .catch(function (error) {
            if(error.response){
                if(error.response.status === 404) {
                    alert(error.response.data.errors)
                    setLoading(false);
                }
                if(error.response.status === 500) {
                    alert(error.response.data)
                    setLoading(false);
                }
            }
        })
        ;
        ;

    }, [id])

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value })
    }

    const updateStudent = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            name: student.name,
            address: student.address,
            email: student.email,
        }

        axios.post(`http://localhost:8000/api/student/update/${id}`, data)
            .then(res => {
                alert(res.data.message);
                setLoading(false);
            })
            .catch(function (error) {
                if(error.response){
                    if(error.response.status === 400) {
                        setInputErrorList(error.response.data.errors)
                        setLoading(false);
                    }
                    if(error.response.status === 404) {
                        alert(error.response.data.errors)
                        setLoading(false);
                    }
                    if(error.response.status === 500) {
                        alert(error.response.data)
                        setLoading(false);
                    }
                }
            });
    }
        
    if(loading) {
        return(
            <Loading />
        ) 
    }

if(Object.keys(student).length === 0){
    return(
        <div className="container">
            <h4>Tidak ada siswa yang ditemukan</h4>
        </div>
    )
}

    return(
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Student
                                <Link to="/" className="btn btn-primary float-end">Back</Link>
                            </h4>
                        </div>

                        <div className="card-body">
                            <form onSubmit={updateStudent}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={student.name} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={student.adress} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.address}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={student.email} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.email}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Save Students</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit