interface OrderStatusNotchProps {
  type: 'pending' | 'weekly-delivered';
  compact?: boolean;
}

export default function OrderStatusNotch({ type, compact = false }: OrderStatusNotchProps) {
  const isPending = type === 'pending';
  
  return (
    <div
      className={`rounded-t-2xl p-4 shadow-lg ${
        isPending
          ? 'bg-gradient-to-br from-yellow-300 to-orange-400'
          : 'bg-gradient-to-br from-emerald-300 to-teal-500'
      }`}
      style={{ height: '100px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-lg flex items-center justify-center">
            <span className="text-lg">
              {isPending ? '⏳' : '✓'}
            </span>
          </div>
          <span className={`font-bold ${isPending ? 'text-orange-900' : 'text-emerald-900'}`}>
            {isPending ? 'Pendientes' : 'Entregadas esta semana'}
          </span>
          <span className={`text-2xl font-extrabold ${isPending ? 'text-orange-900' : 'text-emerald-900'}`}>
            {isPending ? '0' : '0'}
          </span>
        </div>
      </div>
    </div>
  );
}
