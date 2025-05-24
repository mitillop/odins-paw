'use client';

import { useState, useEffect } from 'react';

export default function ModelStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkModels() {
      try {
        setLoading(true);
        const response = await fetch('/api/chat/models');
        const data = await response.json();
        
        if (data.success) {
          setStatus(data.config);
        } else {
          throw new Error(data.error || 'Error al verificar modelos');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    checkModels();
  }, []);

  if (loading) {
    return (
      <div className="card bg-white shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Estado de Modelos</h2>
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-white shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Estado de Modelos</h2>
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-white shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4">Estado de Modelos</h2>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {status?.models.map((model) => (
              <tr key={model.name}>
                <td>{model.name}</td>
                <td>
                  {model.available ? (
                    <span className="badge badge-success">Disponible</span>
                  ) : (
                    <span className="badge badge-error">No disponible</span>
                  )}
                </td>
                <td>
                  {model.error ? (
                    <span className="text-error text-xs">{model.error}</span>
                  ) : (
                    <span className="text-success text-xs">{model.response}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="divider"></div>
      
      <div className="bg-gray-100 p-3 rounded-lg">
        <h3 className="font-semibold mb-2">Configuración</h3>
        <p className="text-sm">API Key: {status?.apiKey}</p>
        <p className="text-sm">Base URL: {status?.baseURL}</p>
      </div>
    </div>
  );
}
