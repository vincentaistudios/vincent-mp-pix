import { requisicao } from './api.js';

/**
 * VincentMP - Biblioteca Profissional para Mercado Pago
 * @author Vincent AI Studios
 */
export class VincentMP {
  /**
   * @param {string} [accessToken] - Opcional se estiver no .env como MP_ACCESS_TOKEN
   */
  constructor(accessToken) {
    this.token = accessToken || process.env.MP_ACCESS_TOKEN;
    if (!this.token) {
      throw new Error('Erro: Token não encontrado. Adicione MP_ACCESS_TOKEN no seu arquivo .env');
    }
    this.baseUrl = 'https://api.mercadopago.com/v1';
    this.authHeader = { Authorization: `Bearer ${this.token}` };
  }

  /**
   * Gera uma data de expiração formatada para a API.
   * @param {number} minutos - Tempo em minutos para expirar.
   */
  _obterDataExpiracao(minutos = 30) {
    const data = new Date();
    data.setMinutes(data.getMinutes() + minutos);
    return data.toISOString();
  }

  /**
   * Cria uma preferência de pagamento via Pix.
   * @param {Object} opcoes - Dados do pagamento.
   */
  async criarPagamentoPix({ valor, descricao, email, expiraEm = 30, externoId }) {
    const corpo = {
      transaction_amount: parseFloat(valor),
      description: descricao || 'Pagamento via Vincent AI',
      payment_method_id: 'pix',
      external_reference: externoId || `${Date.now()}`,
      payer: {
        email: email || 'cliente@exemplo.com'
      },
      date_of_expiration: this._obterDataExpiracao(expiraEm)
    };

    const res = await requisicao(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}` },
      body: corpo
    });

    if (!res.ok) return res;

    return {
      ok: true,
      id: res.dados.id,
      status: res.dados.status,
      ticketUrl: res.dados.point_of_interaction.transaction_data.ticket_url,
      pix: {
        copiaCola: res.dados.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64: res.dados.point_of_interaction.transaction_data.qr_code_base64
      },
      detalhes: res.dados
    };
  }

  /**
   * Cria uma preferência de pagamento via Boleto.
   * @param {Object} opcoes - Dados do pagamento.
   */
  async criarPagamentoBoleto({ valor, descricao, nome, sobrenome, email, cpf, expiraEm = 1440 }) {
    const corpo = {
      transaction_amount: parseFloat(valor),
      description: descricao || 'Boleto via Vincent AI',
      payment_method_id: 'bolbradesco', // Opção padrão no Brasil
      external_reference: `${Date.now()}`,
      payer: {
        email: email || 'cliente@exemplo.com',
        first_name: nome || 'Cliente',
        last_name: sobrenome || 'Vincent',
        identification: {
          type: 'CPF',
          number: cpf || '00000000000'
        }
      },
      date_of_expiration: this._obterDataExpiracao(expiraEm)
    };

    const res = await requisicao(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}` },
      body: corpo
    });

    if (!res.ok) return res;

    return {
      ok: true,
      id: res.dados.id,
      status: res.dados.status,
      ticketUrl: res.dados.transaction_details.external_resource_url || res.dados.point_of_interaction.transaction_data.ticket_url,
      boleto: {
        url: res.dados.transaction_details.external_resource_url,
        codigoBarras: res.dados.barcode.content
      },
      detalhes: res.dados
    };
  }

  /**
   * Consulta o status de um pagamento.
   * @param {string|number} id - ID do pagamento no Mercado Pago.
   */
  async consultarPagamento(id) {
    const res = await requisicao(`${this.baseUrl}/payments/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });

    if (!res.ok) return res;

    return {
      ok: true,
      id: res.dados.id,
      status: res.dados.status,
      statusDetalhe: res.dados.status_detail,
      metodo: res.dados.payment_method_id,
      valor: res.dados.transaction_amount,
      valorPago: res.dados.transaction_details?.total_paid_amount || 0,
      dataCriacao: res.dados.date_created,
      detalhes: res.dados
    };
  }

  /**
   * Realiza o estorno (refund) de um pagamento aprovado.
   * @param {string|number} id - ID do pagamento.
   * @param {number} [valor] - Valor parcial. Se omitido, estorna o valor total.
   */
  async estornarPagamento(id, valor) {
    const corpo = valor ? { amount: parseFloat(valor) } : {};
    const res = await requisicao(`${this.baseUrl}/payments/${id}/refunds`, {
      method: 'POST',
      headers: this.authHeader,
      body: corpo
    });

    if (!res.ok) return res;

    return {
      ok: true,
      idEstorno: res.dados.id,
      valorEstornado: res.dados.amount,
      status: res.dados.status,
      detalhes: res.dados
    };
  }

  /**
   * Pesquisa pagamentos (Extrato).
   * @param {Object} filtros - Filtros da consulta (ex: status, range de datas).
   * @see https://www.mercadopago.com.br/developers/pt/reference/payments/_payments_search/get
   */
  async buscarPagamentos(filtros = {}) {
    const query = new URLSearchParams(filtros).toString();
    const res = await requisicao(`${this.baseUrl}/payments/search?${query}`, {
      headers: this.authHeader
    });

    if (!res.ok) return res;

    return {
      ok: true,
      total: res.dados.paging.total,
      resultados: res.dados.results,
      detalhes: res.dados
    };
  }
}
