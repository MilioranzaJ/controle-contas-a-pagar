import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';

const categoriaRouter = Router();
const categoriaController = new CategoriaController();

categoriaRouter.post('/categorias', categoriaController.create);
categoriaRouter.get('/categorias', categoriaController.list);
categoriaRouter.get('/categorias/:id', categoriaController.findById);
categoriaRouter.put('/categorias/:id', categoriaController.update);
categoriaRouter.delete('/categorias/:id', categoriaController.delete);

export default categoriaRouter;