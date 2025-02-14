import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[\W_]/, "Debe contener al menos un símbolo (@, $, !, %, *, ?, &...)")
    .required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio'),
});