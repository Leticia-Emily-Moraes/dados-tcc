const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
	try {
		const filePath = path.join(
			__dirname,
			"src",
			"data",
			"data-animais.json"
		);
		if (!fs.existsSync(filePath)) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error: "Arquivo data-animais.json não encontrado",
				}),
			};
		}

		const data = fs.readFileSync(filePath, "utf8");
		return {
			statusCode: 200,
			body: data,
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Erro interno do servidor",
				details: error.message,
			}),
		};
	}
};
