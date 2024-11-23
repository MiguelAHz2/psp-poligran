import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setError('Ambos campos son requeridos');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    setLoading(true); // Mostrar el loader
    setError(''); // Limpiar errores previos
  
    try {
      // Verificar si el email existe en localStorage
      const storedUser = localStorage.getItem(email);
      if (!storedUser) {
        setError('No hay cuenta registrada con este correo');
        setLoading(false); // Desactivar loader si hay error
        return;
      }
  
      // Comparar las contraseñas
      const user = JSON.parse(storedUser);
      if (user.password !== password) {
        setError('Contraseña incorrecta');
        setLoading(false); 
        return;
      }
  
      // Simula un proceso de autenticación exitoso
      setTimeout(() => {
        // Almacenar el email del usuario logueado en el localStorage
        localStorage.setItem('loggedInEmail', email);
  
        // Redirigir a la página principal (Home)
        navigate('/home');
      }, 2000); // Simulando un retraso de 2 segundos
    } catch (err) {
      setError('Ingreso fallido. Por favor intenta nuevamente.');
      setLoading(false); // Desactivar loader si ocurre un error
    }
  };
  ;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="p-8 max-w-sm w-full bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-blue-600">Iniciar sesión</h1>
        
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md text-center">
            <p>{error}</p>
          </div>
        )}

              {/* Mostrar el loader si el estado de carga es verdadero */}
      {loading && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
  <div className="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-blue-900"></div>
          </div>
      )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Ingresa tu correo"
              required
              aria-describedby="email-error"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Ingresa tu contraseña"
              required
              aria-describedby="password-error"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-500">
          No tienes una cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Registrate aquí!
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
