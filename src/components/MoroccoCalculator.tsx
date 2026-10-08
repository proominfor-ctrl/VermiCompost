import React, { useState } from 'react';
import { Calculator, Check, ArrowLeft, Leaf, ShoppingCart } from 'lucide-react';
import { ArabicProduct, ARABIC_PRODUCTS, ProductPackage } from '../data/products';

interface MoroccoCalculatorProps {
  onAddCalculated: (product: ArabicProduct, pkg: ProductPackage) => void;
}

export const MoroccoCalculator: React.FC<MoroccoCalculatorProps> = ({ onAddCalculated }) => {
  const [calcMode, setCalcMode] = useState<'waste' | 'garden'>('waste');
  
  // وضع تدوير مخلفات المطبخ (كمية النفايات اليومية)
  const [dailyWasteGrams, setDailyWasteGrams] = useState<number>(500);

  // وضع مساحة الحديقة أو الحوض
  const [gardenAreaSqMeters, setGardenAreaSqMeters] = useState<number>(10);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // حساب الباقة المناسبة
  let recommendedProduct = ARABIC_PRODUCTS[0];
  let recommendedPkg = recommendedProduct.packages[0];
  let reasonText = '';

  if (calcMode === 'waste') {
    if (dailyWasteGrams <= 250) {
      recommendedProduct = ARABIC_PRODUCTS[0]; // 1kg - 100 worms
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = 'علبة 1 كيلو (100 دودة) ممتازة لبقايا شخص إلى شخصين يومياً.';
    } else if (dailyWasteGrams <= 800) {
      recommendedProduct = ARABIC_PRODUCTS[1]; // 3kg - 300 worms
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = 'علبة 3 كيلو (300 دودة) هي الخيار المثالي للعائلة المتوسطة لتدوير جميع بقايا الخضر والفواكه.';
    } else if (dailyWasteGrams <= 2000) {
      recommendedProduct = ARABIC_PRODUCTS[2]; // 5kg - 500 worms
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = 'علبة 5 كيلو (500 دودة) توفر قوة تدوير عالية للكميات اليومية الكبيرة والمطابخ النشطة.';
    } else {
      recommendedProduct = ARABIC_PRODUCTS[3]; // Bulk
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = 'طلبيات الجملة الكبيرة (1 درهم/دودة) هي الأنسب للمزارع والمشاريع الإنتاجية.';
    }
  } else {
    if (gardenAreaSqMeters <= 5) {
      recommendedProduct = ARABIC_PRODUCTS[0];
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = '100 دودة كافية لتأسيس أحواض الزينة والشتلات الصغيرة.';
    } else if (gardenAreaSqMeters <= 20) {
      recommendedProduct = ARABIC_PRODUCTS[1];
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = '300 دودة تنتج كمية ممتازة لتسميد حديقة بمساحة 10-20 متر مربع بانتظام.';
    } else if (gardenAreaSqMeters <= 50) {
      recommendedProduct = ARABIC_PRODUCTS[2];
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = '500 دودة للمساحات المتوسطة وتسميد أشجار الحديقة والخضروات.';
    } else {
      recommendedProduct = ARABIC_PRODUCTS[3];
      recommendedPkg = recommendedProduct.packages[0];
      reasonText = 'طلبية جملة بسعر 1 درهم للدودة لتغطية المساحات الكبيرة والضيعات.';
    }
  }

  const handleAddRecommended = () => {
    onAddCalculated(recommendedProduct, recommendedPkg);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2800);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* عنوان الحاسبة */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35563D] mb-2">
            <span>حاسبة الاحتياج الذكية بالمغرب</span>
            <span aria-hidden="true">·</span>
            <span>بدون هدر</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142618]">
            كم يلزمني من الدود للبدء في إنتاج الفيرميكمبوست؟
          </h2>
          <p className="mt-3 text-base text-[#4C5D50]">
            احسب الباقة المناسبة لاحتياجك بدقة، سواء كنت تريد التخلص من بقايا المطبخ العضوية أو تسميد حديقتك المنزلية.
          </p>
        </div>

        {/* شبكة الحاسبة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* لوحة التحكم والمدخلات (7 أعمدة) */}
          <div className="lg:col-span-7 bg-[#FCFBF9] border border-[#DDD6C7] rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* اختيار طريقة الحساب */}
            <div className="flex items-center gap-2 p-1.5 bg-[#EAE4D7] rounded-2xl">
              <button
                type="button"
                onClick={() => setCalcMode('waste')}
                className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  calcMode === 'waste'
                    ? 'bg-[#1C3B24] text-white shadow-sm'
                    : 'text-[#48564B] hover:text-[#182C1B]'
                }`}
              >
                حسب مخلفات المطبخ اليومية (غرام)
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('garden')}
                className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  calcMode === 'garden'
                    ? 'bg-[#1C3B24] text-white shadow-sm'
                    : 'text-[#48564B] hover:text-[#182C1B]'
                }`}
              >
                حسب مساحة الحديقة (متر مربع)
              </button>
            </div>

            {/* مدخلات وضع مخلفات المطبخ */}
            {calcMode === 'waste' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#1B3120]">
                    كمية بقايا الخضر والفواكه المتوفرة يومياً:
                  </label>
                  <span className="text-lg font-black text-[#1D3B25] tabular-nums">
                    {dailyWasteGrams} غرام يومياً
                  </span>
                </div>

                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="100"
                  value={dailyWasteGrams}
                  onChange={(e) => setDailyWasteGrams(Number(e.target.value))}
                  className="w-full accent-[#1D3B25] cursor-pointer"
                />

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setDailyWasteGrams(200)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    شخص واحد (~200غ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDailyWasteGrams(500)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    عائلة صغيرة (~500غ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDailyWasteGrams(1000)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    عائلة 5 أفراد (~1 كلغ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDailyWasteGrams(2500)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    مطعم أو ضيعة (+2 كلغ)
                  </button>
                </div>
              </div>
            ) : (
              /* مدخلات وضع مساحة الحديقة */
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#1B3120]">
                    مساحة الحديقة أو الحوض الزراعي:
                  </label>
                  <span className="text-lg font-black text-[#1D3B25] tabular-nums">
                    {gardenAreaSqMeters} م²
                  </span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="100"
                  step="2"
                  value={gardenAreaSqMeters}
                  onChange={(e) => setGardenAreaSqMeters(Number(e.target.value))}
                  className="w-full accent-[#1D3B25] cursor-pointer"
                />

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setGardenAreaSqMeters(5)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    أصص وأحواض (5 م²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGardenAreaSqMeters(15)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    حديقة صغيرة (15 م²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGardenAreaSqMeters(40)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    حديقة واسعة (40 م²)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGardenAreaSqMeters(80)}
                    className="p-2 rounded-lg bg-[#F0EBE0] hover:bg-[#E5DFD2] font-semibold text-[#3E4F42]"
                  >
                    ضيعة أو مشتل (80 م²)
                  </button>
                </div>
              </div>
            )}

            {/* نصائح تغذية ورعاية الدود */}
            <div className="pt-4 border-t border-[#EAE4D7] text-xs text-[#526356] space-y-1.5">
              <p className="font-bold text-[#1B3421]">نصيحة فيرمياتلاس الذهبية:</p>
              <p>• الدودة تلتهم ما يعادل نصف وزنها يومياً، ويتضاعف عددها كل شهرين إلى ثلاثة أشهر مع العناية الجيدة.</p>
              <p>• لا تضع الحمضيات الكثيرة أو اللحوم والزيوت في صندوق الدود.</p>
            </div>
          </div>

          {/* بطاقة النتيجة والتوصية الفورية (5 أعمدة) */}
          <div className="lg:col-span-5 bg-[#173420] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-bold text-[#A8E2B2] uppercase tracking-wider block">
                الباقة الموصى بها لك
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-1">
                {recommendedPkg.name}
              </h3>
              <p className="text-sm text-[#D3E8D9] mt-2 leading-relaxed">
                {reasonText}
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#A8C7B0] block">السعر الإجمالي:</span>
                <span className="text-3xl font-black text-[#A8E2B2] tabular-nums">
                  {recommendedPkg.price} درهم
                </span>
              </div>
              <div className="text-left text-xs text-[#DCECE0]">
                <span>التوصيل متاح لجميع المدن</span>
                <span className="block font-bold text-white">الدفع عند الاستلام</span>
              </div>
            </div>

            {/* زر إضافة الباقة المحسوبة للطلب */}
            <div className="space-y-3">
              <button
                onClick={handleAddRecommended}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 bg-[#A8E2B2] hover:bg-[#92D69D] text-[#0F2616] font-black rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer text-base"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-5 h-5 text-[#0F2616]" />
                    <span>تمت الإضافة للسلة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 text-[#0F2616]" />
                    <span>أضف هذه الباقة إلى طلبي ({recommendedPkg.price} درهم)</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#A6C4AE] text-center">
                نرفق مع كل علبة دليلاً مصوراً ومتابعة عبر الواتساب لضمان نجاح مستعمرتك 100%.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
