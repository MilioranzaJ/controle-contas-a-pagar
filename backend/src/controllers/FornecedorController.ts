import { Request, Response } from 'express';
import { prisma } from '../services/prisma';

export class FornecedorController {
  // Criar um novo fornecedor
  async create(req: Request, res: Response) {
    try {
      const { nome, documento, telefone, email, observacoes } = req.body;

      if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório.' });
      }

      const fornecedor = await prisma.fornecedor.create({
        data: { nome, documento, telefone, email, observacoes },
      });

      return res.status(201).json(fornecedor);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Listar todos os fornecedores
  async list(req: Request, res: Response) {
    try {
      const fornecedores = await prisma.fornecedor.findMany({
        orderBy: { nome: 'asc' },
      });
      return res.status(200).json(fornecedores);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Buscar um fornecedor por ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fornecedor = await prisma.fornecedor.findUnique({
        where: { id },
      });

      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado.' });
      }

      return res.status(200).json(fornecedor);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar um fornecedor
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, documento, telefone, email, observacoes } = req.body;

      let fornecedor = await prisma.fornecedor.findUnique({ where: { id } });

      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado.' });
      }

      fornecedor = await prisma.fornecedor.update({
        where: { id },
        data: { nome, documento, telefone, email, observacoes },
      });

      return res.status(200).json(fornecedor);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar um fornecedor
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const fornecedor = await prisma.fornecedor.findUnique({ where: { id } });

      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado.' });
      }

      await prisma.fornecedor.delete({
        where: { id },
      });

      return res.status(204).send(); // 204 No Content
    } catch (error: any) {
      // Tratar erro caso o fornecedor esteja atrelado a uma conta a pagar
      if (error.code === 'P2003') {
        return res.status(400).json({ message: 'Não é possível excluir. O fornecedor está vinculado a uma ou mais contas a pagar.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}