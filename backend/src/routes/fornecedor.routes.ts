import { Router } from 'express';
import { FornecedorController } from '../controllers/FornecedorController';

const fornecedorRouter = Router();
const fornecedorController = new FornecedorController();

fornecedorRouter.post('/fornecedores', fornecedorController.create);
fornecedorRouter.get('/fornecedores', fornecedorController.list);
fornecedorRouter.get('/fornecedores/:id', fornecedorController.findById);
fornecedorRouter.put('/fornecedores/:id', fornecedorController.update);
fornecedorRouter.delete('/fornecedores/:id', fornecedorController.delete);

export default fornecedorRouter;