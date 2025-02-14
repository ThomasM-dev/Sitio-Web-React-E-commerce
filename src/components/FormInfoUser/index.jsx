import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../Authetications/authSlice";
import "./FormInfoUser.css";
import { useSaveUserDataMutation } from "../../GlobalState/userApi";

const FormInfoUser = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [saveUserData, { isLoading, isSuccess, isError, error }] = useSaveUserDataMutation();
  const [formErrors, setFormErrors] = useState({});
  
  const validateForm = () => {
    let errors = {};

    if (!nombre) {
      errors.nombre = "Nombre es requerido";
    }
    if (!apellido) {
      errors.apellido = "Apellido es requerido";
    }
    if (!telefono) {
      errors.telefono = "Teléfono es requerido";
    } else if (!/^\d{10}$/.test(telefono)) {
      errors.telefono = "Teléfono inválido (10 dígitos numéricos)";
    }
    if (!ciudad) {
      errors.ciudad = "Ciudad es requerida";
    }
    if (!provincia) {
      errors.provincia = "Provincia es requerida";
    }
    if (!codigoPostal) {
      errors.codigoPostal = "Código postal es requerido";
    } else if (!/^\d{4}$/.test(codigoPostal)) {
      errors.codigoPostal = "Código postal inválido (5 dígitos numéricos)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!currentUser?.uid) {
      alert("Debes iniciar sesión para completar este formulario.");
      return;
    }

    const userData = {
      nombre,
      apellido,
      telefono,
      ciudad,
      provincia,
      codigoPostal,
      uid: currentUser.uid,
      email: currentUser.email,
    };

    try {
      await saveUserData(userData).unwrap();
      console.log("Datos guardados correctamente en Realtime Database");
      localStorage.setItem(`DateUser${currentUser.uid}`, JSON.stringify(userData));
      navigate("/Mi-Perfil");
    } catch (err) {
      console.error("Error al guardar los datos en Realtime Database:", err);
      if (err.status === 400) {
        alert("Error al guardar los datos: " + err.data.message);
      } else {
        alert("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
      }
    }

    setNombre("");
    setApellido("");
    setTelefono("");
    setCiudad("");
    setProvincia("");
    setCodigoPostal("");
    setFormErrors({});
  };


  return (
    <div className="container">
      <h2 className="title">Formulario de Usuario</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
            className="input"
          />
          {formErrors.nombre && <p className="error">{formErrors.nombre}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            required
            className="input"
          />
          {formErrors.apellido && <p className="error">{formErrors.apellido}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Número de Teléfono"
            required
            className="input"
          />
          {formErrors.telefono && <p className="error">{formErrors.telefono}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ciudad"
            required
            className="input"
          />
          {formErrors.ciudad && <p className="error">{formErrors.ciudad}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="provincia">Provincia:</label>
          <input
            type="text"
            id="provincia"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            placeholder="Provincia"
            required
            className="input"
          />
          {formErrors.provincia && <p className="error">{formErrors.provincia}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="codigoPostal">Código Postal:</label>
          <input
            type="text"
            id="codigoPostal"
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
            placeholder="Código Postal"
            required
            className="input"
          />
          {formErrors.codigoPostal && <p className="error">{formErrors.codigoPostal}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="button">
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
        {isSuccess && <p className="success-message">Datos guardados correctamente!</p>}
        {isError && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default FormInfoUser;