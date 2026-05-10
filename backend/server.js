const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha sao obrigatorios.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email ja cadastrado.' });
  }
  users.push({ email, password });
  console.log('Cadastrado:', email);
  return res.status(201).json({ message: 'Usuario cadastrado com sucesso.' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email ou senha invalidos.' });
  }
  return res.json({ message: 'Login realizado com sucesso.', user: { email } });
});

app.post('/recover-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Informe o email.' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'Email nao encontrado.' });
  }
  console.log(`Recuperacao de senha solicitada para: ${email}`);
  return res.json({ message: `Um link de recuperacao foi enviado para ${email}.` });
});

app.get('/', (req, res) => {
  res.json({ status: 'API rodando', usuarios: users.length });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend rodando em http://0.0.0.0:${PORT}`);
});
