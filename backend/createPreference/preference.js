import {MercadoPagoConfig} from "mercadopago"
import dotenv from "dotenv"
dotenv.config()
export const client = new MercadoPagoConfig({accessToken: "APP_USR-b0c1c712-43ed-4117-bd2f-364227ba75b6", options:{timeout: 5000}})

