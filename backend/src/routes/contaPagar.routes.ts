import { Router } from 'express';
import { ContaPagarController } from '../controllers/ContaPagarController';

const contaPagarRouter = Router();
const contaPagarController = new ContaPagarController();

contaPagarRouter.post('/contas', contaPagarController.create);
contaPagarRouter.get('/contas', contaPagarController.list);
contaPagarRouter.get('/contas/:id', contaPagarController.findById);
contaPagarRouter.put('/contas/:id', contaPagarController.update); // Rota para atualização geral
contaPagarRouter.patch('/contas/:id', contaPagarController.update);
contaPagarRouter.delete('/contas/:id', contaPagarController.delete);

export default contaPagarRouter;