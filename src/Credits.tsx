import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Credits.css'; // Asegúrate de crear este archivo CSS para estilos

const Credits: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }
    return (
        <div className="credits-container">
            <h1>Credits</h1>
            <p>This gamification game was build by:</p>
            <ul>
                <li>Amalia Garcia Ruiz</li>
                <li>Juan Manuel Cortes Simon</li>
            </ul>
            <p>We hope that you had enjoyed and learned during your game</p>
            <button onClick={goHome} className="home-button">Home</button>
        </div>
    );
}
export default Credits;
