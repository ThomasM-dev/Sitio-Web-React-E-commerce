import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../data/.firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Acción asíncrona para registrar al usuario
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));  // Actualiza el estado de Redux
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para iniciar sesión
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));  // Actualiza el estado de Redux
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para cerrar sesión
export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await signOut(auth);
  localStorage.removeItem("user");
  dispatch(clearUser()); // Limpia los datos en Redux
  return null;
});

// Acción para cargar los datos del usuario desde el localStorage
export const loadUserFromStorage = () => (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    dispatch(setUser(userData)); // Actualiza el estado de Redux con los datos desde localStorage
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: "",
    uid: "",
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    clearUser: (state) => {
      state.email = "";
      state.uid = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Registro de usuario
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Inicio de sesión
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Cierre de sesión
      .addCase(logoutUser.fulfilled, (state) => {
        state.email = "";
        state.uid = "";
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state) => state.auth;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
