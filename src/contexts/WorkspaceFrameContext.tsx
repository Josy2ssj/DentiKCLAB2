import { createContext, useContext, ReactNode } from 'react';

interface WorkspaceFrameContextType {
  workspaceTop: number;
  workspaceBottom: number;
  workspaceHeight: number;
  bottomSafeArea: number;
  notchOverlap: number;
}

const WorkspaceFrameContext = createContext<WorkspaceFrameContextType | undefined>(undefined);

export function WorkspaceFrameProvider({ children }: { children: ReactNode }) {
  const workspaceTop = 190;
  const bottomSafeArea = 32;
  const notchOverlap = 20;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 866;
  const workspaceBottom = viewportHeight - bottomSafeArea;
  const workspaceHeight = workspaceBottom - workspaceTop;

  return (
    <WorkspaceFrameContext.Provider value={{
      workspaceTop,
      workspaceBottom,
      workspaceHeight,
      bottomSafeArea,
      notchOverlap
    }}>
      {children}
    </WorkspaceFrameContext.Provider>
  );
}

export function useWorkspaceFrame() {
  const context = useContext(WorkspaceFrameContext);
  if (!context) {
    throw new Error('useWorkspaceFrame must be used within WorkspaceFrameProvider');
  }
  return context;
}
