import { useState, useEffect } from 'react';

export function LayoutDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [measurements, setMeasurements] = useState<any>({});

  useEffect(() => {
    if (!isVisible) return;

    const measure = () => {
      const newMeasurements: any = {};

      const schedulePanel = document.querySelector('[data-workspace="schedule-panel"]');
      if (schedulePanel) {
        const rect = schedulePanel.getBoundingClientRect();
        newMeasurements.schedulePanel = { top: rect.top, height: rect.height };
      }

      const patientList = document.querySelector('[data-workspace="patient-list"]');
      if (patientList) {
        const rect = patientList.getBoundingClientRect();
        newMeasurements.patientList = { top: rect.top, height: rect.height };
      }

      const taskList = document.querySelector('[data-workspace="task-list"]');
      if (taskList) {
        const rect = taskList.getBoundingClientRect();
        newMeasurements.taskList = { top: rect.top, height: rect.height };
      }

      const smartStack = document.querySelector('[data-workspace="smart-stack"]');
      if (smartStack) {
        const rect = smartStack.getBoundingClientRect();
        newMeasurements.smartStack = { top: rect.top, height: rect.height };
      }

      setMeasurements(newMeasurements);
    };

    measure();
    const interval = setInterval(measure, 500);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
      >
        🔍 Layout Debugger
      </button>
    );
  }

  const scheduleTop = measurements.schedulePanel?.top;
  const patientTop = measurements.patientList?.top;
  const taskTop = measurements.taskList?.top;
  const smartTop = measurements.smartStack?.top;

  const deltaPatient = scheduleTop && patientTop ? Math.abs(patientTop - scheduleTop) : null;
  const deltaTask = scheduleTop && taskTop ? Math.abs(taskTop - scheduleTop) : null;
  const deltaSmart = scheduleTop && smartTop ? Math.abs(smartTop - scheduleTop) : null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl p-4 max-w-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900">Layout Debugger</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="border-b border-gray-200 pb-2">
          <h4 className="font-semibold text-gray-700 mb-1">HORARIO (Referencia)</h4>
          {measurements.schedulePanel && (
            <div className="text-gray-600">
              Panel top: <span className="font-mono font-bold">{Math.round(measurements.schedulePanel.top)}px</span>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 pb-2">
          <h4 className="font-semibold text-gray-700 mb-1">HOME</h4>
          {measurements.patientList && (
            <div className="text-gray-600">
              PatientList top: <span className="font-mono font-bold">{Math.round(measurements.patientList.top)}px</span>
              {deltaPatient !== null && (
                <span className={`ml-2 ${deltaPatient <= 2 ? 'text-green-600' : 'text-red-600'}`}>
                  (Δ {Math.round(deltaPatient)}px {deltaPatient <= 2 ? '✓' : '✗'})
                </span>
              )}
            </div>
          )}
          {measurements.taskList && (
            <div className="text-gray-600">
              TaskList top: <span className="font-mono font-bold">{Math.round(measurements.taskList.top)}px</span>
              {deltaTask !== null && (
                <span className={`ml-2 ${deltaTask <= 2 ? 'text-green-600' : 'text-red-600'}`}>
                  (Δ {Math.round(deltaTask)}px {deltaTask <= 2 ? '✓' : '✗'})
                </span>
              )}
            </div>
          )}
          {measurements.smartStack && (
            <div className="text-gray-600">
              SmartStack top: <span className="font-mono font-bold">{Math.round(measurements.smartStack.top)}px</span>
              {deltaSmart !== null && (
                <span className={`ml-2 ${deltaSmart <= 2 ? 'text-green-600' : 'text-red-600'}`}>
                  (Δ {Math.round(deltaSmart)}px {deltaSmart <= 2 ? '✓' : '✗'})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
