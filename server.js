const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/add-animal', (req, res) => {
  const { nomePopular, nomeCientifico, especie } = req.body;

  fs.readFile(path.join(__dirname, 'public', 'data', 'data-animais.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler data-animais.json:', err);
      return res.status(500).json({ error: 'Falha ao ler dados do servidor' });
    }

    const animais = JSON.parse(data);
    const newAnimal = {
      id: animais.length > 0 ? animais[animais.length - 1].id + 1 : 1,
      nomePopular,
      nomeCientifico,
      especie,
    };

    animais.push(newAnimal);

    fs.writeFile(path.join(__dirname, 'public', 'data', 'data-animais.json'), JSON.stringify(animais, null, 2), (err) => {
      if (err) {
        console.error('Erro ao escrever data-animais.json:', err);
        return res.status(500).json({ error: 'Falha ao salvar dados no servidor' });
      }

      res.status(200).json({ message: 'Animal adicionado com sucesso' });
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
