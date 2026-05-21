# Vincent MP Pix Gateway

> Gateway de pagamentos instantâneos via Pix integrado ao **Mercado Pago** — desenvolvido pela [Vincent AI Studios](https://github.com/vincentaistudios).

---

## ⚡ Features

- Geração de cobranças Pix em tempo real via Mercado Pago SDK
- Retorno do QR Code e QR Code Base64 para renderização imediata
- API REST com Express.js
- Configuração via variáveis de ambiente (`.env`)
- Endpoint de health check integrado

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 18
- Conta no [Mercado Pago Developers](https://www.mercadopago.com.br/developers)

### Instalação

```bash
git clone https://github.com/vincentaistudios/vincent-mp-pix.git
cd vincent-mp-pix
npm install
```

### Configuração

```bash
cp .env.example .env
# Edite o .env com seu Access Token do Mercado Pago
```

### Execução

```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

O servidor sobe na porta **3000** por padrão.

---

## 📡 Endpoints

### `POST /api/pix/create`

Gera uma cobrança Pix e retorna o QR Code.

**Body (JSON):**

```json
{
  "transaction_amount": 99.90,
  "description": "Pedido #1234",
  "email": "cliente@email.com"
}
```

**Resposta (201):**

```json
{
  "paymentId": 123456789,
  "status": "pending",
  "qrCode": "00020126...",
  "qrCodeBase64": "iVBORw0KGgo..."
}
```

### `GET /health`

```json
{ "status": "ok", "service": "Vincent MP Pix Gateway" }
```

---

## 🏗️ Estrutura

```
vincent-mp-pix/
├── src/
│   └── pixController.js   # Lógica de criação do pagamento Pix
├── routes/
│   └── pix.js             # Rotas Express
├── server.js              # Entry point da aplicação
├── .env.example           # Template de variáveis de ambiente
└── package.json
```

---

## 🛡️ Segurança

- **Nunca** comite o arquivo `.env` com o seu `MP_ACCESS_TOKEN`.
- Use variáveis de ambiente em produção (Railway, Render, Heroku etc.).

---

## 📄 Licença

MIT © [Vincent AI Studios](https://github.com/vincentaistudios)
