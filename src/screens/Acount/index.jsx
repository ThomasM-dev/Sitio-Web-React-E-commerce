import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "../../components/NavBar";
import {
    loginUser,
    registerUser,
    selectUser,
    selectLoading,
    selectError,
    loadUserFromStorage
} from "../../Authetications/authSlice";
import "./Acount.css";

const Acount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(loadUserFromStorage());
        if (user && user.uid) {
            navigate("/Mi-Perfil");
        }
    }, [dispatch, navigate, user]);

    const toggleRegister = () => setIsRegister((prev) => !prev);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData, isRegister); // Implementa esta función
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const authAction = isRegister ? registerUser : loginUser;
            try {
                await dispatch(authAction(formData)).unwrap();
                setFormData({ email: "", password: "", confirmPassword: "" });
                setFormErrors({});
                navigate(isRegister ? "/Informacion-Personal" : "/Mi-Perfil");
            } catch (error) {
                console.error("Error en la autenticación:", error);
                const errorMessage = getErrorMessage(error);
                setFormErrors({ general: errorMessage });
            }
        }
    };

    const getErrorMessage = (error) => {
        if (error && error.code) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    return "Este correo ya está registrado";
                case "auth/invalid-email":
                    return "Correo electrónico no válido";
                case "auth/wrong-password":
                    return "Contraseña incorrecta";
                case "auth/user-not-found":
                    return "Usuario no encontrado";
                default:
                    return "Ocurrió un error. Inténtalo de nuevo.";
            }
        } else if (typeof error === 'string') {
            return error;
        }
        return "Ocurrió un error. Inténtalo de nuevo.";
    };

    const validateForm = (formData, isRegister) => {
        const errors = {};

        if (!formData.email) {
            errors.email = "El correo electrónico es requerido";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = "Correo electrónico no válido";
        }

        if (!formData.password) {
            errors.password = "La contraseña es requerida";
        } else if (formData.password.length < 6) {
            errors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (isRegister && !formData.confirmPassword) {
            errors.confirmPassword = "La confirmación de contraseña es requerida";
        } else if (isRegister && formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden";
        }

        return errors;
    };

    return (
        <>
            <NavBar colorNav="#ffa1c4" />
            <div className="Acount">
                <div className="form-container">
                    <h2>{isRegister ? "Registrarse" : "Iniciar Sesión"}</h2>
                    <form onSubmit={handleSubmit}>
                        {formErrors.general && (
                            <div className="error">{formErrors.general}</div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete="email"
                                autoFocus
                            />
                            {formErrors.email && (
                                <div className="error">{formErrors.email}</div>
                            )}
                        </div>
                        <div className="form-group password-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="current-password"
                                />
                                <span
                                    className="password-toggle-icon"
                                    onClick={toggleShowPassword}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {formErrors.password && (
                                <div className="error">{formErrors.password}</div>
                            )}
                        </div>
                        {isRegister && (
                            <div className="form-group password-group">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <div className="password-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <span
                                        className="password-toggle-icon"
                                        onClick={toggleShowConfirmPassword}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {formErrors.confirmPassword && (
                                    <div className="error">{formErrors.confirmPassword}</div>
                                )}
                            </div>
                        )}
                        <button className="btn-acount" disabled={loading}>
                            {loading ? "Cargando..." : isRegister ? "Registrarse" : "Acceder"}
                        </button>
                    </form>
                    <button className="toggle-button" onClick={toggleRegister}>
                        {isRegister
                            ? "¿Estás registrado? Iniciar sesión"
                            : "¿No tienes cuenta? Registrarse"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Acount;
