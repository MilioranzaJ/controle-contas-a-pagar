import { Request, Response } from 'express';
import { prisma } from '../services/prisma';

export class FormaPagamentoController {
  // Criar uma nova forma de pagamento
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório.' });
      }

      const formaPagamento = await prisma.formaPagamento.create({
        data: { nome },
      });

      return res.status(201).json(formaPagamento);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Uma forma de pagamento com este nome já existe.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  // Listar todas as formas de pagamento
  async list(req: Request, res: Response) {
    try {
      const formasPagamento = await prisma.formaPagamento.findMany({
        orderBy: { nome: 'asc' },
      });
      return res.status(200).json(formasPagamento);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  // Deletar uma forma de pagamento
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const formaPagamento = await prisma.formaPagamento.findUnique({ where: { id } });

      if (!formaPagamento) {
        return res.status(404).json({ message: 'Forma de pagamento não encontrada.' });
      }

      await prisma.formaPagamento.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2003') {
        return res.status(400).json({ message: 'Não é possível excluir. A forma de pagamento está vinculada a uma ou mais contas a pagar.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}