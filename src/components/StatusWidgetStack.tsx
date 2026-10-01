import { ReactNode } from 'react';

interface StatusWidgetStackProps {
  notch: ReactNode;
  widget: ReactNode;
}

export default function StatusWidgetStack({ notch, widget }: StatusWidgetStackProps) {
  return (
    <div className="relative h-full flex flex-col">
      <div className="relative" style={{ height: '76px', overflow: 'visible', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px' }}>
          {notch}
        </div>
      </div>
      <div className="flex-1 relative z-10">
        {widget}
      </div>
    </div>
  );
}
