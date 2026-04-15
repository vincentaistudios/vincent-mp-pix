# 🔄 Automação via Polling (Sem Servidor)

Se você não tem um servidor público (HTTPS) ou não quer configurar Webhooks, a melhor forma de automatizar a entrega é via **Polling**. 

O seu código fica "vigiando" o pagamento em um loop até que ele seja aprovado.

## 🚀 Exemplo de Loop de Verificação

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP();

async function processarPagamento(paymentId) {
  console.log(`⏳ Iniciando monitoramento do pagamento ${paymentId}...`);
  
  let aprovado = false;
  const tentativasMaximas = 60; // Tenta por 5 minutos (1 tentativa a cada 5 segundos)
  let tentativas = 0;

  while (!aprovado && tentativas < tentativasMaximas) {
    tentativas++;
    const status = await mp.consultarPagamento(paymentId);

    if (status.ok && status.status === 'approved') {
      console.log('✅ Pagamento APROVADO! Liberando o produto...');
      aprovado = true;
      // Coloque aqui sua função de entrega (Ex: bot.sendMessage...)
      return true;
    }

    if (status.status === 'cancelled' || status.status === 'rejected') {
      console.log('❌ Pagamento cancelado ou rejeitado.');
      return false;
    }

    // Espera 5 segundos antes da próxima tentativa
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log('⏰ Tempo de espera esgotado.');
  return false;
}
```

## ⚖️ Vantagens e Desvantagens

| Característica | Polling (Loop) | Webhook (Servidor) |
|---|---|---|
| **Dificuldade** | Baixa (Funciona local) | Média (Precisa de HTTPS/VPS) |
| **Velocidade** | Depende do intervalo | Instantâneo |
| **Confiabilidade** | Se o bot desligar, o loop para | O Mercado Pago tenta reenviar o aviso |

> [!TIP]
> O Polling é ideal para **Bots de WhatsApp** que rodam no seu próprio computador.
