import React, { useState } from 'react';
import { CartItemArabic } from '../data/products';
import { saveOrder, getStoreSettings, OrderRecord } from '../data/ordersStore';
import { X, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CheckCircle2, Truck, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemArabic[];
  onUpdateQuantity: (productId: string, packageId: string, delta: number) => void;
  onRemoveItem: (productId: string, packageId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'الدار البيضاء',
    address: '',
    notes: ''
  });

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 500; // 500 درهم
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 40; // 40 درهم للشحن السريع
  const total = rawSubtotal + shippingFee;

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `VA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerCity: formData.city,
      customerAddress: formData.address,
      customerNotes: formData.notes,
      items: [...items],
      subtotal: rawSubtotal,
      shippingFee,
      totalAmount: total,
      status: 'new',
    };

    // حفظ الطلبية في سجل المتجر
    await saveOrder(newOrder);
    setCreatedOrder(newOrder);
    setCheckoutStep('success');

    // إرسال تنبيه فوري عبر الواتساب للمسؤول
    const settings = getStoreSettings();
    let ownerPhone = settings.ownerWhatsApp.replace(/\D/g, '');
    if (ownerPhone.startsWith('0')) {
      ownerPhone = '212' + ownerPhone.slice(1);
    }
    if (!ownerPhone) ownerPhone = '212600000000';

    const itemsSummary = items
      .map((it) => `• ${it.productTitle} (${it.packageName}) × ${it.quantity} = ${it.price * it.quantity} درهم`)
      .join('%0A');

    const msg = `🔔 *طلبية جديدة من موقع فيرمياتلاس (%23${orderId})*%0A%0A👤 *الزبون:* ${formData.name}%0A📱 *الهاتف:* ${formData.phone}%0A📍 *المدينة:* ${formData.city}%0A🏠 *العنوان:* ${formData.address}%0A📝 *ملاحظات:* ${formData.notes || 'لا توجد'}%0A%0A📦 *المنتجات المطلوبة:*%0A${itemsSummary}%0A%0A💰 *المجموع المطلوب (الدفع عند الاستلام):* ${total} درهم`;

    // فتح الواتساب تلقائياً للمشتري ليتم إرسال الطلب مباشرة لرقم المتجر
    window.open(`https://wa.me/${ownerPhone}?text=${msg}`, '_blank');
  };

  const handleWhatsAppOrder = () => {
    const settings = getStoreSettings();
    let ownerPhone = settings.ownerWhatsApp.replace(/\D/g, '');
    if (ownerPhone.startsWith('0')) {
      ownerPhone = '212' + ownerPhone.slice(1);
    }
    if (!ownerPhone) ownerPhone = '212600000000';

    const itemsSummary = items
      .map((it) => `• ${it.productTitle} (${it.packageName}) × ${it.quantity} = ${it.price * it.quantity} درهم`)
      .join('%0A');

    const msg = `السلام عليكم فيرمياتلاس، أريد تأكيد طلبي:%0A${itemsSummary}%0Aالمجموع: ${total} درهم%0Aالاسم: ${formData.name || 'مشتري'}%0Aالهاتف: ${formData.phone || ''}%0Aالمدينة: ${formData.city}%0Aالعنوان: ${formData.address || ''}`;
    window.open(`https://wa.me/${ownerPhone}?text=${msg}`, '_blank');
  };

  const handleDone = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm animate-fade-in text-right">
      <div className="bg-[#FAF8F5] border-r border-[#DDD5C5] w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* ترويسة السلة */}
        <div className="p-5 border-b border-[#E7E1D4] flex items-center justify-between bg-[#F3EFE4]">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-black text-[#152B1B]">
              {checkoutStep === 'cart' && 'سلة طلبات الدود والفيرميكمبوست'}
              {checkoutStep === 'details' && 'معلومات التوصيل بالمغرب'}
              {checkoutStep === 'success' && 'تم تأكيد طلبك بنجاح!'}
            </h3>
            {checkoutStep === 'cart' && (
              <span className="text-xs text-[#637566] font-bold">
                ({items.reduce((acc, it) => acc + it.quantity, 0)} عناصر)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#556658] hover:text-[#182C1B] rounded-xl hover:bg-[#E4DDCF] transition-colors cursor-pointer"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* محتوى السلة */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {checkoutStep === 'cart' && (
            <>
              {/* شريط التوصيل المجاني */}
              <div className="p-3.5 bg-[#EBE5D8] rounded-2xl border border-[#DDD5C5] text-xs">
                {isFreeShipping ? (
                  <p className="text-[#193B22] font-bold flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2E683E] shrink-0" />
                    <span>مبروك! لقد حصلت على توصيل مجاني لجميع مدن المغرب.</span>
                  </p>
                ) : (
                  <div>
                    <p className="text-[#3F4F42] flex items-center justify-between mb-1.5 font-bold">
                      <span>أضف بقيمة {(freeShippingThreshold - rawSubtotal).toFixed(0)} درهم للحصول على <strong>توصيل مجاني</strong></span>
                      <span className="text-[#18311F]">{Math.round((rawSubtotal / freeShippingThreshold) * 100)}%</span>
                    </p>
                    <div className="w-full bg-[#DDD6C6] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#244C2E] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* قائمة العناصر */}
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-base text-[#566858] font-bold">
                    سلة مشترياتك فارغة حالياً.
                  </p>
                  <p className="text-xs text-[#7B8B7D] max-w-xs mx-auto">
                    اختر الباقة المناسبة لك من باقات الدودة الحمراء أو سماد الفيرميكمبوست للبدء.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-[#1C3B24] text-white text-xs font-bold rounded-xl hover:bg-[#132A1A] transition-colors cursor-pointer"
                  >
                    تصفح الباقات
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.packageId}`}
                      className="p-3.5 bg-white border border-[#E4DDD0] rounded-2xl flex gap-3 items-center shadow-xs"
                    >
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover bg-[#EDE8DE] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#162D1D] truncate">
                          {item.productTitle}
                        </h4>
                        <p className="text-xs text-[#637667]">{item.packageName}</p>
                        <p className="text-xs font-black text-[#193320] mt-1 tabular-nums">
                          {item.price} درهم للعلبة
                        </p>
                      </div>

                      {/* أزرار زيادة ونقصان الكمية */}
                      <div className="flex items-center gap-1.5 bg-[#F2EEE4] rounded-xl p-1 border border-[#DDD5C5]">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.packageId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#3B4D3F] hover:bg-white rounded-lg transition-colors cursor-pointer"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#18311F] px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.packageId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#3B4D3F] hover:bg-white rounded-lg transition-colors cursor-pointer"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* زر الحذف */}
                      <button
                        onClick={() => onRemoveItem(item.productId, item.packageId)}
                        className="p-1.5 text-[#88988B] hover:text-[#C53030] transition-colors cursor-pointer"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'details' && (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-[#EAE4D7] rounded-2xl text-xs text-[#2E4833] flex items-center gap-2 font-bold">
                <Truck className="w-4 h-4 shrink-0 text-[#214A29]" />
                <span>الدفع عند الاستلام بعد معاينة الطرد والتأكد من وصول الدود حياً.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#445648] mb-1">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: يوسف العلمي"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#445648] mb-1">
                  رقم الهاتف (للاتصال والتأكيد) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="06XXXXXXXX أو 07XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#445648] mb-1">
                  المدينة أو الإقليم *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الدار البيضاء، مراكش، طنجة، الرباط..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#445648] mb-1">
                  عنوان التسليم أو أقرب وكالة بريد أمانة *
                </label>
                <input
                  type="text"
                  required
                  placeholder="الحي، رقم المنزل، أو الاستلام من وكالة البريد"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#445648] mb-1">
                  ملاحظات إضافية للتوصيل
                </label>
                <textarea
                  rows={2}
                  placeholder="توقيت الاتصال المفضل، أو استفسارات خاصة..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] bg-white text-[#192F1F] focus:outline-none focus:ring-2 focus:ring-[#1E3B26]"
                />
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#1F4129] text-[#9EE2A8] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-black text-[#152B1B]">
                تم تسجيل طلبك بنجاح!
              </h4>
              <p className="text-xs font-mono text-[#3E5C43] bg-[#EBE5D8] px-3.5 py-1.5 rounded-lg inline-block font-bold">
                رقم الطلب: #{createdOrder?.id || 'VA-2026'}
              </p>
              <p className="text-sm text-[#465749] max-w-sm mx-auto leading-relaxed">
                شكراً لك <strong>{formData.name || 'عزيزي المشتري'}</strong>. تم إرسال تفاصيل طلبك مباشرة للإدارة، وسنتصل بك على الرقم <strong>{formData.phone || ''}</strong> لتأكيد الإرسالية والشحن إلى <strong>{formData.city}</strong>.
              </p>

              <div className="p-4 bg-white border border-[#E5DFD1] rounded-2xl text-right text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#657668]">طريقة الدفع:</span>
                  <strong className="text-[#18311F]">الدفع نقداً عند الاستلام COD</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#657668]">مدة التوصيل:</span>
                  <strong className="text-[#18311F]">24 - 48 ساعة كحد أقصى</strong>
                </div>
                <div className="flex justify-between border-t border-[#ECE7DA] pt-2">
                  <span className="text-[#657668]">المبلغ الإجمالي:</span>
                  <strong className="text-[#18311F] text-sm">{total} درهم</strong>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 max-w-sm mx-auto">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BE5C] text-[#0B3819] font-black rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>فتح رسالة الطلب عبر الواتساب</span>
                </button>
                <button
                  onClick={handleDone}
                  className="py-2.5 bg-[#EAE4D7] text-[#1E3623] text-xs font-bold rounded-xl hover:bg-[#DDD5C5] transition-colors cursor-pointer"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          )}

        </div>

        {/* أسفل السلة والحسابات الإجمالية */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-5 border-t border-[#E7E1D4] bg-[#F3EFE4] space-y-3">
            <div className="space-y-1.5 text-xs text-[#4F6052]">
              <div className="flex justify-between">
                <span>مجموع المنتجات</span>
                <span className="font-bold text-[#18311F] tabular-nums">{rawSubtotal} درهم</span>
              </div>
              <div className="flex justify-between">
                <span>مصاريف الشحن والتوصيل</span>
                <span className="font-bold text-[#18311F] tabular-nums">
                  {isFreeShipping ? 'مجاناً' : `${shippingFee} درهم`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#14291A] pt-2 border-t border-[#DFD8C9]">
                <span>المجموع الكلي:</span>
                <span className="tabular-nums text-xl text-[#183922]">{total} درهم</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <div className="space-y-2">
                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1C3B24] hover:bg-[#132A1A] text-white font-bold rounded-2xl shadow-md transition-colors cursor-pointer text-sm"
                >
                  <span>متابعة إدخال العنوان والتوصيل</span>
                  <ArrowLeft className="w-4 h-4 text-[#9EE2A8]" />
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E4F5E8] hover:bg-[#D5EED9] text-[#134924] font-bold rounded-2xl border border-[#BDE0C6] transition-colors cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>طلب مباشر عبر الواتساب</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 bg-[#E5DFD1] hover:bg-[#DDD5C5] text-[#1E3623] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1C3B24] hover:bg-[#132A1A] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-sm"
                >
                  <span>تأكيد الطلب والدفع عند الاستلام ({total} درهم)</span>
                  <ShieldCheck className="w-4 h-4 text-[#9EE2A8]" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

