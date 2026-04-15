import { requisicao } from './api.js';

/**
 * VincentMP - Biblioteca Profissional para Mercado Pago
 * @author Vincent AI Studios
 */
export class VincentMP {
  /**
   * @param {string} accessToken - Seu Access Token do Mercado Pago (iniciando com APP_USR)
   */
  constructor(accessToken) {
    if (!accessToken) throw new Error('O Access Token é obrigatório.');
    this.token = accessToken;
    this.baseUrl = 'https://api.mercadopago.com/v1';
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
      dataCriacao: res.dados.date_created,
      detalhes: res.dados
    };
  }
}
