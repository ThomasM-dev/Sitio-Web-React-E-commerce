export const createPreference = async (items) => {  
  try {
    const response = await fetch('http://localhost:3000/api/mercadopago/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creando la preferencia:', errorData.error || 'Unknown error');
      throw new Error(errorData.error || 'Unknown error');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al procesar la preferencia:', error.message);
    throw error;
  }
};