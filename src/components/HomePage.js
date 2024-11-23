import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserModal from './UserModal';

function HomePage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    // Aquí se agrega la lógica para cerrar sesión (limpiar sesión, tokens, etc.)
    navigate('/');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addUser = (user) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-500 mb-6">Página Principal</h1>
        
        {/* Botón para agregar usuario */}
        <button
          onClick={openModal}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mb-6"
        >
          Agregar Usuario
        </button>

        {/* Tabla de usuarios */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700">Editar</button>
                  <button className="ml-4 text-red-500 hover:text-red-700">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <UserModal isOpen={isModalOpen} closeModal={closeModal} addUser={addUser} />
        
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
