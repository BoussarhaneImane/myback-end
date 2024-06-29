import React, { useState } from 'react';
import { axiosClient } from './axiosClient';
import { Link, useNavigate } from "react-router-dom";
import imgsrc from './signupPicture.jpg';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/register', formData);
            console.log(response.data);
            setSuccessMessage(response.data.success);
            setErrorMessage('');
            setFormData({
                name: '',
                email: '',
                password: ''
            });
            // Stocker le nom d'utilisateur dans le stockage local
            localStorage.setItem('userName', formData.name);
            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error.response.data);
            setErrorMessage(error.response.data.message || 'An error occurred');
            setSuccessMessage('');
        }
    };

    return (
        <>
        <center style={{marginTop:'80px'}}><Link to='/' className="text-zinc-950 text-center my-8 font-medium text-2xl" style={{textDecoration:'underline solid 3px green'}} >Back to Home Page</Link></center>
        <div style={{marginTop:'80px'}} className="container flex justify-center items-stretch w-[75%] h-full">
            <div className="text-section flex-1 bg-green-700 rounded-l-lg p-3">
                <img src={imgsrc} alt="Signup" className="h-full object-cover rounded-l-lg w-[100%]" />
            </div>
            <div className="form-section flex flex-col justify-center items-center bg-gray-100 rounded-r-lg p-4">
                <h1 className="text-zinc-950 text-center my-8 font-medium text-2xl">Create an Account with Us</h1>
                {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                <form className="form flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input id="name" name="name" type="text" autoComplete="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none m-3 text-xs" />
                    </div>
                    <div className="input-group">
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="Email address" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none m-3 text-xs" />
                    </div>
                    <div className="input-group">
                        <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded outline-none m-3 text-xs" />
                    </div>
                    <Link to='/login' className="text-center block text-slate-600">
                        Already have an account? <span style={{textDecoration:'underline solid 1px black'}} className="text-green-700">Login Here</span>
                    </Link>
                    <button type="submit" className="button w-[65%] p-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 text-xs mt-4">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;
