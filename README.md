<div align="center">
  <img src="https://count.getloli.com/get/@vincent-mp-pix?theme=rule34" alt="Visitas ao Repositório" />
</div>

<div align="center">
  <img src="./recursos/banner.png" alt="Vincent MP Pix Banner" width="100%">
</div>

# 💎 vincent-mp-pix
### A Próxima Geração de Pagamentos para Mercado Pago (Node.js)

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-24+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Mercado_Pago-API_v1-009EE3?style=for-the-badge&logo=mercadopago&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-F7DF1E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vincent_AI-Studios-blue?style=for-the-badge" />
</p>

---

## 🌟 Diferenciais
O **vincent-mp-pix** não é apenas um wrapper de API. É uma solução completa de governança financeira para bots e sites.

*   ✅ **Moderno**: 100% ESM e utiliza `fetch` nativo (sem dependências pesadas).
*   ✅ **Inteligente**: Busca automática de tokens no `.env`.
*   ✅ **Escalável**: Suporta Pix, Boletos, Estornos e Auditoria de Taxas.
*   ✅ **Resiliente**: Tratamento de erros detalhado para cada transação.

---

## 📚 Documentação Especializada
Escolha o manual que você precisa:

| Guia | Descrição |
|---|---|
| 🔑 [**Credenciais**](./docs/CREDENCIAIS.md) | Como obter seu Access Token e configurar o ambiente. |
| ⚡ [**Guia Pix**](./docs/PIX.md) | Geração de QR Code e Código Copia e Cola. |
| 📄 [**Guia Boleto**](./docs/BOLETO.md) | Emissão de boletos bancários profissionais. |
| 💰 [**Estornos**](./docs/ESTORNOS.md) | Como realizar devoluções totais ou parciais de valores. |
| 📊 [**Relatórios**](./docs/RELATORIOS.md) | Auditoria de lucros, taxas e extratos por cliente. |
| 🔄 [**Automação (Polling)**](./docs/POLLING.md) | Como automatizar o seu sistema SEM precisar de servidor público. |
| 🔔 [**Webhooks**](./docs/WEBHOOKS.md) | Integração automática em tempo real via servidor. |

---

## 🚀 Instalação e Configuração

### 1. No Terminal:
```bash
npm install vincent-mp-pix
```

### 2. No arquivo `.env`:
```env
MP_ACCESS_TOKEN=APP_USR-SEU-TOKEN-AQUI
```

---

## 🛠️ Exemplos de Uso Rápido

### Gerar um Pix e Abrir o Comprovante
```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP();

const pix = await mp.criarPagamentoPix({
  valor: 10.00,
  descricao: 'Venda - Robô Vincent AI',
  email: 'cliente@exemplo.com'
});

if (pix.ok) {
  console.log('✅ Pix Gerado!');
  console.log('Copia e Cola:', pix.pix.copiaCola);
  console.log('Site Oficial:', pix.ticketUrl);
}
```

### Auditoria de Lucro Líquido
```javascript
const relatorio = await mp.gerarRelatorioUsuario('cliente@email.com');

if (relatorio.ok) {
  console.log(`🤑 Lucro Líquido Real com este cliente: R$ ${relatorio.consolidado.lucroLiquido}`);
  console.log(`🏦 Taxas pagas ao MP: R$ ${relatorio.consolidado.taxasMercadoPago}`);
}
```

---

## 🛡️ Segurança e Governança
Este projeto foi desenvolvido sob os padrões de engenharia da **Vincent AI Studios**. Priorizamos a segurança dos dados e a precisão dos cálculos financeiros. Todas as interações com a API do Mercado Pago utilizam protocolos de autenticação Bearer seguros.

## 🤝 Contribuições
Sinta-se à vontade para abrir Issues ou enviar Pull Requests. Este projeto faz parte do ecossistema aberto da Vincent AI.

---

<p align="center">
  Desenvolvido com ❤️ por <b>Vincent AI Studios</b>
</p>
