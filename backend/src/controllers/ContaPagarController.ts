import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { z } from 'zod';


const contaCreateSchema = z.object({
  descricao: z.string().min(1, 'A descrição é obrigatória.'),
  valor: z.number().positive('O valor deve ser um número positivo.'),
  dataVencimento: z.string().transform((str) => new Date(str)),
  categoriaId: z.string().uuid('O ID da categoria é inválido.'),
  fornecedorId: z.string().uuid('O ID do fornecedor é inválido.'),
  formaPagamentoId: z.string().uuid('O ID da forma de pagamento é inválido.'),
  observacoes: z.string().optional(),
});

export class ContaPagarController {
  
  async list(req: Request, res: Response) {
    try {
      
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      await prisma.contaPagar.updateMany({
        where: {
          status: 'PENDENTE',
          dataVencimento: { lt: hoje },
        },
        data: { status: 'VENCIDA' },
      });

      //filtros
      const { status, categoriaId, fornecedorId } = req.query;
      const where: any = {};

      if (status && typeof status === 'string' && ['PENDENTE', 'PAGA', 'VENCIDA'].includes(status.toUpperCase())) {
        where.status = status.toUpperCase() as 'PENDENTE' | 'PAGA' | 'VENCIDA';
      }
      if (categoriaId && typeof categoriaId === 'string') {
        where.categoriaId = categoriaId;
      }
      if (fornecedorId && typeof fornecedorId === 'string') {
        where.fornecedorId = fornecedorId;
      }

      const contas = await prisma.contaPagar.findMany({
        where,
        include: {
          fornecedor: true,
          categoria: true,
          formaPagamento: true,
        },
        orderBy: {
          dataVencimento: 'asc',
        },
      });

      return res.status(200).json(contas);
    } catch (error: any) {
      console.error("Erro ao listar contas:", error);
      return res.status(500).json({ message: 'Erro ao listar contas.', error: error.message });
    }
  }

  
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const conta = await prisma.contaPagar.findUnique({
        where: { id },
        include: {
          fornecedor: true,
          categoria: true,
          formaPagamento: true,
        },
      });

      if (!conta) {
        return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
      }

      return res.status(200).json(conta);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar conta.', error: error.message });
    }
  }

  //cria uma nova conta
  async create(req: Request, res: Response) {
    try {
      
      const dadosValidados = contaCreateSchema.parse(req.body);

      const conta = await prisma.contaPagar.create({
        data: {
          ...dadosValidados,
          status: 'PENDENTE',
        },
      });

      return res.status(201).json(conta);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos.', errors: error.issues });
      }
      console.error('Erro ao criar conta:', error);
      return res.status(500).json({ message: 'Erro ao criar conta.', error: error.message });
    }
  }

  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dadosEntrada = req.body;

      const contaExistente = await prisma.contaPagar.findUnique({ where: { id } });
      if (!contaExistente) {
        return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
      }

      const dadosAtualizados: any = {};
      
      
      if (dadosEntrada.descricao !== undefined) dadosAtualizados.descricao = dadosEntrada.descricao;
      if (dadosEntrada.valor !== undefined) dadosAtualizados.valor = parseFloat(dadosEntrada.valor);
      if (dadosEntrada.dataVencimento !== undefined) dadosAtualizados.dataVencimento = new Date(dadosEntrada.dataVencimento);
      if (dadosEntrada.status !== undefined) dadosAtualizados.status = dadosEntrada.status;
      if (dadosEntrada.categoriaId !== undefined) dadosAtualizados.categoriaId = dadosEntrada.categoriaId;
      if (dadosEntrada.fornecedorId !== undefined) dadosAtualizados.fornecedorId = dadosEntrada.fornecedorId;
      if (dadosEntrada.formaPagamentoId !== undefined) dadosAtualizados.formaPagamentoId = dadosEntrada.formaPagamentoId;
      if (dadosEntrada.observacoes !== undefined) dadosAtualizados.observacoes = dadosEntrada.observacoes;

      
      if (dadosEntrada.status === 'PAGA' && !contaExistente.dataPagamento) {
        dadosAtualizados.dataPagamento = new Date();
      }

      const contaAtualizada = await prisma.contaPagar.update({
        where: { id },
        data: dadosAtualizados,
        include: { //retorna o objeto completo com as relações
          fornecedor: true,
          categoria: true,
          formaPagamento: true,
        },
      });

      return res.status(200).json(contaAtualizada);
    } catch (error: any) {
      console.error('ERRO NO UPDATE DO CONTROLLER:', error);
      return res.status(500).json({ message: 'Erro interno ao atualizar a conta.', error: error.message });
    }
  }

  //metodo para deletar uma conta
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const conta = await prisma.contaPagar.findUnique({ where: { id } });

      if (!conta) {
        return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
      }

      await prisma.contaPagar.delete({ where: { id } });

      return res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar conta:', error);
      return res.status(500).json({ message: 'Erro ao deletar conta.', error: error.message });
    }
  }
}