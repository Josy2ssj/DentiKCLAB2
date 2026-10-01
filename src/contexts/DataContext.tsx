import { createContext, useContext, useState, ReactNode } from 'react';

export interface Order {
  id: string;
  patient: string;
  clinic: string;
  doctor: string;
  treatment: string;
  arch: string;
  status: 'pending' | 'in_progress' | 'ready' | 'delivered';
  requestedDate: string;
  deliveryDate: string;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  lastOrder: string;
  orderCount: number;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  done: boolean;
  color: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'inventory' | 'task' | 'delivery';
}

export interface SavedNote {
  id: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
}

interface DataContextType {
  orders: Order[];
  patients: Patient[];
  tasks: Task[];
  inventory: InventoryItem[];
  notifications: Notification[];
  savedNotes: SavedNote[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  toggleTask: (id: number) => void;
  addTask: (title: string) => void;
  updateInventory: (id: string, stock: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  saveNote: (content: string) => void;
  deleteNote: (id: string) => void;
  unreadNotificationCount: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    patient: 'María González',
    clinic: 'Clínica Dental Sonrisa',
    doctor: 'Dr. Rodríguez',
    treatment: 'Alineadores',
    arch: 'Superior',
    status: 'pending',
    requestedDate: '2024-01-15',
    deliveryDate: '2024-01-22',
    notes: 'Caso de apiñamiento leve'
  },
  {
    id: 'ORD-002',
    patient: 'Juan Pérez',
    clinic: 'Centro Odontológico Plus',
    doctor: 'Dra. Martínez',
    treatment: 'Retenedores',
    arch: 'Inferior',
    status: 'in_progress',
    requestedDate: '2024-01-10',
    deliveryDate: '2024-01-17'
  },
  {
    id: 'ORD-003',
    patient: 'Ana López',
    clinic: 'Clínica Dental Sonrisa',
    doctor: 'Dr. Rodríguez',
    treatment: 'Modelos',
    arch: 'Ambos',
    status: 'ready',
    requestedDate: '2024-01-08',
    deliveryDate: '2024-01-15'
  },
  {
    id: 'ORD-004',
    patient: 'Carlos Ruiz',
    clinic: 'Odontología Avanzada',
    doctor: 'Dra. Sánchez',
    treatment: 'Guías Quirúrgicas',
    arch: 'Superior',
    status: 'delivered',
    requestedDate: '2024-01-05',
    deliveryDate: '2024-01-12'
  }
];

const initialPatients: Patient[] = [
  { id: 'P-001', name: 'Roberto Sánchez', lastOrder: '17 Mar, 2025', orderCount: 3, color: '#2878FF' },
  { id: 'P-002', name: 'María López', lastOrder: '17 Mar, 2025', orderCount: 2, color: '#10B981' },
  { id: 'P-003', name: 'Carlos Mendoza', lastOrder: '16 Mar, 2025', orderCount: 4, color: '#F59E0B' },
  { id: 'P-004', name: 'Ana Torres', lastOrder: '15 Mar, 2025', orderCount: 3, color: '#8B5CF6' },
  { id: 'P-005', name: 'Laura Jiménez', lastOrder: '14 Mar, 2025', orderCount: 1, color: '#EF4444' },
  { id: 'P-006', name: 'José Ramírez', lastOrder: '14 Mar, 2025', orderCount: 2, color: '#06B6D4' }
];

const initialTasks: Task[] = [
  { id: 1, title: 'Revisar controles de calidad', subtitle: 'Trabajo pendiente', time: '09:00', done: true, color: '#10B981' },
  { id: 2, title: 'Validar resultados pendientes', subtitle: '12 órdenes', time: '10:30', done: false, color: '#F59E0B' },
  { id: 3, title: 'Preparar trabajos', subtitle: 'Laboratorio', time: '13:00', done: false, color: '#2878FF' },
  { id: 4, title: 'Enviar reporte diario', subtitle: 'DentiKC', time: '16:00', done: false, color: '#8B5CF6' }
];

const initialInventory: InventoryItem[] = [
  { id: 'I-001', name: 'Resina A2', category: 'Materiales', stock: 24, minStock: 10, unit: 'unidades' },
  { id: 'I-002', name: 'Pasta de pulido', category: 'Acabado', stock: 3, minStock: 5, unit: 'tubos' },
  { id: 'I-003', name: 'Filamento PETG', category: 'Impresión 3D', stock: 8, minStock: 3, unit: 'rollos' },
  { id: 'I-004', name: 'Yeso piedra', category: 'Materiales', stock: 15, minStock: 8, unit: 'kg' },
  { id: 'I-005', name: 'Láminas termoformado', category: 'Alineadores', stock: 42, minStock: 20, unit: 'unidades' },
  { id: 'I-006', name: 'Alcohol isopropílico', category: 'Limpieza', stock: 2, minStock: 4, unit: 'litros' }
];

const initialNotifications: Notification[] = [
  { id: 'N-001', title: 'Orden atrasada', message: 'Laura Jiménez - Guarda oclusal', time: 'Hace 2h', read: false, type: 'order' },
  { id: 'N-002', title: 'Stock bajo', message: 'Pasta de pulido - 3 unidades', time: 'Hace 5h', read: false, type: 'inventory' },
  { id: 'N-003', title: 'Trabajo completado', message: 'Carlos Mendoza - Modelo dental', time: 'Ayer', read: true, type: 'delivery' }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [patients] = useState<Patient[]>(initialPatients);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(orders.map(order => order.id === id ? { ...order, ...updates } : order));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      subtitle: 'Nueva tarea',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      done: false,
      color: '#3B82F6'
    };
    setTasks([...tasks, newTask]);
  };

  const updateInventory = (id: string, stock: number) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, stock } : item));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(notifications.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const saveNote = (content: string) => {
    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      pinned: false
    };
    setSavedNotes([newNote, ...savedNotes]);
  };

  const deleteNote = (id: string) => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <DataContext.Provider value={{
      orders,
      patients,
      tasks,
      inventory,
      notifications,
      savedNotes,
      addOrder,
      updateOrder,
      deleteOrder,
      toggleTask,
      addTask,
      updateInventory,
      markNotificationRead,
      markAllNotificationsRead,
      saveNote,
      deleteNote,
      unreadNotificationCount
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
