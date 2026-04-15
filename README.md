<div align="center">
  <img src="https://count.getloli.com/get/@vincent-mp-pix?theme=rule34" alt="Visitas ao Repositório" />
</div>

<div align="center">
  <img src="./recursos/banner.png" alt="Vincent MP Pix Banner" width="100%">
</div>

# 💎 vincent-mp-pix

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Mercado_Pago-v1-009EE3?style=for-the-badge&logo=mercadopago&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Estável-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-gray?style=for-the-badge" />
</p>

> **vincent-mp-pix** é uma biblioteca ultra-leve e profissional para integração de pagamentos com Mercado Pago. Focada em simplicidade, segurança e performance para automações e aplicações modernas.

---

## ✨ Funcionalidades

- ✅ **Pix**: Geração instantânea de QR Code e Copia e Cola.
- ✅ **Boleto**: Emissão simplificada de boletos com link e código de barras.
- ✅ **Status**: Consulta de pagamentos em tempo real.
- 🔔 **Webhooks**: Estrutura preparada para notificações automáticas.
- 🚀 **Sem Dependências Pesadas**: Utiliza o `fetch` nativo do Node.js.

---

## 📂 Documentação Detalhada

Para facilitar o aprendizado, organizamos a documentação por categoria:

| Guia | Descrição |
|---|---|
| 🔑 [**Credenciais**](./docs/CREDENCIAIS.md) | Como obter seu Access Token do Mercado Pago. |
| ⚡ [**Guia Pix**](./docs/PIX.md) | Como gerar e aceitar pagamentos via Pix. |
| 📄 [**Guia Boleto**](./docs/BOLETO.md) | Como emitir boletos bancários profissionais. |
| 🔔 [**Webhooks**](./docs/WEBHOOKS.md) | Como receber notificações de pagamento automático. |

---

## 🚀 Instalação e Configuração

```bash
npm install vincent-mp-pix
```

### 1. Configurar Credenciais
Crie um arquivo `.env` na raiz do seu projeto e adicione seu token:

```env
MP_ACCESS_TOKEN=APP_USR-SEU-TOKEN-AQUI
```

## 🛠️ Uso Básico

```javascript
import { VincentMP } from 'vincent-mp-pix';

// O sistema buscará o token automaticamente no seu arquivo .env
const mp = new VincentMP();

// Consultar um pagamento
const status = await mp.consultarPagamento('1234567890');
console.log(`Status: ${status.status}`);
```

---

## 🤝 Contribuições

Este projeto faz parte do ecossistema **Vincent AI Studios**. Sinta-se à vontade para abrir Issues ou enviar Pull Requests.

---

<p align="center">
  Desenvolvido com ❤️ por <b>Vincent AI Studios</b>
</p>
