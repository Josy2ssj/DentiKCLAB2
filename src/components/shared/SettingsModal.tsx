import { useState } from 'react';

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Ajustes</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Posición de navegación</label>
            <select className="w-full p-2 border rounded-lg">
              <option>Izquierda</option>
              <option>Derecha</option>
              <option>Arriba</option>
              <option>Abajo</option>
            </select>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
