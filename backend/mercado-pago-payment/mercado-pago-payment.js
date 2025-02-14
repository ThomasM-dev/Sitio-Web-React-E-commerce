import { Preference } from "mercadopago";
import { client } from "../createPreference/preference.js";

const preference = new Preference(client)

export const createPreference = async (request, res) => {
    try { 
        const response = await preference.create({
          body: {
              items: [
                {
                  title: preba,
                  quantity: 1,
                  unit_price: 50,
                  currency_id: "ARS",
                }
              ],
              back_urls: {
                success: "https://www.youtube.com/watch?v=kRlxTJSPKK8&list=RDkRlxTJSPKK8&start_radio=1",
                failure: "https://www.youtube.com/results?search_query=error",
                pending: "https://www.youtube.com/results?search_query=pending"
              },
              auto_return: "approved"
            }
          })
          
          return response          
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}