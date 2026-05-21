const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

/**
 * Cria uma cobrança via Pix no Mercado Pago.
 * @route POST /api/pix/create
 * @body { transaction_amount, description, email }
 */
exports.createPixPayment = async (req, res) => {
  const { transaction_amount, description, email } = req.body;

  const paymentData = {
    transaction_amount,
    description,
    payment_method_id: "pix",
    payer: { email }
  };

  try {
    const response = await mercadopago.payment.create(paymentData);
    const { id, status, point_of_interaction } = response.body;

    res.status(201).json({
      paymentId: id,
      status,
      qrCode: point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: point_of_interaction.transaction_data.qr_code_base64
    });
  } catch (error) {
    console.error("Vincent MP Pix Error: " + error.message);
    res.status(500).json({ error: "Erro ao gerar cobrança Pix." });
  }
};
