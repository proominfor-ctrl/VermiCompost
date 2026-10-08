import React from 'react';
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WormLogo } from './WormLogo';

interface HeroProps {
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onWhatsAppClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* شريط الإشعار العلوي والوسام */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#3C5742] mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE3D5] border border-[#D8CEBE] text-[#193320]">
            <WormLogo className="w-5 h-5 shrink-0" />
            <span className="font-bold">دودة الأرض المغرب · فيرمياتلاس</span>
          </div>
          <span aria-hidden="true" className="text-[#C5BDB0]">·</span>
          <span>سلالة أصلية 100% (Eisenia Fetida)</span>
          <span aria-hidden="true" className="text-[#C5BDB0]">·</span>
          <span>ملائمة لمناخ المغرب</span>
          <span aria-hidden="true" className="text-[#C5BDB0]">·</span>
          <span className="text-[#20522B] font-bold">الدفع عند الاستلام</span>
        </div>

        {/* الشبكة الرئيسية: النصوص والأزرار باليمين والصورة والبطاقات باليسار */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* العمود الأيمن: العناوين والدعوة البارزة للعمل */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* الشعار من الملصق */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#142618] leading-[1.2] tracking-tight">
                الدود <span className="text-[#B91C1C]">الحمراء</span> الأصلية <br />
                لإنتاج الفيرميكمبوست
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#2A5E35]">
                حل مثالي للتسميد العضوي وإكثار الدود
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#3E4E42] leading-relaxed max-w-2xl font-normal">
              دودة السماد (دودة الإسيينيا - دودة الأرض) الأصلية تتغذى على المواد العضوية المتحللة وبقايا الخضر لتحولها إلى سماد الفيرميكمبوست؛ أغنى سماد طبيعي غني بالمغذيات وملايين الكائنات الدقيقة المفيدة للتربة.
            </p>

            {/* الأزرار البارزة للعمل والطلب الفوري */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* الزر الرئيسي البارز كما طلب المستخدم */}
              <button
                onClick={onOrderClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white bg-[#193822] hover:bg-[#112717] active:scale-[0.98] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2E5E3B]/40 cursor-pointer"
              >
                <span>اطلب الدودة الحمراء الآن</span>
                <ArrowLeft className="w-5 h-5 text-[#9DE0A7] transition-transform group-hover:-translate-x-1" />
              </button>

              {/* زر الواتساب للطلب المباشر في المغرب */}
              <button
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-[#144723] bg-[#E2F0D9] hover:bg-[#D4E8C9] border border-[#BEDBAF] active:scale-[0.98] rounded-2xl transition-all duration-200 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>طلب فوري عبر واتساب</span>
              </button>
            </div>

            {/* شريط الثقة والتوصيل */}
            <div className="pt-4 border-t border-[#E3DDCF] grid grid-cols-3 gap-3 text-right">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#183320] tabular-nums">
                  100%
                </p>
                <p className="text-xs sm:text-sm text-[#55695A] font-semibold mt-0.5">
                  حياة مضمونة عند الوصول
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#183320] tabular-nums">
                  48 ساعة
                </p>
                <p className="text-xs sm:text-sm text-[#55695A] font-semibold mt-0.5">
                  توصيل سريع لجميع المدن
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#B91C1C] tabular-nums">
                  1 درهم
                </p>
                <p className="text-xs sm:text-sm text-[#55695A] font-semibold mt-0.5">
                  للدودة بالطلبيات الكبيرة
                </p>
              </div>
            </div>

          </div>

          {/* العمود الأيسر: الصورة الحية للدود مع بطاقة العلب السريعة */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* بطاقة الصورة الرئيسية */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#DFD8CA] bg-[#EFECE4] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/red_worms_container_1791467929309.jpg"
                alt="الدودة الحمراء الأصلية في صندوق التسميد بالمغرب"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

              {/* بطاقة معلومات حية بالأسفل */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#142317]/95 backdrop-blur-md border border-white/20 rounded-xl text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/30 shadow-md">
                    <WormLogo className="w-full h-full" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#A8E2B2]">
                      سلالة إيسينيا فيتيدا النشطة
                    </p>
                    <p className="text-sm font-semibold text-white">
                      مستعمرات حية مع بيض وشرانق
                    </p>
                  </div>
                </div>
                <div className="text-left pr-3 border-r border-white/20">
                  <span className="text-[11px] text-[#C5E1CB] block">التوصيل بالمغرب</span>
                  <span className="text-xs font-bold text-white">أمانة إكسبريس</span>
                </div>
              </div>
            </div>

            {/* شريط الباقات الثلاث السريعة من الملصق */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white border border-[#DCD5C5] rounded-xl shadow-xs">
                <span className="text-xs font-semibold text-[#5B6C5E] block">علبة 1 كيلو</span>
                <span className="text-xs font-medium text-[#7D8F80]">100 دودة</span>
                <p className="text-base font-extrabold text-[#1B3622] mt-1 tabular-nums">200 درهم</p>
              </div>

              <div className="p-3 bg-[#F2EDE1] border-2 border-[#1E3B26] rounded-xl shadow-xs relative">
                <span className="absolute -top-2.5 right-1/2 translate-x-1/2 bg-[#1E3B26] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  الأكثر طلباً
                </span>
                <span className="text-xs font-semibold text-[#5B6C5E] block">علبة 3 كيلو</span>
                <span className="text-xs font-medium text-[#7D8F80]">300 دودة</span>
                <p className="text-base font-extrabold text-[#1B3622] mt-1 tabular-nums">550 درهم</p>
              </div>

              <div className="p-3 bg-white border border-[#DCD5C5] rounded-xl shadow-xs">
                <span className="text-xs font-semibold text-[#5B6C5E] block">علبة 5 كيلو</span>
                <span className="text-xs font-medium text-[#7D8F80]">500 دودة</span>
                <p className="text-base font-extrabold text-[#1B3622] mt-1 tabular-nums">800 درهم</p>
              </div>
            </div>

            {/* شريط الطلبيات الكبيرة الذهبي المطابق للملصق */}
            <div className="p-3 bg-gradient-to-r from-[#DDA74F] via-[#F4CF74] to-[#C89438] text-[#3A2406] font-bold rounded-xl flex items-center justify-between text-xs sm:text-sm shadow-md">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3A2406] text-[#F4CF74] flex items-center justify-center text-xs font-black">
                  ★
                </span>
                <span>الطلبيات الكبيرة للمزارع والمشاريع:</span>
              </span>
              <span className="text-sm sm:text-base font-black tabular-nums bg-white/40 px-2.5 py-0.5 rounded-lg border border-black/10">
                1 درهم للدودة
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
