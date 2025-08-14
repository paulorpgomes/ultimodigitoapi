export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido. Use POST.' });
  }

  let body = '';

  try {
    // Captura o corpo da requisição manualmente
    await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', resolve);
      req.on('error', reject);
    });

    const data = JSON.parse(body);
    const numero = data.numero;

    if (!numero || typeof numero !== 'string') {
      return res.status(400).json({ erro: 'Número inválido ou ausente' });
    }

    const ultimo = numero.trim().slice(-1);

    if (!/\d/.test(ultimo)) {
      return res.status(400).json({ erro: 'Último caractere não é um dígito' });
    }

    return res.status(200).json({ ultimo_digito: ultimo });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
  }
}