import express from "express"
import cors from "cors"
import { createPreference } from "./mercado-pago-payment/mercado-pago-payment.js"

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3000, () => {
  console.log("Puerto levantado en 5176")
})

app.post("/api/mercadopago/create_preference", async (req, res) => {
  if (!req.body.items || !Array.isArray(req.body.items)) {
    return res.status(400).json({ error: 'Se esperaba un array de ítems en el cuerpo de la solicitud' });
  }

  try {
    console.log("Solicitando creación de preferencia...");
    const response = await createPreference(req.body.items);
    console.log("Respuesta de MercadoPago:", response);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: 'No se recibió una respuesta válida de MercadoPago' });
    }
  } catch (error) {
    console.error("Error al procesar la preferencia:", error); 
    res.status(500).json({ error: error.message });
  }
});