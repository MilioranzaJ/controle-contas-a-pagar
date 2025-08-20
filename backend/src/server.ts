import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // 1. IMPORTE O PACOTE CORS

import fornecedorRouter from './routes/fornecedor.routes';
import categoriaRouter from './routes/categoria.routes';
import formaPagamentoRouter from './routes/formaPagamento.routes';
import contaPagarRouter from './routes/contaPagar.routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors()); // 2. USE O CORS AQUI (ANTES DAS ROTAS!)

// Registrando todos os roteadores com o prefixo /api
app.use('/api', fornecedorRouter);
app.use('/api', categoriaRouter);
app.use('/api', formaPagamentoRouter);
app.use('/api', contaPagarRouter);

app.get('/', (req, res) => {
  res.send('API Contas a Pagar está no ar!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});