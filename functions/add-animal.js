const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
	console.log("Evento recebido:", event);

	if (event.httpMethod === "POST") {
		try {
			console.log("Corpo da solicitação:", event.body);
			const { nomePopular, nomeCientifico, especie } = JSON.parse(
				event.body
			);
			const dataPath = path.join(
				__dirname,
				"../src/data/data-animais.json"
			);

			console.log("Caminho do arquivo:", dataPath);

			// Verificar se o arquivo existe
			if (!fs.existsSync(dataPath)) {
				console.error("Arquivo data-animais.json não encontrado");
				return {
					statusCode: 500,
					body: JSON.stringify({
						error: "Arquivo data-animais.json não encontrado",
					}),
				};
			}

			const data = fs.readFileSync(dataPath, "utf8");
			const animais = JSON.parse(data);

			const newAnimal = {
				id: animais.length > 0 ? animais[animais.length - 1].id + 1 : 1,
				nomePopular,
				nomeCientifico,
				especie,
			};

			animais.push(newAnimal);

			fs.writeFileSync(dataPath, JSON.stringify(animais, null, 2));

			return {
				statusCode: 200,
				body: JSON.stringify({
					message: "Animal adicionado com sucesso",
				}),
			};
		} catch (error) {
			console.error("Erro:", error);
			return {
				statusCode: 500,
				body: JSON.stringify({
					error: "Falha ao processar a solicitação",
				}),
			};
		}
	} else {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Método não permitido" }),
		};
	}
};
