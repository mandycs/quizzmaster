import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Quizz.css';

interface AnswerOption {
    answerText: string;
    isCorrect: boolean;
}

interface Question {
    questionText: string;
    answerOptions: AnswerOption[];
    explanation: string;
}

const Quiz: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(100);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Estado para contar los aciertos


    const questions: Question[] = [
        {
            questionText: "What is the primary focus of lexicography within the field of semantics?",
            answerOptions: [
                { answerText: "The structure of sentences", isCorrect: false },
                { answerText: "The compilation and design of dictionaries", isCorrect: true },
                { answerText: "Phonetic transcription", isCorrect: false },
                { answerText: "Syntax rules", isCorrect: false },
            ],
            explanation: "Lexicography in semantics primarily focuses on how dictionaries are compiled and designed, which involves detailed descriptions of word meanings, usage, and orthography."
        },
        {
            questionText: "Which of the following best defines 'morphemes'?",
            answerOptions: [
                { answerText: "The smallest grammatical units that have syntactic meaning", isCorrect: false },
                { answerText: "The smallest units of meaning", isCorrect: true },
                { answerText: "Sounds that convey meaning", isCorrect: false },
                { answerText: "Parts of words that can stand alone as words", isCorrect: false },
            ],
            explanation: "Morphemes are the smallest units of meaning in a language, not necessarily able to stand alone but essential for forming words."
        },
        {
            questionText: "What does 'sound symbolism' refer to?",
            answerOptions: [
                { answerText: "The way a word sounds influences its meaning", isCorrect: true },
                { answerText: "The relationship between phonetics and syntax", isCorrect: false },
                { answerText: "Symbolic representations of sounds in writing", isCorrect: false },
                { answerText: "Idioms and their usage in language", isCorrect: false },
            ],
            explanation: "Sound symbolism is the idea that the sound of a word can play a role in suggesting its meaning, a form of onomatopoeia."
        },
        {
            questionText: "Which term describes the phenomenon where the meaning of a word changes depending on the context?",
            answerOptions: [
                { answerText: "Lexicography", isCorrect: false },
                { answerText: "Contextual modulation of meaning", isCorrect: true },
                { answerText: "Semantic shift", isCorrect: false },
                { answerText: "Morphological analysis", isCorrect: false },
            ],
            explanation: "Contextual modulation of meaning refers to how the meaning of a word can change based on the linguistic or situational context."
        },
        {
            questionText: "Which type of definition is primarily concerned with how a term is used in everyday language?",
            answerOptions: [
                { answerText: "Real definition", isCorrect: false },
                { answerText: "Nominal definition", isCorrect: false },
                { answerText: "Definition by context or typical exemplar", isCorrect: true },
                { answerText: "Definition by genus and differentia", isCorrect: false },
            ],
            explanation: "A definition by context or typical exemplar focuses on how a term is commonly used in everyday language, describing its most typical cases."
        },
        {
            questionText: "What are 'semantic primitives' in the study of semantics?",
            answerOptions: [
                { answerText: "Complex phrases used in advanced linguistics", isCorrect: false },
                { answerText: "Basic, undefinable meanings from which more complex meanings are constructed", isCorrect: true },
                { answerText: "Tools used for creating dictionaries", isCorrect: false },
                { answerText: "The study of meanings derived from morphemes", isCorrect: false }
            ],
            explanation: "Semantic primitives are considered the foundational building blocks of meaning, representing core concepts that cannot be broken down further."
        },
        {
            questionText: "What does it mean to define a word by 'synonymy'?",
            answerOptions: [
                { answerText: "Defining a word by listing its synonyms", isCorrect: true },
                { answerText: "Defining a word by its opposite meaning", isCorrect: false },
                { answerText: "Defining a word through its usage in different contexts", isCorrect: false },
                { answerText: "Using a word in various example sentences", isCorrect: false }
            ],
            explanation: "Defining by synonymy involves explaining the meaning of a word by providing other words with very similar meanings."
        },
        {
            questionText: "How do 'real' and 'nominal' definitions differ?",
            answerOptions: [
                { answerText: "Real definitions describe observable properties, while nominal definitions describe theoretical concepts", isCorrect: false },
                { answerText: "Real definitions state the nature of things as they are, whereas nominal definitions are based on common usage", isCorrect: true },
                { answerText: "Real definitions apply only to physical objects, nominal to abstract concepts", isCorrect: false },
                { answerText: "There is no significant difference; both terms are interchangeable", isCorrect: false }
            ],
            explanation: "Real definitions attempt to express the essence of things, while nominal definitions reflect the way a term is commonly used in language."
        },
        {
            questionText: "Which issue is a common problem in defining words?",
            answerOptions: [
                { answerText: "Being overly precise to the point of confusion", isCorrect: false },
                { answerText: "Using the word in the definition itself", isCorrect: true },
                { answerText: "Ignoring popular usage of the word", isCorrect: false },
                { answerText: "Relying solely on historical context", isCorrect: false }
            ],
            explanation: "A common problem in definitions is circularity, where the word being defined is used within its own definition, failing to provide new information."
        },
        {
            questionText: "How does the meaning of an idiom relate to the meanings of the individual words it contains?",
            answerOptions: [
                { answerText: "The meaning of the idiom usually reflects the combined meanings of its words", isCorrect: false },
                { answerText: "The meaning of the idiom often does not relate directly to the meanings of the words it contains", isCorrect: true },
                { answerText: "Idioms are strictly literal and always relate to the direct meanings of their words", isCorrect: false },
                { answerText: "Idioms do not have meanings outside of their literal interpretations", isCorrect: false }
            ],
            explanation: "Idioms often convey meanings that cannot be deduced merely from the meanings of the individual words, as they function as single semantic units."
        }
    ];


    const handleAnswerOptionClick = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prevScore => Math.min(prevScore + 5, 100));
            setCorrectAnswersCount(prevCount => prevCount + 1);
            setFeedback("Congratulations!! Your answer is correct.");
        } else {
            setScore(prevScore => {
                const newScore = Math.max(prevScore - 20, 0);
                if (newScore <= 0) {
                    // Si los puntos de vida llegan a 0, finaliza el juego inmediatamente.
                    setShowResults(true);
                    setFeedback(`Incorrect. The correct answer was: ${questions[currentQuestion].answerOptions.find(option => option.isCorrect)?.answerText}`);
                    return 0; // Asegura que la puntuación no sea negativa.
                }
                setFeedback(`Incorrect. The correct answer was: ${questions[currentQuestion].answerOptions.find(option => option.isCorrect)?.answerText}`);
                return newScore;
            });
        }
        // Verifica si es necesario mostrar el botón continuar o finalizar el juego
        if (!showResults) {
            setShowContinueButton(true);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResults(true);
        }
        setFeedback(null);
        setShowContinueButton(false);
    };

    const goHome = () => {
        navigate('/quizzmaster'); // Navega de regreso al HomeScreen
    };
    return (
        <div className='quiz-container'>
            <button className="home-button" onClick={goHome}>Home</button>

            {showResults ? (
            <div className='results-section'>
                {score > 0 ?
                    `You won!!! You kept ${score} health points. You answered ${correctAnswersCount} questions correctly out of ${questions.length}.` :
                    "Game Over. You've lost all your health points. You need to review your knowledge."}
            </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Level {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(option.isCorrect)}>
                                {option.answerText}
                            </button>
                        ))}
                    </div>
                    {feedback &&
                        <div className='feedback-section'>
                            {feedback}
                            <div className='explanation-section'>
                                {questions[currentQuestion].explanation}
                            </div>
                        </div>}
                    {showContinueButton && <button className='continue-button' onClick={handleNextQuestion}>Continue</button>}
                </>
            )}
            <div className='life-counter'>Health Points: {score}</div>
        </div>
    );
};

export default Quiz;
