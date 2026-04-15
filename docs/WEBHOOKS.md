# 🔔 Notificações em Tempo Real (Webhooks)

Para que seu sistema saiba que um pagamento foi aprovado sem precisar consultar manualmente o tempo todo, você deve usar os **Webhooks**.

## 🏗️ Como configurar

1. Acesse o **Dashboard do Mercado Pago**.
2. Vá em **Suas Integrações** > **Notificações** > **Webhooks**.
3. Adicione a URL do seu servidor (deve ser `https`).
4. Selecione o evento `payments`.

## 💻 Exemplo de Endpoint (Express.js)

```javascript
import express from 'express';
import { VincentMP } from 'vincent-mp-pix';

const app = express();
app.use(express.json());

const mp = new VincentMP('SEU_TOKEN');

app.post('/webhook', async (req, res) => {
  const { action, data } = req.body;

  // Verificamos se é uma atualização de pagamento
  if (action === 'payment.updated' || action === 'payment.created') {
    const paymentId = data.id;
    
    // SEMPRE consulte o status real no Mercado Pago antes de liberar o produto
    const info = await mp.consultarPagamento(paymentId);
    
    if (info.ok && info.status === 'approved') {
      console.log(`✅ Pagamento ${paymentId} APROVADO! Liberando recurso...`);
      // Lógica de liberação aqui
    }
  }

  res.status(200).send('OK');
});

app.listen(3000, () => console.log('Ouvindo notificações...'));
```

## 🛡️ Dica de Segurança

Nunca confie apenas nos dados enviados no corpo do POST do Webhook. Use o ID recebido para fazer uma consulta direta com `mp.consultarPagamento(id)` para garantir que o status é verídico.
