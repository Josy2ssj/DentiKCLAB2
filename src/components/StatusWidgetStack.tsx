import { ReactNode } from 'react';

interface StatusWidgetStackProps {
  notch: ReactNode;
  widget: ReactNode;
}

export default function StatusWidgetStack({ notch, widget }: StatusWidgetStackProps) {
  return (
    <div className="relative h-full flex flex-col">
      {/* Notch wrapper - layout footprint 76px, visual 100px */}
      <div 
        className="relative shrink-0" 
        style={{ 
          height: '76px', 
          overflow: 'visible',
          zIndex: 0 
        }}
      >
        {/* Notch absolutely positioned with visual height 100px */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '100px' 
          }}
        >
          {notch}
        </div>
      </div>

      {/* White widget - overlaps with notch extension */}
      <div 
        className="flex-1 relative min-h-0"
        style={{ 
          zIndex: 1,
          marginTop: '-24px' // Overlap with notch extension
        }}
      >
        {widget}
      </div>
    </div>
  );
}
