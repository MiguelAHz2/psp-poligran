import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminUsersPage() {  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Función para cargar los usuarios desde localStorage
  const loadUsers = () => {
    const usersArray = [];
    // Recorrer el localStorage y cargar los usuarios
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'loggedInEmail') continue; 
      const user = localStorage.getItem(key);
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.name && parsedUser.email) {
          usersArray.push({ email: key, ...parsedUser });
        }
      } catch (error) {
        console.error(`Error en el dato para ${key}:`, error);
      }
    }
    setUsers(usersArray);
  };
  

  useEffect(() => {
    loadUsers();
  }, []);

  // Función para eliminar un usuario
  const deleteUser = (email) => {
    if (window.confirm('Estás seguro que deseas eliminar este usuario?')) {
      localStorage.removeItem(email);
      loadUsers(); // Recargar la lista de usuarios
    }
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-semibold text-center text-blue-600">Manejo de perfiles</h2>
      {users.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Nombre</th>
              <th className="px-4 py-2 border border-gray-300">Correo</th>
              <th className="px-4 py-2 border border-gray-300">Fecha de nacimiento</th>
              <th className="px-4 py-2 border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.dob}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => deleteUser(user.email)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Sin usuarios registrados.</p>
      )}

    <button
            onClick={() => navigate('/home')}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
          >
            Volver
          </button>
    </div>
  );
}

export default AdminUsersPage;
