# 🧾 Consultas Avançadas e Extrato

A biblioteca permite que você realize buscas no histórico de pagamentos da sua conta, funcionando como um extrato automatizado.

## 🚀 Como buscar pagamentos

O método `buscarPagamentos(filtros)` aceita diversos parâmetros de filtragem.

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP();

// Exemplo 1: Buscar pagamentos dos últimos 7 dias que foram APROVADOS
const filtro = {
  status: 'approved',
  range: 'date_created',
  begin_date: 'NOW-7DAYS',
  end_date: 'NOW'
};

const res = await mp.buscarPagamentos(filtro);

if (res.ok) {
  console.log(`Total encontrado: ${res.total}`);
  res.resultados.forEach(pag => {
    console.log(`- ID: ${pag.id} | Valor: ${pag.transaction_amount} | Data: ${pag.date_created}`);
  });
}
```

## 📋 Filtros Comuns

- `status`: `pending`, `approved`, `authorized`, `in_process`, `in_mediation`, `rejected`, `cancelled`, `refunded`, `charged_back`.
- `external_reference`: Busca pelo seu ID interno que você enviou ao criar o pagamento.
- `payer.email`: Filtra pagamentos de um cliente específico.
- `sort`: Ordenação (ex: `date_created`).
- `criteria`: Direção (ex: `desc`).

## 🛡️ Auditoria de Valores

Ao receber um pagamento, você pode verificar se o valor pago bate exatamente com o valor esperado:

```javascript
const info = await mp.consultarPagamento('ID_AQUI');

if (info.valorPago < info.valor) {
  console.warn('⚠️ Alerta: Cliente pagou a menos! Iniciando estorno...');
  await mp.estornarPagamento(info.id);
}
```
