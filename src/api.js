/**
 * Wrapper simples para requisições fetch compatível com a API do Mercado Pago.
 */
export async function requisicao(url, options = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const resposta = await fetch(url, config);
    const dados = await resposta.json();

    if (!resposta.ok) {
      return {
        ok: false,
        status: resposta.status,
        erro: dados.message || 'Erro desconhecido na API do Mercado Pago',
        detalhes: dados
      };
    }

    return {
      ok: true,
      status: resposta.status,
      dados
    };
  } catch (erro) {
    return {
      ok: false,
      erro: erro.message
    };
  }
}
