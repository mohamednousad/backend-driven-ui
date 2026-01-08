import React, { useEffect, useState } from 'react';
import { getUI } from '../services/uiService';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUI()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="mt-2 text-sm text-gray-400">Status: {user.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
