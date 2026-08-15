// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'provinces'));
      const list = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProvinces(list);
    } catch (err) {
      console.error("Error fetching provinces:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteDoc(doc(db, 'provinces', id));
        setProvinces(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel - Provinces</h1>
        <Link 
          to="/admin/province/new" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Province
        </Link>
      </div>

      {loading ? (
        <div>Loading provinces...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {provinces.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap w-24">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="h-12 w-16 object-cover rounded" />
                    ) : (
                      <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <Link 
                      to={`/province/${p.id}`} 
                      className="text-gray-600 hover:underline"
                      target="_blank"
                    >
                      View
                    </Link>
                    <Link 
                      to={`/admin/province/edit/${p.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(p.id, p.name)} 
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}