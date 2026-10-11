import { CartItemArabic } from './products';
import redWormsCluster from '../assets/images/red_worms_cluster_1791467942508.jpg';
import handsHoldingWorms from '../assets/images/hands_holding_worms_1791467955176.jpg';
import pureVermicompostBag from '../assets/images/pure_vermicompost_bag_1791467968292.jpg';
import { supabase, hasSupabase } from '../lib/supabase';

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  customerNotes?: string;
  items: CartItemArabic[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  status: 'new' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface StoreSettings {
  ownerWhatsApp: string; // Phone without + e.g. 212612345678
  ownerPhone: string;
  ownerEmail: string;
  notifyByWhatsApp: boolean;
}

const STORAGE_KEY = 'vermiatlas_orders_v1';
const SETTINGS_KEY = 'vermiatlas_settings_v1';

// إعدادات المتجر الافتراضية
const DEFAULT_SETTINGS: StoreSettings = {
  ownerWhatsApp: '212600000000',
  ownerPhone: '0600000000',
  ownerEmail: 'contact@vermiatlas.ma',
  notifyByWhatsApp: true,
};

const mapSupabaseRow = (row: any): OrderRecord => ({
  id: row.id,
  createdAt: row.created_at ?? new Date().toISOString(),
  customerName: row.customer_name ?? '',
  customerPhone: row.customer_phone ?? '',
  customerCity: row.customer_city ?? '',
  customerAddress: row.customer_address ?? '',
  customerNotes: row.customer_notes ?? '',
  items: Array.isArray(row.items) ? row.items : [],
  subtotal: Number(row.subtotal ?? 0),
  shippingFee: Number(row.shipping_fee ?? 0),
  totalAmount: Number(row.total_amount ?? 0),
  status: row.status ?? 'new',
});

const getLocalOrders = (): OrderRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SAMPLE_ORDERS;
  }
};

const getLocalSettings = (): StoreSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const saveLocalOrder = (order: OrderRecord): void => {
  try {
    const orders = getLocalOrders();
    const updated = [order, ...orders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving order:', err);
  }
};

const saveLocalSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};

// طلبيات تجريبية أولية لتوضيح كيفية ظهور الطلبات للمسؤول
const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'VA-8901',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'طارق المنصوري',
    customerPhone: '0661245890',
    customerCity: 'الدار البيضاء (المعاريف)',
    customerAddress: 'زنقة ابن بطوطة، إقامة الهدى عمارة 4 شقة 12',
    customerNotes: 'المرجو الاتصال بعد الساعة 2 زوالاً، والتسليم بالباب.',
    items: [
      {
        productId: 'red-worms-garden-3kg',
        productTitle: 'الدود الحمراء الأصلية (علبة 3 كيلو)',
        packageId: 'box-3kg',
        packageName: 'علبة 3 كيلو (300 دودة)',
        price: 550,
        quantity: 1,
        image: redWormsCluster,
      }
    ],
    subtotal: 550,
    shippingFee: 0,
    totalAmount: 550,
    status: 'new'
  },
  {
    id: 'VA-8902',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    customerName: 'فاطمة الزهراء بنكيران',
    customerPhone: '0672198034',
    customerCity: 'مراكش (النخيل)',
    customerAddress: 'طريق فاس، تجزئة الياسمين فيلا رقم 28',
    customerNotes: 'لتسميد حديقة الخضروات والأشجار المثمرة.',
    items: [
      {
        productId: 'red-worms-farm-5kg',
        productTitle: 'الدود الحمراء الأصلية (علبة 5 كيلو)',
        packageId: 'box-5kg',
        packageName: 'علبة 5 كيلو (500 دودة)',
        price: 800,
        quantity: 1,
        image: handsHoldingWorms,
      },
      {
        productId: 'pure-vermicompost-fertilizer',
        productTitle: 'سماد دودة الأرض النقي (الفيرميكمبوست)',
        packageId: 'vermi-5kg',
        packageName: 'كيس 5 كغ',
        price: 60,
        quantity: 2,
        image: pureVermicompostBag,
      }
    ],
    subtotal: 920,
    shippingFee: 0,
    totalAmount: 920,
    status: 'confirmed'
  }
];

export const getOrders = async (): Promise<OrderRecord[]> => {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase getOrders error:', error);
      return getLocalOrders();
    }
    return (data ?? []).map(mapSupabaseRow);
  }

  return getLocalOrders();
};

export const saveOrder = async (order: OrderRecord): Promise<void> => {
  if (hasSupabase && supabase) {
    const { error } = await supabase.from('orders').insert([{
      id: order.id,
      created_at: order.createdAt,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      customer_city: order.customerCity,
      customer_address: order.customerAddress,
      customer_notes: order.customerNotes ?? '',
      items: order.items,
      subtotal: order.subtotal,
      shipping_fee: order.shippingFee,
      total_amount: order.totalAmount,
      status: order.status,
    }]);

    if (error) {
      console.error('Supabase saveOrder error:', error);
    }
    return;
  }

  saveLocalOrder(order);
};

export const updateOrderStatus = async (orderId: string, status: OrderRecord['status']): Promise<OrderRecord[]> => {
  if (hasSupabase && supabase) {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) {
      console.error('Supabase updateOrderStatus error:', error);
      return getLocalOrders();
    }
    return getOrders();
  }

  try {
    const orders = getLocalOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getLocalOrders();
  }
};

export const deleteOrder = async (orderId: string): Promise<OrderRecord[]> => {
  if (hasSupabase && supabase) {
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (error) {
      console.error('Supabase deleteOrder error:', error);
      return getLocalOrders();
    }
    return getOrders();
  }

  try {
    const orders = getLocalOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getLocalOrders();
  }
};

export const getStoreSettings = (): StoreSettings => {
  return getLocalSettings();
};

export const saveStoreSettings = (settings: StoreSettings): void => {
  saveLocalSettings(settings);
};
