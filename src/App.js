import React, { useState } from "react";
import "./App.css";

const App = () => {
	const [nomePopular, setNomePopular] = useState("");
	const [nomeCientifico, setNomeCientifico] = useState("");
	const [especie, setEspecie] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newAnimal = {
			nomePopular,
			nomeCientifico,
			especie,
		};

		try {
			const response = await fetch("/api/add-animal", {
				// Alterado para o caminho relativo
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newAnimal),
			});

			if (response.ok) {
				alert("Animal adicionado com sucesso!");
				setNomePopular("");
				setNomeCientifico("");
				setEspecie("");
			} else {
				alert("Falha ao adicionar animal.");
			}
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			alert(
				"Erro ao enviar dados. Verifique o console para mais informações."
			);
		}
	};

	return (
		<div className="App">
			<h1>Adicionar Animal</h1>
			<form onSubmit={handleSubmit}>
				<label>Nome Popular:</label>
				<input
					type="text"
					value={nomePopular}
					onChange={(e) => setNomePopular(e.target.value)}
					required
				/>
				<label>Nome Científico:</label>
				<input
					type="text"
					value={nomeCientifico}
					onChange={(e) => setNomeCientifico(e.target.value)}
					required
				/>
				<label>Espécie:</label>
				<input
					type="text"
					value={especie}
					onChange={(e) => setEspecie(e.target.value)}
					required
				/>
				<button type="submit">Adicionar Animal</button>
			</form>
		</div>
	);
};

export default App;
