import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/register", formData);
            console.log(response.data);
            const users = response.data;
            if(users) {
                navigate("/login");
            }
            setFormData({name: '', email: '', password: ''});
        } catch(err) {
            console.log(err);
        }
    };

    // Check if any field in the formData is empty
    const isFormEmpty = Object.values(formData).some(field => field === '');

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5" style={{ background: 'linear-gradient(to right, #f0f2f0, #e0e4e0)' }}>
                        <div className="card-body">
                            <h1 className="card-title text-center">Register</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Name</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" name='name' value={formData.name}  onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={formData.email}  onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formData.password}  onChange={handleChange} placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-2" disabled={isFormEmpty}>Submit</button>
                                <p>You are already registered. <a href="/login" className="link-info">Log in here</a>.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
