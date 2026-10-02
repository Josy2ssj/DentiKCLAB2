import { Box, Upload, FileText, Download, Eye } from 'lucide-react';

export function Capture3DScreen() {
  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-[26px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight" style={{ color: '#10264A' }}>Captura 3D</h1>
        <p className="text-[13px] mt-1" style={{ color: '#7B8BA5' }}>Escaneo, visualización y exportación de modelos 3D.</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm flex flex-col" data-workspace="capture3d">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Box size={36} className="text-blue-600" />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-slate-900">Área de Captura 3D</h2>
            <p className="text-sm text-slate-600 text-center max-w-md mb-8">
              Arrastra archivos STL/OBJ o selecciona desde tu equipo para comenzar a trabajar con modelos 3D.
            </p>

            <div className="w-full max-w-lg border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload size={28} className="text-blue-600" />
              </div>
              <p className="text-base font-semibold text-slate-900 mb-2">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-slate-500 mb-6">STL, OBJ, PLY — Máx. 100MB</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all">
                Seleccionar archivo
              </button>
            </div>
          </div>

          {/* Recent Files */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Archivos recientes</h3>
            <div className="space-y-2">
              {[
                { name: 'modelo_superior.stl', date: 'Hoy, 10:24', size: '2.4 MB', status: 'Completado' },
                { name: 'aligner_set_03.obj', date: 'Ayer, 15:30', size: '5.1 MB', status: 'Procesando' },
                { name: 'modelo_inferior.stl', date: 'Hace 2 días', size: '3.2 MB', status: 'Completado' }
              ].map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{file.date} • {file.size}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      file.status === 'Completado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {file.status}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-all">
                        <Eye size={14} className="text-blue-600" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-all">
                        <Download size={14} className="text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total archivos</span>
                <span className="text-lg font-bold text-slate-900">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Esta semana</span>
                <span className="text-lg font-bold text-blue-600">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Espacio usado</span>
                <span className="text-lg font-bold text-slate-900">142 MB</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Acciones rápidas</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Upload size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Subir modelo</p>
                  <p className="text-xs text-slate-500">STL, OBJ, PLY</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye size={18} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Visualizar 3D</p>
                  <p className="text-xs text-slate-500">Ver modelos cargados</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-left">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Exportar</p>
                  <p className="text-xs text-slate-500">Descargar modelos</p>
                </div>
              </button>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Formatos soportados</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-slate-700">STL - Stereolithography</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-slate-700">OBJ - Wavefront</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-700">PLY - Polygon File</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
