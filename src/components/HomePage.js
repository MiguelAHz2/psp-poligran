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
  const [selectedUser, setSelectedUser] = useState(null); // Para editar usuario
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleLogout = () => {
    // Lógica de cierre de sesión
    navigate('/');
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); // Resetear usuario seleccionado
  };

  const addUser = (user) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  const editUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Usuarios</h1>

        {/* Botón para agregar usuario */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition-all duration-200"
          >
            Agregar Usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        <table className="min-w-full table-auto border-collapse mb-6">
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
                  <button
                    onClick={() => openModal(user)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para agregar/editar usuario */}
        <UserModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          addUser={addUser}
          editUser={editUser}
          selectedUser={selectedUser} // Se pasa el usuario seleccionado para editar
        />

        {/* Modal de confirmación de eliminación */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold text-center text-red-500">Confirmar Eliminación</h3>
              <p className="my-4 text-center">¿Estás seguro de que deseas eliminar a este usuario?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => deleteUser(userToDelete.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Eliminar
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
