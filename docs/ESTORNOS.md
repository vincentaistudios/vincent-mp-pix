# 💰 Gestão de Estornos (Refunds)

O sistema permite que você devolva o dinheiro ao cliente de forma total ou parcial. Isso é essencial para lidar com pagamentos duplicados, desistências ou erros de valor.

## 🚀 Como realizar um estorno

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP();

const paymentId = '1234567890'; // ID do pagamento aprovado

// Exemplo 1: Estorno TOTAL
const resTotal = await mp.estornarPagamento(paymentId);

// Exemplo 2: Estorno PARCIAL (ex: devolver apenas R$ 5,00 de um pagamento de R$ 10,00)
const resParcial = await mp.estornarPagamento(paymentId, 5.00);

if (resTotal.ok) {
  console.log('✅ Estorno realizado com sucesso!');
  console.log('ID do Estorno:', resTotal.idEstorno);
  console.log('Valor devolvido:', resTotal.valorEstornado);
} else {
  console.error('❌ Erro ao estornar:', resTotal.erro);
}
```

## 🛡️ Regras Importantes

1.  **Saldo em conta**: Você precisa ter saldo disponível na sua conta Mercado Pago para cobrir o valor do estorno.
2.  **Status**: Apenas pagamentos com status `approved` podem ser estornados.
3.  **Prazo**: Geralmente, estornos podem ser feitos em até 180 dias após a aprovação.
4.  **Instantâneo**: No caso do Pix, o dinheiro volta para a conta do pagador quase que instantaneamente.
