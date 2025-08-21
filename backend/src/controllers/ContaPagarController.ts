import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { z } from 'zod'; // Usaremos Zod para validação de dados

// Definindo um schema de validação para a criação/atualização de contas
const contaSchema = z.object({
  descricao: z.string().min(1, 'A descrição é obrigatória.'),
  valor: z.number().positive('O valor deve ser um número positivo.'),
  dataVencimento: z.string().transform((str) => new Date(str)),
  categoriaId: z.string().uuid('O ID da categoria é inválido.'),
  fornecedorId: z.string().uuid('O ID do fornecedor é inválido.'),
  formaPagamentoId: z.string().uuid('O ID da forma de pagamento é inválido.').optional().nullable(),
});

export class ContaPagarController {
  // Criar uma nova conta a pagar
  async create(req: Request, res: Response) {
    try {
      // Valida os dados de entrada com Zod
      const dadosValidados = contaSchema.parse(req.body);

      const conta = await prisma.contaPagar.create({
        data: {
          ...dadosValidados,
          status: 'PENDENTE', // Status inicial é sempre pendente
        },
      });

      return res.status(201).json(conta);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos.', errors: error.issues });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      // O status vem como string da URL. Ex: 'PENDENTE'
      const { status } = req.query;

      // Objeto de filtro para a consulta do Prisma
      const where: any = {};

      // Se o parâmetro 'status' foi enviado na URL, adiciona ao filtro
      if (status && typeof status === 'string' && ['PENDENTE', 'PAGA', 'VENCIDA'].includes(status.toUpperCase())) {
        // Garante que o status seja um dos valores válidos do nosso Enum
        where.status = status.toUpperCase() as 'PENDENTE' | 'PAGA' | 'VENCIDA';
      }

      const contas = await prisma.contaPagar.findMany({
        where, // Usa o objeto de filtro (pode estar vazio ou com o status)
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
      return res.status(500).json({ message: error.message });
    }
  }

  // Buscar uma conta por ID
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
      return res.status(500).json({ message: error.message });
    }
  }

  // Atualizar uma conta (incluindo marcar como paga)
async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dadosEntrada = req.body; // Pega tudo que veio no corpo da requisição

      const contaExistente = await prisma.contaPagar.findUnique({ where: { id } });
      if (!contaExistente) {
        return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
      }

      // Prepara o objeto de dados apenas com os campos que foram enviados
      const dadosAtualizados: any = {};

      if (dadosEntrada.descricao !== undefined) dadosAtualizados.descricao = dadosEntrada.descricao;
      if (dadosEntrada.valor !== undefined) dadosAtualizados.valor = parseFloat(dadosEntrada.valor);
      if (dadosEntrada.dataVencimento !== undefined) dadosAtualizados.dataVencimento = new Date(dadosEntrada.dataVencimento);
      if (dadosEntrada.status !== undefined) dadosAtualizados.status = dadosEntrada.status;
      if (dadosEntrada.categoriaId !== undefined) dadosAtualizados.categoriaId = dadosEntrada.categoriaId;
      if (dadosEntrada.fornecedorId !== undefined) dadosAtualizados.fornecedorId = dadosEntrada.fornecedorId;
      if (dadosEntrada.formaPagamentoId !== undefined) dadosAtualizados.formaPagamentoId = dadosEntrada.formaPagamentoId;
      if (dadosEntrada.observacoes !== undefined) dadosAtualizados.observacoes = dadosEntrada.observacoes;

      // Lógica específica para "Marcar como Paga"
      if (dadosEntrada.status === 'PAGA' && !contaExistente.dataPagamento) {
        dadosAtualizados.dataPagamento = new Date();
      }

      const contaAtualizada = await prisma.contaPagar.update({
        where: { id },
        data: dadosAtualizados,
        // Adicionamos o 'include' para que a resposta da API seja completa
        include: {
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

  // Deletar uma conta
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
      return res.status(500).json({ message: error.message });
    }
  }
}