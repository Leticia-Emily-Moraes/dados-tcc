import React, { useState, useEffect } from "react";
import "./style.css";

const VisualizaDados = () => {
    const [animais, setAnimais] = useState([]);

    useEffect(() => {
        fetch('/api/animais')
            .then(response => response.json())
            .then(data => setAnimais(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/animais/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAnimais(animais.filter(animal => animal.id !== id));
                alert('Animal excluído com sucesso!');
            } else {
                alert('Erro ao excluir o animal.');
            }
        } catch (error) {
            console.error('Erro ao excluir o animal:', error);
        }
    };

    const handleDownload = () => {
        fetch('/api/download-data')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data-animais.zip');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('Erro ao baixar dados:', error));
    };

    return (
        <div>
            <h1>Lista de Animais</h1>
            <button onClick={handleDownload} className="download-button">
                Baixar Dados e Imagens
            </button>
            <div className="animal-grid">
                {animais.map(animal => (
                    <div key={animal.id} className="animal-card">
                        <img 
                            src={`/images/${animal.imagem}`} 
                            alt={animal.nomePopular} 
                            className="animal-image" 
                        />
                        <h2>{animal.nomePopular}</h2>
                        <p><strong>Nome Científico:</strong> {animal.nomeCientifico}</p>
                        <p><strong>Família:</strong> {animal.familia}</p>
                        <p><strong>Habitat:</strong> {animal.habitat}</p>
                        <p><strong>Hábito:</strong> {animal.habito}</p>
                        <p><strong>Características Gerais:</strong> {animal.caractGeral}</p>
                        <p><strong>Peçonhento:</strong> {animal.peconhento ? 'Sim' : 'Não'}</p>
                        <p><strong>Agressivo:</strong> {animal.agressivo ? 'Sim' : 'Não'}</p>
                        <button className="delete-button" onClick={() => handleDelete(animal.id)}>Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default VisualizaDados;