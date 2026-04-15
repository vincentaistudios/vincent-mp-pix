# 📄 Integração Boleto Bancário

O Boleto ainda é uma forma de pagamento muito utilizada para quem não tem pressa ou prefere pagar em lotéricas.

## 🚀 Exemplo de Uso

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP('SEU_ACCESS_TOKEN');

const res = await mp.criarPagamentoBoleto({
  valor: 50.00,
  descricao: 'Assinatura Premium',
  nome: 'João',
  sobrenome: 'Silva',
  email: 'joao@email.com',
  cpf: '12345678901',
  expiraEm: 1440 // 24 horas em minutos
});

if (res.ok) {
  console.log('ID do Pagamento:', res.id);
  console.log('Link do Boleto (PDF):', res.boleto.url);
  console.log('Código de Barras:', res.boleto.codigoBarras);
} else {
  console.error('Erro:', res.erro);
}
```

## 📋 Requisitos para Boleto

Diferente do Pix, o Mercado Pago exige dados mínimos do pagador:
- `nome`: Primeiro nome.
- `sobrenome`: Sobrenome.
- `email`: Endereço de e-mail válido.
- `cpf`: Número do CPF (apenas números).

## 📋 Retorno Esperado

- `ok`: Boolean.
- `id`: ID único.
- `boleto`:
  - `url`: Link externo para visualizar/baixar o boleto.
  - `codigoBarras`: A linha digitável/conteúdo do código de barras.
- `detalhes`: Objeto bruto.
