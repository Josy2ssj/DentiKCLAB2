export default function PatientList() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm h-full">
      <h2 className="font-bold text-lg mb-4">Pacientes</h2>
      <div className="space-y-2">
        {['María González', 'Juan Pérez', 'Ana López', 'Carlos Ruiz'].map((name, i) => (
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              {name[0]}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{name}</p>
              <p className="text-xs text-slate-500">3 órdenes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
