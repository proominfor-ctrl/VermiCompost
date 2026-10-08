import { CartItemArabic } from './products';

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
        image: '/src/assets/images/red_worms_cluster_1791467942508.jpg',
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
        image: '/src/assets/images/hands_holding_worms_1791467955176.jpg',
      },
      {
        productId: 'pure-vermicompost-fertilizer',
        productTitle: 'سماد دودة الأرض النقي (الفيرميكمبوست)',
        packageId: 'vermi-5kg',
        packageName: 'كيس 5 كغ',
        price: 60,
        quantity: 2,
        image: '/src/assets/images/pure_vermicompost_bag_1791467968292.jpg',
      }
    ],
    subtotal: 920,
    shippingFee: 0,
    totalAmount: 920,
    status: 'confirmed'
  }
];

export const getOrders = (): OrderRecord[] => {
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

export const saveOrder = (order: OrderRecord): void => {
  try {
    const orders = getOrders();
    const updated = [order, ...orders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving order:', err);
  }
};

export const updateOrderStatus = (orderId: string, status: OrderRecord['status']): OrderRecord[] => {
  try {
    const orders = getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getOrders();
  }
};

export const deleteOrder = (orderId: string): OrderRecord[] => {
  try {
    const orders = getOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getOrders();
  }
};

export const getStoreSettings = (): StoreSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoreSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};
