import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomeScreen.css'; // Asegúrate de que este es el nombre correcto del archivo CSS


const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    
    const handleStartClick = () => {
        navigate('/quizz');
    }
    const handleCreditsClick = () => {
        navigate('/credits');
    }
    return (
        <div className="home-container">
            <h1 className="title">How much do you think you know about Semantic?</h1>
            <div className="content-container">
                <div className="buttons-container">
                    <button className="start-button" onClick={handleStartClick}>
                        Let's play
                    </button>
                    <button className="credits-button" onClick={handleCreditsClick}>
                        Credits
                    </button>
                </div>
                <div className="character-container">
                    <img src={`${process.env.PUBLIC_URL}/brain.png`} alt="Profesor Cerebro" />
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;
