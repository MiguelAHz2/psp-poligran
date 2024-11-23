import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword || !dob) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un correo válido');
      return false;
    }
    if (password !== confirmPassword) {
      setError('La contraseña no coincide');
      return false;
    }
    if (new Date(dob) >= new Date()) {
      setError('La fecha de nacimiento no puede ser en el futuro!');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // Verificar si el usuario ya está registrado
      const existingUser = localStorage.getItem(email);
      if (existingUser) {
        setError('Este correo ya está registrado!');
        setLoading(false);
        return;
      }

      // Guardar los datos en localStorage
      const user = { name, email, password, dob }; 
      localStorage.setItem(email, JSON.stringify(user));

      setTimeout(() => {
        navigate('/home'); 
      }, 2000); 
    } catch (err) {
      setError('Registro fallido. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="p-8 max-w-sm w-full bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-semibold text-center text-blue-600">Regístrate</h1>
        
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md text-center">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Campo de Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de Contraseña */}
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
            />
          </div>

          {/* Campo de Confirmación de Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>

          {/* Campo de Fecha de Nacimiento */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          >
            {loading ? 'Registrándose...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Ya tienes una cuenta?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
