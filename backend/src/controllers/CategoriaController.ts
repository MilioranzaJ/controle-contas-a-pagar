import { Request, Response } from 'express';
import { prisma } from '../services/prisma';

export class CategoriaController {
  // Criar uma nova categoria
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório.' });
      }

      const categoria = await prisma.categoria.create({
        data: { nome },
      });

      return res.status(201).json(categoria);
    } catch (error: any) {
      // Código 'P2002' é para violação de constraint única (unique) no Prisma
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Uma categoria com este nome já existe.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  // Listar todas as categorias
  async list(req: Request, res: Response) {
    try {
      const categorias = await prisma.categoria.findMany({
        orderBy: { nome: 'asc' },
      });
      return res.status(200).json(categorias);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Buscar uma categoria por ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoria = await prisma.categoria.findUnique({
        where: { id },
      });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      return res.status(200).json(categoria);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar uma categoria
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      let categoria = await prisma.categoria.findUnique({ where: { id } });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      categoria = await prisma.categoria.update({
        where: { id },
        data: { nome },
      });

      return res.status(200).json(categoria);
    } catch (error: any) { // <<---- O ERRO ESTAVA AQUI: FALTAVA O '{'
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Uma categoria com este nome já existe.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  // Deletar uma categoria
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoria = await prisma.categoria.findUnique({ where: { id } });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      await prisma.categoria.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2003') {
        return res.status(400).json({ message: 'Não é possível excluir. A categoria está vinculada a uma ou mais contas a pagar.' });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}