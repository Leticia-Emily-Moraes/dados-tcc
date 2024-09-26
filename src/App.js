import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import InserirAnimal from "./pages/inserirAnimais";
import VisualizaDados from "./pages/visualizarDados";
import './App.css';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Adicionar Animal</Link>
                <Link to="/animal-list">Ver Animais</Link>
            </nav>
            <Routes>
                <Route path="/" element={<InserirAnimal />} />
                <Route path="/animal-list" element={<VisualizaDados />} />
            </Routes>
        </Router>
    );
};

export default App;
