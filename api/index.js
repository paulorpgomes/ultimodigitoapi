const express = require('express');
const app = express();

app.use(express.json());

app.post('/ultimo-digito', (req, res) => {
  const { numero } = req.body;

  if (!numero || typeof numero !== 'string') {
    return res.status(400).json({ erro: 'Número inválido ou ausente' });
  }

  const digitos = numero.trim();
  const ultimo = digitos[digitos.length - 1];

  if (!/\d/.test(ultimo)) {
    return res.status(400).json({ erro: 'Último caractere não é um dígito' });
  }

  res.json({ ultimo_digito: ultimo });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});