const express = require("express");
const router = express.Router();
const { createPixPayment } = require("../src/pixController");

/**
 * @route POST /api/pix/create
 * @desc  Gera uma cobrança Pix via Mercado Pago e retorna o QR Code
 */
router.post("/create", createPixPayment);

module.exports = router;
