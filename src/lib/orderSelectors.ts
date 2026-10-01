import { Order } from '../contexts/DataContext';

export function getPendingOrders(orders: Order[]): Order[] {
  return orders.filter(o => o.status === 'pending');
}

export function getWeeklyDeliveredOrders(orders: Order[]): Order[] {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return orders.filter(o => {
    if (o.status !== 'delivered') return false;
    const deliveryDate = new Date(o.deliveryDate);
    return deliveryDate >= weekAgo && deliveryDate <= now;
  });
}

export function getOverdueOrders(orders: Order[]): Order[] {
  const now = new Date();
  
  return orders.filter(o => {
    if (o.status === 'delivered') return false;
    const deliveryDate = new Date(o.deliveryDate);
    return deliveryDate < now;
  });
}

export function getOrdersDueToday(orders: Order[]): Order[] {
  const today = new Date().toDateString();
  
  return orders.filter(o => {
    if (o.status === 'delivered') return false;
    const deliveryDate = new Date(o.deliveryDate);
    return deliveryDate.toDateString() === today;
  });
}

export function getDeliveredToday(orders: Order[]): Order[] {
  const today = new Date().toDateString();
  
  return orders.filter(o => {
    if (o.status !== 'delivered') return false;
    const deliveryDate = new Date(o.deliveryDate);
    return deliveryDate.toDateString() === today;
  });
}
