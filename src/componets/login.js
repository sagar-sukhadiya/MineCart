import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formaData, setFormData] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formaData, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:3001/register");
            const users = response.data;

            const user = users.find(user => user.email === formaData.email && user.password === formaData.password);

            if (user) {
                navigate("/home")
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            setError('Something went wrong. Please try again.');
        }
    };
    const isFormEmpty = Object.values(formaData).some(field => field === '');
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5" style={{ background: 'linear-gradient(to right, #f0f2f0, #e0e4e0)' }}>
                            <div className="card-body">
                                <h1 className="card-title text-center">Login</h1>
                                {error && <p>{error}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={formaData.email} onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={formaData.password} onChange={handleChange} placeholder="Password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-2" disabled={isFormEmpty}>Submit</button>
                                    <p>Don't have an account? <a href="/" class="link-info">Register here</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login