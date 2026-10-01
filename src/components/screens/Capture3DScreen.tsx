import { Box, Upload, FileText } from 'lucide-react';

export function Capture3DScreen() {
  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-slate-900">Captura 3D</h1>
        <p className="text-sm text-slate-600 mt-1">Escaneo, visualización y exportación de modelos 3D.</p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm flex-1 min-h-0 flex flex-col items-center justify-center" data-workspace="capture3d">
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
          <Box size={28} className="text-purple-600" />
        </div>

        <h2 className="text-xl font-bold mb-2">Área de Captura 3D</h2>
        <p className="text-sm text-slate-600 text-center max-w-md mb-6">
          Arrastra archivos STL/OBJ o selecciona desde tu equipo para comenzar a trabajar con modelos 3D.
        </p>

        <div className="w-full max-w-md border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors">
          <Upload size={24} className="text-purple-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-slate-500 mb-4">STL, OBJ, PLY — Máx. 100MB</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
            Seleccionar archivo
          </button>
        </div>

        <div className="w-full max-w-md mt-6">
          <p className="text-xs font-semibold text-slate-700 mb-2">Archivos recientes</p>
          <div className="space-y-1">
            {[
              { name: 'modelo_superior.stl', date: 'Hoy', size: '2.4 MB' },
              { name: 'aligner_set_03.obj', date: 'Ayer', size: '5.1 MB' }
            ].map((file, i) => (
              <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg">
                <FileText size={12} className="text-purple-600" />
                <span className="text-xs flex-1">{file.name}</span>
                <span className="text-xs text-slate-500">{file.date}</span>
                <span className="text-xs text-slate-500">{file.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
