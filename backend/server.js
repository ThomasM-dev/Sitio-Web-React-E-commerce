require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura el SDK de Mercado Pago con tu access token
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para crear un pago
app.post('/create-payment', async (req, res) => {
  try {
    const { title, price, unit, quantity } = req.body;

    // Crear el objeto de preferencia
    let preference = {
      items: [
        {
          title,
          unit_price: parseFloat(price),
          currency_id: 'ARS', // Cambia según tu moneda
          quantity: parseInt(quantity),
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/success',
        failure: 'http://localhost:3000/failure',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
    };

    // Crear la preferencia en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    // Devolver la URL de pago al frontend
    res.status(200).json({ paymentUrl: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});