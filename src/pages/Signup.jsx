import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../api';
import '../styles/Auth.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Cultural_Enthusiast'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/users/register", formData);

            alert("Account created successfully!");
            navigate("/login");

        } catch (err) {
            console.error(err);
            alert("Signup failed. Please check backend.");
        }
    };

    return (
        <div className="auth-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f5f5f5'
        }}>
            <div className="auth-card" style={{
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                width: '350px'
            }}>
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <select name="role" onChange={handleChange}>
                        <option value="Cultural_Enthusiast">Cultural Enthusiast</option>
                        <option value="Admin">Admin</option>
                        <option value="Tour_Guide">Tour Guide</option>
                    </select>

                    <button type="submit">
                        Create Account
                    </button>
                </form>

                <p>
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}