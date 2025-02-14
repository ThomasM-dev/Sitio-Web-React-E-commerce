import './App.css';
import Home from './screens/Home';
import { Route, Routes } from 'react-router-dom';
import Catologist from './screens/Catologist';
import Faq from './screens/Faq';
import Cart from './screens/Cart';
import Acount from "./screens/Acount"
import Profile from './screens/Profile';
import ProductCard from "./screens/ProductCard"
import EmptyCart from "./components/EmptyCart"
import FormInfoUser from "./components/FormInfoUser"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Catalogo" element={<Catologist/>} />
        <Route path='/Preguntas-Frecuentes' element={<Faq/>}/>
        <Route path='/Carrito' element={<Cart/>}/>
        <Route path='/Mi-Cuenta' element={<Acount/>}/>
        <Route path='/Mi-Perfil' element={<Profile/>}/>
        <Route path='/Detalle-Producto' element={<ProductCard/>}/>
        <Route path='/Carrito-Vacio' element={<EmptyCart/>}/>
        <Route path='/Informacion-Personal' element={<FormInfoUser/>}/>
      </Routes>
    </>
  );
}

export default App;
