# 📊 Relatórios e Auditoria Financeira

A biblioteca permite gerar relatórios detalhados de faturamento e comportamento de pagamento por cliente (e-mail). Isso é essencial para identificar bons pagadores ou clientes que solicitam muitos estornos.

## 🚀 Como gerar um relatório de usuário

O método `gerarRelatorioUsuario(email)` consolida toda a vida financeira do cliente com você.

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP();

const relatorio = await mp.gerarRelatorioUsuario('cliente@email.com');

if (relatorio.ok) {
  console.log(`📊 Relatório para: ${relatorio.email}`);
  console.log(`Total de Transações: ${relatorio.totalTransacoes}`);
  
  const { consolidado } = relatorio;
  console.log('--- RESUMO CONSOLIDADO ---');
  console.log(`💰 Valor Solicitado Total: R$ ${consolidado.valorSolicitado}`);
  console.log(`✅ Valor Pago Total: R$ ${consolidado.valorPago}`);
  console.log(`💸 Total Estornado: R$ ${consolidado.valorEstornado}`);
  console.log(`🏦 Taxas Mercado Pago: R$ ${consolidado.taxasMercadoPago}`);
  console.log(`📈 Lucro Líquido Real: R$ ${consolidado.lucroLiquido}`);
}
```

## 📋 Detalhamento do Relatório

O objeto de retorno contém um array `historico` com cada transação individual detalhada:

| Campo | Descrição |
|---|---|
| `valorSolicitado` | O valor que foi gerado no QR Code/Boleto. |
| `valorPago` | O valor que efetivamente entrou na conta. |
| `valorEstornado` | O quanto foi devolvido ao cliente naquela transação. |
| `taxas` | O somatório de taxas cobradas pelo Mercado Pago. |
| `lucroLiquido` | O valor final que ficou disponível (`pago` - `taxas` - `estornado`). |

## 🛡️ Auditoria de Segurança
Você pode usar este relatório para bloquear automaticamente usuários que tenham um alto índice de estornos ou que tentam pagar valores diferentes do solicitado com frequência.
