import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, loadUserFromStorage } from "../../Authetications/authSlice";
import "./Profile.css";
import NavBar from "../../components/NavBar";
import { useFetchUserDataQuery } from "../../GlobalState/userApi";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser); 
  const { data: userData, isLoading, isError, error } = useFetchUserDataQuery(currentUser.uid); 
    
  useEffect(() => {
    if (!currentUser.uid) {
      dispatch(loadUserFromStorage());
    }
  }, [dispatch, currentUser.uid]);

  const handleLogout = () => {
    alert("Sesión cerrada correctamente");
  };

  if (isLoading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (isError) {
    return <div className="error-message">{error.message}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h2 className="profile-title">Perfil de Usuario</h2>
        <div className="profile-info">
          <p className="profile-text">
            <strong>Nombre:</strong> {userData?.nombre || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Apellido:</strong> {userData?.apellido || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Email:</strong> {currentUser?.email || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Teléfono:</strong> {userData?.telefono || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Ciudad:</strong> {userData?.ciudad || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Provincia:</strong> {userData?.provincia || "No disponible"}
          </p>
          <p className="profile-text">
            <strong>Código Postal:</strong> {userData?.codigoPostal || "No disponible"}
          </p>
        </div>
        <div className="purchases-section">
          <h3 className="purchases-title">Mis Compras</h3>
          {userData?.purchases?.length > 0 ? (
            <ul className="purchases-list">
              {userData.purchases.map((purchase) => (
                <li key={purchase.id} className="purchase-item">
                  <span className="purchase-product">{purchase.product}</span>
                  <span className="purchase-date">{purchase.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-purchases">No has realizado compras recientemente.</p>
          )}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </>
  );
};

export default Profile;
