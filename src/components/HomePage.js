import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserModal from './UserModal';

function HomePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
      const user = JSON.parse(localStorage.getItem(loggedInEmail));
      setProfile(user);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
      const savedUsers = JSON.parse(localStorage.getItem(`${loggedInEmail}_users`)) || [];
      setUsers(savedUsers);
    }
  }, []);

  // Manejar cambio de foto de perfil
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...profile, avatar: reader.result };
        setProfile(updatedProfile);
        localStorage.setItem(profile.email, JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file); 
    }
  };

  // Guardar usuarios en localStorage asociados al correo
  const addUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    setUsers([...users, newUser]);

    // Guardar usuarios en localStorage asociados al correo
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const savedUsers = JSON.parse(localStorage.getItem(`${loggedInEmail}_users`)) || [];
    savedUsers.push(newUser);
    localStorage.setItem(`${loggedInEmail}_users`, JSON.stringify(savedUsers));
  };

  const editUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);

    // Actualizar usuarios en localStorage asociados al correo
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    localStorage.setItem(`${loggedInEmail}_users`, JSON.stringify(updatedUsers));
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    // Eliminar usuario de localStorage asociados al correo
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    localStorage.setItem(`${loggedInEmail}_users`, JSON.stringify(updatedUsers));

    setIsDeleteModalOpen(false);
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleProfileEdit = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem(updatedProfile.email, JSON.stringify(updatedProfile));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmail');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-blue-500 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">Gestor de usuarios</h1>

        {/* Mostrar perfil de usuario */}
        {profile && (
          <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md mb-8">
            {/* Foto de perfil con hover */}
            <div className="relative flex-shrink-0">
              <label htmlFor="file-input" className="cursor-pointer">
                <img
                  src={profile.avatar || 'https://via.placeholder.com/150'}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover transition-all duration-200 ease-in-out"
                />
                {/* Overlay para indicar que se puede cambiar la foto */}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 rounded-full flex justify-center items-center transition-opacity duration-300">
                  <span className="text-white text-xs text-center font-semibold">Cambiar foto</span>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleProfileImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Información del perfil */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-700">{profile.name}</h2>
              <p className="text-lg text-gray-600">{profile.email}</p>
              <p className="text-lg text-gray-600 capitalize">{profile.role}</p>
            </div>
          </div>
        )}
        

        {/* Botón para agregar nuevo usuario */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
          >
            Registrar un nuevo usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        <table className="min-w-full table-auto border-collapse mb-8 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Rol</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === 'activo'
                        ? 'bg-green-200 text-green-800'
                        : user.status === 'inactivo'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === 'edit') {
                        openModal(user);
                      } else if (action === 'delete') {
                        openDeleteModal(user);
                      }
                      e.target.value = '';
                    }}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Opciones
                    </option>
                    <option value="edit">Editar</option>
                    <option value="delete">Eliminar</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <UserModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          addUser={addUser}
          editUser={editUser}
          selectedUser={selectedUser}
          handleProfileEdit={handleProfileEdit}
        />

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold text-center text-red-500">Confirmar Eliminación</h3>
              <p className="my-4 text-center">¿Estás seguro de que deseas eliminar a este usuario?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => deleteUser(userToDelete.id)}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/admin-users')}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200"
          >
            Administrador de perfiles
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-200"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

export default HomePage;

