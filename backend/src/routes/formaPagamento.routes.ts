import { Router } from 'express';
import { FormaPagamentoController } from '../controllers/FormaPagamentoController';

const formaPagamentoRouter = Router();
const formaPagamentoController = new FormaPagamentoController();

formaPagamentoRouter.post('/formas-pagamento', formaPagamentoController.create);
formaPagamentoRouter.get('/formas-pagamento', formaPagamentoController.list);
formaPagamentoRouter.delete('/formas-pagamento/:id', formaPagamentoController.delete);

export default formaPagamentoRouter;