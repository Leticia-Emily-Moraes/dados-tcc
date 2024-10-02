const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const archiver = require("archiver");
const app = express();
const port = process.env.PORT || 3011;

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
	origin: [
		"http://localhost:3010",
		"http://faunabc.portfolioeducacionalrgs.com:3010",
	],
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type"],
	credentials: true,
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

	const newFilename =
		toCamelCase(nomeCientifico) + path.extname(req.file.originalname);
	const oldPath = path.join(uploadDir, imagem);
	const newPath = path.join(uploadDir, newFilename);

	fs.rename(oldPath, newPath, (err) => {
		if (err) {
			console.error("Erro ao renomear arquivo:", err);
			return res.status(500).json({ error: "Erro ao processar imagem" });
		}
		console.log(`Imagem salva como: ${newFilename} no caminho ${newPath}`);
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

app.use("/api/images", (req, res, next) => {
    console.log("Requisição para a imagem:", req.url);
    next();
}, express.static(path.join(__dirname, "src", "imgs")));


app.get("/api/animais", (req, res) => {
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

app.delete("/api/animais/:id", (req, res) => {
	const animalId = parseInt(req.params.id);

	fs.readFile(
		path.join(__dirname, "src", "data", "data-animais.json"),
		"utf8",
		(err, data) => {
			if (err) {
				console.error("Erro ao ler data-animais.json:", err);
				return res
					.status(500)
					.json({ error: "Erro ao ler dados do servidor" });
			}

			let animais = JSON.parse(data);
			const animalIndex = animais.findIndex(
				(animal) => animal.id === animalId
			);

			if (animalIndex === -1) {
				return res.status(404).json({ error: "Animal não encontrado" });
			}

			const [removedAnimal] = animais.splice(animalIndex, 1);

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
							error: "Erro ao salvar alterações no servidor",
						});
					}

					const imagePath = path.join(
						uploadDir,
						removedAnimal.imagem
					);
					fs.unlink(imagePath, (err) => {
						if (err) {
							console.error("Erro ao deletar imagem:", err);
						}
					});

					res.status(200).json({
						message: "Animal excluído com sucesso",
					});
				}
			);
		}
	);
});

app.get("/api/download-data", (req, res) => {
	const output = fs.createWriteStream(
		path.join(__dirname, "data-animais.zip")
	);
	const archive = archiver("zip", { zlib: { level: 9 } });

	output.on("close", () => {
		res.download(
			path.join(__dirname, "data-animais.zip"),
			"data-animais.zip",
			(err) => {
				if (err) {
					console.error("Erro ao enviar o arquivo:", err);
					res.status(500).json({ error: "Erro ao enviar o arquivo" });
				}
			}
		);
	});

	archive.on("error", (err) => {
		console.error("Erro ao criar o arquivo zip:", err);
		res.status(500).json({ error: "Erro ao criar o arquivo zip" });
	});

	archive.pipe(output);
	archive.file(path.join(__dirname, "src", "data", "data-animais.json"), {
		name: "data-animais.json",
	});
	archive.directory(uploadDir, "images");

	archive.finalize();
});

app.listen(port, () => {
	console.log(`Servidor está rodando em ${port}`);
});

function toCamelCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "")
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
			index === 0 ? match.toLowerCase() : match.toUpperCase()
		)
		.replace(/\s+/g, "");
}
