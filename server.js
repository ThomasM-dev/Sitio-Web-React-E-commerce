const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken('YOUR_ACCESS_TOKEN');

// Crear la preferencia de pago
const preference = {
  items: [
    {
      title: 'Producto de ejemplo',
      quantity: 1,
      currency_id: 'ARS',
      unit_price: 100,
    },
  ],
  back_urls: {
    success: 'https://tusitio.com/pago-exitoso', // URL a donde se redirige después de un pago exitoso
    failure: 'https://tusitio.com/pago-fallido', // URL a donde se redirige si el pago falla
    pending: 'https://tusitio.com/pago-pendiente', // URL a donde se redirige si el pago está pendiente
  },
  auto_return: 'approved', // Redirige automáticamente si el pago es aprobado
};

mercadopago.preferences.create(preference)
  .then(response => {
    // Responder con el ID de la preferencia
    console.log(response.body.id);
  })
  .catch(error => console.log(error));