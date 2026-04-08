import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Cultural_Enthusiast' 
    });
    const [strength, setStrength] = useState(0); 
    const navigate = useNavigate();

    const checkPassword = (password) => {
        let score = 0;
        if (password.length > 6) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        setStrength(score);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') checkPassword(value);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (strength < 2) {
            alert("Please choose a stronger password.");
            return;
        }
        try {
            // Note: Port 8081 used here per your previous request
            await axios.post("http://localhost:8081/api/users/register", formData);
            alert("Welcome to Heritage India! Account created.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed. Please try again.");
        }
    };

    const getStrengthColor = () => {
        if (strength === 0) return '#ddd';
        if (strength === 1) return '#e74c3c'; 
        if (strength === 2) return '#f39c12'; 
        if (strength === 3) return '#3498db'; 
        return '#27ae60'; 
    };

    return (
        /* The container uses flex to center the card on the background */
        <div className="auth-container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            width: '100vw',
            background: 'url("/bg-taj.jpg") no-repeat center center/cover' 
        }}>
            {/* The Card - Restricted to 400px width so it doesn't stretch */}
            <div className="auth-card" style={{ 
                background: 'white', 
                padding: '40px', 
                borderRadius: '15px', 
                width: '100%', 
                maxWidth: '400px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                
                <h2 style={{ color: '#1a2a3a', margin: '0 0 10px 0', fontFamily: 'serif' }}>Join Heritage India</h2>
                
                {/* Visual Toggle to match your Login Image */}
                <div style={{ display: 'flex', background: '#f9f5f0', borderRadius: '8px', marginBottom: '20px', overflow: 'hidden' }}>
                    <Link to="/login" style={{ flex: 1, padding: '10px', textDecoration: 'none', color: '#888', fontWeight: '600' }}>Login</Link>
                    <div style={{ flex: 1, padding: '10px', background: '#f39c12', color: 'white', fontWeight: '600' }}>Sign Up</div>
                </div>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>Username</label>
                        <input type="text" name="username" placeholder="lucky" onChange={handleChange} required style={{ width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>Email Address</label>
                        <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} required style={{ width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>Password</label>
                        <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={{ width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        <div style={{ height: '4px', background: '#eee', marginTop: '8px', borderRadius: '2px' }}>
                            <div style={{ width: `${(strength / 4) * 100}%`, height: '100%', background: getStrengthColor(), transition: '0.3s', borderRadius: '2px' }}></div>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>Register As</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', cursor: 'pointer' }}
                        >
                            <option value="Cultural_Enthusiast">Cultural Enthusiast</option>
                            <option value="Admin">Admin</option>
                            <option value="Content_Creator">Content Creator</option>
                            <option value="Tour_Guide">Tour Guide</option>
                        </select>
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}>
                        Create Account
                    </button>
                </form>
                
                <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: '#f39c12', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
                </p>
            </div>
        </div>
    );
}