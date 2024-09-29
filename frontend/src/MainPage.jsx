import React from 'react';
import { useNavigate,Outlet } from "react-router-dom";


export default function MainPage() {
    const navigate = useNavigate();
    const containerStyle = {
        height: '100vh',
        backgroundColor: '#f7f9fc',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
        marginBottom: '10px',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#333',
    };

    const selectStyle = {
        padding: '10px',
        fontSize: '1em',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        width: '200px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1em',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userType = event.target.userType.value; 
        console.log("target is " + userType)
        if (userType === "User") {
            console.log("here")
            navigate("Autocomplete");
        } else {
            navigate("LoginForm");
        }
    };
    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Who are you?</label>
                <select name="userType" style={selectStyle}>
                    <option value="User">People need support</option>
                    <option value="Supplier">Supplier</option>
                </select>
                <input
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                />
            </form>
            <Outlet />
        </div>
    );
}