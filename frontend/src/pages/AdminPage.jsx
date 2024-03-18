import React, { useState, useEffect } from 'react';
import $api from '../http';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const {isAuth} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const response = await $api.get('/users');

        setUsers(response.data)
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
            navigate('/')
        } 
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await $api.post('/updateUserRole', { userId, newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return isAuth ? (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <select
                  className="px-2 py-1 rounded bg-gray-200"
                  defaultValue={user.role}
                  onChange={(e) => updateUserRole(user._id, e.target.value)}
                  key={`select-${user._id}`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) :
  (
    <h1>YOU ARE NOT AUTHORIZED</h1>
  )
};

export default AdminPage;
