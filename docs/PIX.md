# ⚡ Integração Pix

O Pix é o método de pagamento instantâneo do Brasil. Com o `vincent-mp-pix`, você gera o QR Code e o código "Copia e Cola" em segundos.

## 🚀 Exemplo de Uso

```javascript
import { VincentMP } from 'vincent-mp-pix';

const mp = new VincentMP('SEU_ACCESS_TOKEN');

const res = await mp.criarPagamentoPix({
  valor: 10.50,
  descricao: 'Pedido #123 - Loja Exemplo',
  email: 'cliente@email.com',
  expiraEm: 30 // minutos
});

if (res.ok) {
  console.log('ID do Pagamento:', res.id);
  console.log('Copia e Cola:', res.pix.copiaCola);
  console.log('QR Code Base64:', res.pix.qrCodeBase64);
} else {
  console.error('Erro:', res.erro);
}
```

## 📋 Retorno Esperado

A resposta contém um objeto simplificado:

- `ok`: Boolean indicando sucesso.
- `id`: O ID único do pagamento no Mercado Pago.
- `status`: Status inicial (geralmente `pending`).
- `pix`:
  - `copiaCola`: String para o usuário colar no app do banco.
  - `qrCodeBase64`: String Base64 para exibir a imagem do QR Code.
- `detalhes`: O objeto original bruto da API do Mercado Pago.
