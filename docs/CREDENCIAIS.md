# 🔑 Como obter suas Credenciais

Para utilizar o **vincent-mp-pix**, você precisa de um **Access Token** oficial do Mercado Pago. Siga os passos abaixo:

## 1. Criar uma Aplicação
1. Acesse o [Painel do Desenvolvedor do Mercado Pago](https://www.mercadopago.com.br/developers/panel/app).
2. Clique em **"Criar aplicação"**.
3. Dê um nome para sua aplicação (ex: `Vincent AI Bot`) e selecione o tipo de solução (Pagamentos Online).
4. Responda às perguntas de conformidade e clique em **"Criar"**.

## 2. Obter o Access Token
1. Dentro da sua aplicação, no menu lateral esquerdo, clique em **"Credenciais"**.
2. Você verá dois tipos:
   - **Credenciais de Teste**: Use para validar sua integração sem gastar dinheiro real.
   - **Credenciais de Produção**: Use para receber pagamentos reais de clientes.
3. Copie o campo **"Access Token"** (ele geralmente começa com `APP_USR-...`).

## 3. Configurar no Projeto
1. Clone o arquivo `.env.example` para um novo arquivo chamado `.env`.
2. Cole o seu token no campo correspondente:
   
```env
MP_ACCESS_TOKEN=APP_USR-seu-token-aqui
```

> [!IMPORTANT]
> **Nunca compartilhe seu Access Token!** Ele dá acesso total à movimentação financeira da sua conta Mercado Pago. Certifique-se de que seu arquivo `.env` está listado no `.gitignore`.
