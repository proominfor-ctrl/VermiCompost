import React, { useState, useEffect } from 'react';
import {
  OrderRecord,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getStoreSettings,
  saveStoreSettings,
  StoreSettings
} from '../data/ordersStore';
import {
  X,
  Phone,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  Settings,
  Package,
  TrendingUp,
  Copy,
  Trash2,
  ExternalLink,
  Shield
} from 'lucide-react';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrders(getOrders());
      setSettings(getStoreSettings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (orderId: string, newStatus: OrderRecord['status']) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الطلبية من السجل؟')) {
      const updated = deleteOrder(orderId);
      setOrders(updated);
    }
  };

  const handleCopyShippingSlip = (order: OrderRecord) => {
    const text = `=== وصل إرسالية فيرمياتلاس ===
رقم الطلب: ${order.id}
المستلم: ${order.customerName}
الهاتف: ${order.customerPhone}
المدينة: ${order.customerCity}
العنوان: ${order.customerAddress}
المنتجات: ${order.items.map((it) => `${it.productTitle} (${it.packageName}) × ${it.quantity}`).join(' + ')}
المبلغ المطلوب عند الاستلام (COD): ${order.totalAmount} درهم
ملاحظات: ${order.customerNotes || 'لا توجد'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreSettings(settings);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2500);
  };

  // إحصائيات
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'new':
        return <span className="bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-lg text-xs font-bold">جديدة (تحتاج تأكيد)</span>;
      case 'confirmed':
        return <span className="bg-[#DBEAFE] text-[#1E40AF] px-2.5 py-1 rounded-lg text-xs font-bold">تم التأكيد مع الزبون</span>;
      case 'shipped':
        return <span className="bg-[#E0E7FF] text-[#4338CA] px-2.5 py-1 rounded-lg text-xs font-bold">في الطريق (أمانة)</span>;
      case 'delivered':
        return <span className="bg-[#D1FAE5] text-[#065F46] px-2.5 py-1 rounded-lg text-xs font-bold">تم الاستلام والدفع</span>;
      case 'cancelled':
        return <span className="bg-[#FEE2E2] text-[#991B1B] px-2.5 py-1 rounded-lg text-xs font-bold">ملغاة</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-right">
      <div className="bg-[#FAF8F5] border border-[#DDD5C5] w-full max-w-4xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* ترويسة لوحة التحكم */}
        <div className="p-5 sm:p-6 border-b border-[#E5DFD1] bg-[#F2EDE0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1C3A24] text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-[#9EE2A8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#152B1B]">
                  لوحة إدارة الطلبيات (خاص بالمسؤول)
                </h3>
                <span className="text-[11px] bg-[#E3DACB] text-[#554532] px-2 py-0.5 rounded-md font-bold">
                  VERMIATLAS ADMIN
                </span>
              </div>
              <p className="text-xs text-[#5C6E5E]">
                هنا تظهر جميع طلبات الزبائن الواردة عبر الموقع مع بيانات الاتصال والعناوين.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'orders' ? 'settings' : 'orders')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#1C3B24] text-white border-[#1C3B24]'
                  : 'bg-white text-[#3E5242] border-[#D8CEBD] hover:bg-[#F0ECE2]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{activeTab === 'settings' ? 'عرض الطلبات' : 'إعدادات الإشعارات'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#5A6C5C] hover:text-[#182C1B] rounded-xl hover:bg-[#E4DDD0] transition-colors cursor-pointer"
              aria-label="إغلاق لوحة التحكم"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* مؤشرات الأداء السريعة */}
        <div className="grid grid-cols-3 gap-3 p-4 sm:p-6 bg-white border-b border-[#E7E1D2] text-right">
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E9E3D6]">
            <span className="text-xs text-[#637566] block font-semibold">مجموع الطلبيات</span>
            <span className="text-2xl font-black text-[#17301E] tabular-nums mt-0.5 block">
              {orders.length}
            </span>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E9E3D6]">
            <span className="text-xs text-[#637566] block font-semibold">طلبات جديدة غير مؤكدة</span>
            <span className="text-2xl font-black text-[#B91C1C] tabular-nums mt-0.5 block">
              {newOrdersCount}
            </span>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E9E3D6]">
            <span className="text-xs text-[#637566] block font-semibold">إجمالي المبيعات (درهم)</span>
            <span className="text-2xl font-black text-[#1F4C2B] tabular-nums mt-0.5 block">
              {totalRevenue} DH
            </span>
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {activeTab === 'orders' ? (
            <>
              {/* تصنيف الطلبات حسب الحالة */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2">
                <span className="text-xs font-bold text-[#556758]">
                  تصفية الطلبيات:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
                  {[
                    { id: 'all', label: `الكل (${orders.length})` },
                    { id: 'new', label: `الجديدة (${newOrdersCount})` },
                    { id: 'confirmed', label: 'المؤكدة' },
                    { id: 'shipped', label: 'تم الشحن' },
                    { id: 'delivered', label: 'المستلمة' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterStatus(filter.id)}
                      className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                        filterStatus === filter.id
                          ? 'bg-[#1C3B24] text-white'
                          : 'bg-[#EDE7DA] text-[#475749] hover:bg-[#E0D8CA]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* قائمة الطلبيات */}
              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center text-[#6A7B6D]">
                  <Package className="w-12 h-12 mx-auto text-[#B2C2B5] mb-2" />
                  <p className="font-bold text-base">لا توجد طلبيات في هذا القسم حالياً.</p>
                  <p className="text-xs text-[#8FA092] mt-1">
                    عندما يقوم أي زائر بطلب الدود أو السماد عبر الموقع، ستظهر بياناته هنا فوراً.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const formattedDate = new Date(order.createdAt).toLocaleString('ar-MA', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    // تنظيف رقم الهاتف للواتساب
                    const cleanPhone = order.customerPhone.replace(/\D/g, '');
                    const waPhone = cleanPhone.startsWith('0')
                      ? '212' + cleanPhone.slice(1)
                      : cleanPhone;

                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-[#E3DCce] rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
                      >
                        {/* رأس بطاقة الطلب */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0ECE1] pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-black text-[#183420] bg-[#EAE4D7] px-2.5 py-1 rounded-lg">
                              #{order.id}
                            </span>
                            <span className="text-xs text-[#7B8C7E] flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{formattedDate}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                              className="text-xs font-bold border border-[#DDD5C5] rounded-lg px-2 py-1 bg-[#FAF8F5] text-[#1B3320] cursor-pointer"
                            >
                              <option value="new">تغيير إلى: جديدة</option>
                              <option value="confirmed">تغيير إلى: مؤكدة</option>
                              <option value="shipped">تغيير إلى: تم الشحن (أمانة)</option>
                              <option value="delivered">تغيير إلى: تم الاستلام والدفع</option>
                              <option value="cancelled">تغيير إلى: ملغاة</option>
                            </select>
                          </div>
                        </div>

                        {/* معلومات الزبون والتوصيل */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1.5">
                            <p className="text-[#657667]">بيانات الزبون:</p>
                            <p className="text-sm font-black text-[#152B1B]">{order.customerName}</p>
                            <p className="font-mono text-sm font-bold text-[#1E4D2B] dir-ltr inline-block">
                              {order.customerPhone}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-[#657667]">العنوان والمدينة:</p>
                            <p className="font-bold text-[#152B1B]">{order.customerCity}</p>
                            <p className="text-[#4E5F51]">{order.customerAddress}</p>
                            {order.customerNotes && (
                              <p className="text-[11px] text-[#8C582B] bg-[#FFF8EE] p-2 rounded-lg border border-[#F2DEBF]">
                                <strong>ملاحظة الزبون:</strong> {order.customerNotes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* قائمة المنتجات المطلوبة */}
                        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EDE7DB] space-y-2">
                          <p className="text-xs font-bold text-[#455748]">المنتجات المطلوبة:</p>
                          <div className="space-y-1.5">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="font-bold text-[#193220]">
                                  {it.productTitle} - <span className="text-[#6C7E6F]">{it.packageName}</span>
                                </span>
                                <span className="font-mono font-bold text-[#152B1B] tabular-nums">
                                  {it.quantity} × {it.price} = {it.quantity * it.price} درهم
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-[#E5DFD1] flex justify-between items-center font-bold text-sm">
                            <span>المبلغ المطلوب استخلاصه عند التسليم:</span>
                            <span className="text-base text-[#183922] font-black tabular-nums">
                              {order.totalAmount} درهم
                            </span>
                          </div>
                        </div>

                        {/* أزرار الإجراءات السريعة (اتصال - واتساب - نسخ الوصل) */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {/* اتصال فوري */}
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#E9E4D6] hover:bg-[#DCD5C4] text-[#1B3621] rounded-xl text-xs font-bold transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>اتصال بالزبون</span>
                          </a>

                          {/* مراسلة واتساب */}
                          <a
                            href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                              `السلام عليكم أخي/أختي ${order.customerName}، معكم إدارة فيرمياتلاس (دودة الأرض المغرب). نتصل بكم لتأكيد طلبيتكم رقم #${order.id} بمبلغ ${order.totalAmount} درهم لشحنها إلى ${order.customerCity}. هل العنوان مؤكد؟`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-[#0A3014] rounded-xl text-xs font-bold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>تأكيد عبر الواتساب</span>
                          </a>

                          {/* نسخ وصل الإرسالية */}
                          <button
                            onClick={() => handleCopyShippingSlip(order)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF8F5] border border-[#D8CEBC] hover:bg-[#EFE9DC] text-[#3F5243] rounded-xl text-xs font-bold transition-colors cursor-pointer mr-auto"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedId === order.id ? 'تم نسخ وصل الشحن!' : 'نسخ وصل أمانة إكسبريس'}</span>
                          </button>

                          {/* حذف الطلب */}
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-[#9A3434] hover:bg-[#FEE2E2] rounded-xl transition-colors cursor-pointer"
                            title="حذف هذه الطلبية"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            /* تبويب إعدادات الإشعارات ورقم الهاتف */
            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-3xl border border-[#DDD5C5] space-y-6 max-w-xl mx-auto">
              <div>
                <h4 className="text-lg font-black text-[#152B1B]">
                  كيف تتوصل بالطلبيات على هاتفك؟
                </h4>
                <p className="text-xs text-[#526455] mt-1">
                  قم بإدخال رقم الواتساب الخاص بك، حتى تصلك جميع تفاصيل أي طلب جديد من الزبائن مباشرة على هاتفك فور ضغطهم على زر الشراء.
                </p>
              </div>

              {savedSettingsNotice && (
                <div className="p-3.5 bg-[#D1FAE5] text-[#065F46] rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم حفظ الإعدادات بنجاح! جميع الطلبات القادمة ستصلك على هذا الرقم.</span>
                </div>
              )}

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-[#3E5042] mb-1">
                    رقم الواتساب الخاص بك لاستقبال الطلبيات *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 212612345678 أو 0612345678"
                    value={settings.ownerWhatsApp}
                    onChange={(e) => setSettings({ ...settings, ownerWhatsApp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white font-mono text-sm text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                  />
                  <p className="text-[11px] text-[#768778] mt-1">
                    (أدخل الرمز الدولي 212 أو الرقم المباشر 06/07)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E5042] mb-1">
                    رقم الهاتف للاتصال المباشر
                  </label>
                  <input
                    type="text"
                    placeholder="06XXXXXXXX"
                    value={settings.ownerPhone}
                    onChange={(e) => setSettings({ ...settings, ownerPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-sm text-[#192F1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3E5042] mb-1">
                    البريد الإلكتروني للتوصل بالنسخ
                  </label>
                  <input
                    type="email"
                    placeholder="contact@vermiatlas.ma"
                    value={settings.ownerEmail}
                    onChange={(e) => setSettings({ ...settings, ownerEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-sm text-[#192F1F]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1C3B24] hover:bg-[#122A19] text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-sm"
              >
                حفظ رقم الهاتف والإعدادات
              </button>
            </form>
          )}

        </div>

        {/* تذييل لوحة التحكم */}
        <div className="p-4 border-t border-[#E5DFD1] bg-[#F3EFE4] flex items-center justify-between text-xs text-[#5D6F60]">
          <span>
            تنبيه: يمكنك الوصول لهذه اللوحة في أي وقت عبر النقر على <strong>"إدارة الطلبيات"</strong> في أسفل الموقع.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1C3B24] text-white font-bold rounded-xl hover:bg-[#122A19] transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
