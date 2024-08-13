import React, { useState } from "react";
import "./App.css";

const App = () => {
	const [nomePopular, setNomePopular] = useState("");
	const [nomeCientifico, setNomeCientifico] = useState("");
	const [familia, setFamilia] = useState("");
	const [habitat, setHabitat] = useState("");
	const [habito, setHabito] = useState("");
	const [caractGeral, setCaractGeral] = useState("");
	const [checkBoxValue, setCheckBoxValue] = useState({
		peconhento: false,
		agressivo: false,
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newAnimal = {
			nomePopular,
			nomeCientifico,
			familia,
			habitat,
			habito,
			caractGeral,
			peconhento: checkBoxValue.peconhento,
			agressivo: checkBoxValue.agressivo,
		};

		try {
			const response = await fetch(
				"https://dados-tcc.onrender.com/api/add-animal",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newAnimal),
				}
			);

			if (response.ok) {
				alert("Animal adicionado com sucesso!");
				setNomePopular("");
				setNomeCientifico("");
				setFamilia("");
				setHabitat("");
				setHabito("");
				setCaractGeral("");
				setCheckBoxValue({
					peconhento: false,
					agressivo: false,
				});
			} else {
				const errorData = await response.json();
				alert(`Falha ao adicionar animal: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Erro ao enviar dados: ", error);
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
				<label>Nome Científico/Espécie:</label>
				<input
					type="text"
					value={nomeCientifico}
					onChange={(e) => setNomeCientifico(e.target.value)}
					required
				/>
				<label>Família:</label>
				<input
					type="text"
					value={familia}
					onChange={(e) => setFamilia(e.target.value)}
					required
				/>
				<label>Peçonhento:</label>
				<input
					type="checkbox"
					name="peconhento"
					checked={checkBoxValue.peconhento}
					onChange={(e) =>
						setCheckBoxValue((prevState) => ({
							...prevState,
							peconhento: e.target.checked,
						}))
					}
				/>
				<label>Agressivo:</label>
				<input
					type="checkbox"
					name="agressivo"
					checked={checkBoxValue.agressivo}
					onChange={(e) =>
						setCheckBoxValue((prevState) => ({
							...prevState,
							agressivo: e.target.checked,
						}))
					}
				/>
				<label>Habitat:</label>
				<input
					type="text"
					value={habitat}
					onChange={(e) => setHabitat(e.target.value)}
					required
				/>
				<label>Hábito de vida:</label>
				<textarea
					value={habito}
					onChange={(e) => setHabito(e.target.value)}
					required
					rows="5" 
					cols="50" 
				/>
				<label>Características gerais:</label>
				<textarea
					value={caractGeral}
					onChange={(e) => setCaractGeral(e.target.value)}
					required
					rows="5" 
					cols="50" 
				/>

				<button type="submit">Adicionar Animal</button>
			</form>
		</div>
	);
};

export default App;
