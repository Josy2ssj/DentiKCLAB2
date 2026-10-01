import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FlaskConical, MoreHorizontal } from 'lucide-react';

const data = [
  { name: 'Alineadores', value: 45, color: '#2878FF' },
  { name: 'Retenedores', value: 32, color: '#60A5FA' },
  { name: 'Modelos', value: 28, color: '#06B6D4' },
  { name: 'Guías quirúrgicas', value: 22, color: '#8B5CF6' },
  { name: 'Guardas', value: 18, color: '#F59E0B' },
  { name: 'Otros', value: 15, color: '#EF4444' },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function WorkTypes() {
  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        borderRadius: '22px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(17, 26, 53, 0.05), 0 2px 8px rgba(17, 26, 53, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        padding: 'clamp(12px, 2vh, 20px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(219, 234, 254, 0.6)' }}
          >
            <FlaskConical size={14} style={{ color: '#2878FF' }} />
          </div>
          <h3 className="text-[13.5px] font-bold" style={{ color: '#111A35' }}>
            Tipos de trabajos
          </h3>
        </div>
        <button
          className="flex items-center justify-center w-6 h-6 rounded-md transition-all duration-150 hover:bg-gray-100"
          aria-label="Más opciones"
        >
          <MoreHorizontal size={14} style={{ color: '#7B8BA5' }} />
        </button>
      </div>

      {/* Chart + Legend */}
      <div className="flex-1 flex items-center gap-3">
        {/* Donut Chart */}
        <div className="relative" style={{ width: '160px', height: '160px', flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="82%"
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-bold leading-none" style={{ color: '#111A35' }}>
              {total}
            </span>
            <span className="text-[10px] font-medium mt-0.5" style={{ color: '#7B8BA5' }}>
              Órdenes
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 flex-1">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-[11px] flex-1 truncate" style={{ color: '#3D4F6F' }}>
                {item.name}
              </span>
              <span className="text-[11px] font-semibold" style={{ color: '#111A35' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
