import React, { useState, useRef } from "react";
import "./style.css";

const InserirAnimal = () => {
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
	const [imagePreview, setImagePreview] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				setImageFile(file);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview("");
			setImageFile(null);
		}
	};

	const handleImagePreviewClick = () => {
		fileInputRef.current.click();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		if (imageFile) {
			formData.append("imagem", imageFile);
		}
		formData.append("nomePopular", nomePopular);
		formData.append("nomeCientifico", nomeCientifico);
		formData.append("familia", familia);
		formData.append("habitat", habitat);
		formData.append("habito", habito);
		formData.append("caractGeral", caractGeral);
		formData.append("peconhento", checkBoxValue.peconhento);
		formData.append("agressivo", checkBoxValue.agressivo);

		try {
			const response = await fetch(
				"/api/add-animal",
				{
					method: "POST",
					mode: "cors",
					body: formData,
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
				setImagePreview("");
				setImageFile(null);
			} else {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					const errorData = await response.json();
					alert(`Falha ao adicionar animal: ${errorData.error}`);
				} else {
					const errorText = await response.text();
					console.error("Resposta inesperada:", errorText);
					alert("Erro inesperado ao adicionar o animal.");
				}
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
				<label>Imagem animal:</label>
				<div
					className="ImagemPreview"
					onClick={handleImagePreviewClick}
				>
					{imagePreview ? (
						<img
							src={imagePreview}
							alt="Pré-visualização"
							className="ImgViewer"
						/>
					) : (
						<span>Coloque a Imagem</span>
					)}
				</div>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					ref={fileInputRef}
				/>
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

export default InserirAnimal;
