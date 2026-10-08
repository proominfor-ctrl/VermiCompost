import React, { useState } from 'react';
import { Truck, ShieldCheck, MapPin, CheckCircle2, PhoneCall, Clock } from 'lucide-react';

export const MoroccoDeliverySection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const majorCities = [
    'الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'فاس', 'أكادير', 'مكناس',
    'وجدة', 'القنيطرة', 'تطوان', 'الجديدة', 'آسفي', 'بني ملال', 'تمارة'
  ];

  const handleCheckCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity.trim()) return;

    setDeliveryResult(
      `التوصيل متاح إلى ${selectedCity}! يستغرق 24 إلى 48 ساعة عبر الإرساليات السريعة، مع ضمان وصول الدود حياً 100% والدفع عند الاستلام.`
    );
  };

  return (
    <section id="morocco-delivery" className="py-16 sm:py-24 bg-[#F5F2EA] border-t border-[#E5DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* عنوان قسم التوصيل بالمغرب */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35563D] mb-2">
            <span>التوصيل في المغرب</span>
            <span aria-hidden="true">·</span>
            <span>الدفع عند الاستلام COD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142618]">
            توصيل سريع وآمن لجميع مدن وأقاليم المملكة المغربية
          </h2>
          <p className="mt-3 text-base text-[#4C5D50]">
            نضمن وصول الدودة الحمراء حية وبكامل نشاطها، مغلفة في بيئة عضوية رطبة ومجهزة خصيصاً للشحن السريع.
          </p>
        </div>

        {/* مميزات التوصيل والشحن */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FCFBF9] border border-[#DDD5C5] rounded-3xl p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE7DA] text-[#1E3E26] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#152B1B]">
              إرساليات سريعة ومضمونة
            </h3>
            <p className="text-sm text-[#4E5E51] leading-relaxed">
              شحن عبر أمانة وإرساليات متخصصة (Amana Express) تصل إلى باب منزلك أو أقرب وكالة بريد في مدينتك خلال 24 - 48 ساعة.
            </p>
          </div>

          <div className="bg-[#FCFBF9] border border-[#DDD5C5] rounded-3xl p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE7DA] text-[#1E3E26] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#152B1B]">
              ضمان وصول الدود حياً 100%
            </h3>
            <p className="text-sm text-[#4E5E51] leading-relaxed">
              يتم شحن الدود في علب مهواة وبطعام رطب يكفيه لأكثر من 10 أيام. نضمن استبدال أي طرد تعرض للتلف في الطريق فوراً ومجاناً.
            </p>
          </div>

          <div className="bg-[#FCFBF9] border border-[#DDD5C5] rounded-3xl p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE7DA] text-[#1E3E26] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#152B1B]">
              الدفع عند الاستلام
            </h3>
            <p className="text-sm text-[#4E5E51] leading-relaxed">
              لا داعي للدفع المسبق؛ عاين طردك وادفع نقداً لموزع البريد أو مندوب التوصيل بعد استلام العلبة ومراجعتها.
            </p>
          </div>
        </div>

        {/* فاحص المدينة المغربية */}
        <div className="bg-[#EDE6D8] border border-[#DCD3C1] rounded-3xl p-6 sm:p-8">
          <div className="max-w-2xl">
            <h4 className="text-lg font-black text-[#152B1B] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2C6237]" />
              <span>تحقق من مدة التوصيل لمدينتك بالمغرب</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#506354] mt-1">
              اختر أو اكتب اسم مدينتك لمعرفة مدة الشحن وكيفية الاستلام.
            </p>

            <form onSubmit={handleCheckCity} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="text"
                placeholder="اكتب مدينتك (مثال: مراكش، الدار البيضاء...)"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5CCBA] bg-white text-sm text-[#19301E] focus:outline-none focus:ring-2 focus:ring-[#23462C]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F4128] hover:bg-[#142C1B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                تحقق الآن
              </button>
            </form>

            {/* اقتراحات مدن سريعة */}
            <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
              <span className="text-[#647567] font-semibold">مدن شائعة:</span>
              {majorCities.slice(0, 7).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setDeliveryResult(
                      `التوصيل متاح إلى ${city}! يستغرق 24 إلى 48 ساعة مع ضمان وصول الدود حياً والدفع عند الاستلام.`
                    );
                  }}
                  className="px-2 py-0.5 bg-white/70 hover:bg-white text-[#253E2A] rounded-md font-semibold cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>

            {deliveryResult && (
              <div className="mt-4 p-4 bg-white border border-[#2B5436]/40 rounded-2xl text-xs sm:text-sm text-[#183420] flex items-start gap-2.5 shadow-xs animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-[#2B5436] shrink-0 mt-0.5" />
                <span>{deliveryResult}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
