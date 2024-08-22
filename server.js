const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3001;

const uploadDir = path.resolve(__dirname, "src", "imgs");

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const tempName = Date.now() + path.extname(file.originalname);
		cb(null, tempName);
	},
});

const upload = multer({ storage: storage });

const corsOptions = {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/add-animal", upload.single("imagem"), (req, res) => {
	const {
		nomePopular,
		nomeCientifico,
		familia,
		habitat,
		habito,
		caractGeral,
		peconhento,
		agressivo,
	} = req.body;
	const imagem = req.file ? req.file.filename : null;

	if (!nomePopular) {
		return res.status(400).json({ error: "Nome popular é obrigatório" });
	}

	const newFilename = toCamelCase(nomePopular) + path.extname(req.file.originalname);
	const oldPath = path.join(uploadDir, imagem);
	const newPath = path.join(uploadDir, newFilename);

	fs.rename(oldPath, newPath, (err) => {
		if (err) {
			console.error("Erro ao renomear arquivo:", err);
			return res.status(500).json({ error: "Erro ao processar imagem" });
		}
		fs.readFile(
			path.join(__dirname, "src", "data", "data-animais.json"),
			"utf8",
			(err, data) => {
				if (err) {
					console.error("Erro ao ler data-animais.json:", err);
					return res
						.status(500)
						.json({ error: "Falha ao ler dados do servidor" });
				}

				const animais = JSON.parse(data);
				const newAnimal = {
					id:
						animais.length > 0
							? animais[animais.length - 1].id + 1
							: 1,
					imagem: newFilename,
					nomePopular,
					nomeCientifico,
					familia,
					habitat,
					habito,
					caractGeral,
					peconhento,
					agressivo,
				};

				animais.push(newAnimal);

				fs.writeFile(
					path.join(__dirname, "src", "data", "data-animais.json"),
					JSON.stringify(animais, null, 2),
					(err) => {
						if (err) {
							console.error(
								"Erro ao escrever data-animais.json:",
								err
							);
							return res.status(500).json({
								error: "Falha ao salvar dados no servidor",
							});
						}

						res.status(200).json({
							message: "Animal adicionado com sucesso",
						});
					}
				);
			}
		);
	});
});

app.get("/api/status", (req, res) => {
	fs.readFile(
		path.join(__dirname, "src", "data", "data-animais.json"),
		"utf8",
		(err, data) => {
			if (err) {
				return res
					.status(500)
					.json({ error: "Erro ao ler dados do servidor" });
			}
			res.status(200).json(JSON.parse(data));
		}
	);
});

app.post("/api/clear-data", (req, res) => {
	fs.writeFile(
		path.join(__dirname, "src", "data", "data-animais.json"),
		JSON.stringify([], null, 2),
		(err) => {
			if (err) {
				console.error("Erro ao limpar data-animais.json:", err);
				return res
					.status(500)
					.json({ error: "Falha ao limpar dados do servidor" });
			}

			res.status(200).json({ message: "Dados limpos com sucesso" });
		}
	);
});

app.listen(port, () => {
	console.log(`Servidor está rodando em http://localhost:${port}`);
});


function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, '');
}
