import axios from 'axios';


const createPreference = async (items) => {
  try {
    const response = await axios.post('http://localhost:3001/create_preference', {
      items: items.map((item) => ({
        title: item.title,
        unit_price: Number(item.price), // Convertir a número
        quantity: Number(item.quantity), // Convertir a número
      })),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};

export default createPreference