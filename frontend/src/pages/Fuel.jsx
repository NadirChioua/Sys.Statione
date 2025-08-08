import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Fuel() {
  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    api.get('/fuel').then((res) => setFuels(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fuel Stock</h1>
      <div className="space-y-2">
        {fuels.map((fuel) => (
          <div key={fuel._id} className="bg-white p-4 shadow rounded flex justify-between">
            <span>{fuel.type}</span>
            <span>{fuel.stock} L</span>
          </div>
        ))}
      </div>
    </div>
  );
}
