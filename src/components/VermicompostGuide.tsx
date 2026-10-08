import React from 'react';
import { BookOpen, Sparkles, Sprout, ShieldCheck, Droplets, CheckCircle2 } from 'lucide-react';
import { WormLogo } from './WormLogo';

export const VermicompostGuide: React.FC = () => {
  return (
    <section id="vermicompost-info" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* مقدمة الدليل العلمي والشعبي */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35563D] mb-2">
            <span>دليل الفيرميكالتشر بالمغرب</span>
            <span aria-hidden="true">·</span>
            <span>علم التربة الحية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142618]">
            ما هي دودة السماد؟ وما هو الفيرميكمبوست؟
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4C5D50]">
            كل ما تحتاج معرفته عن السر الطبيعي الذي أحدث ثورة في الزراعة البيئية والتسميد العضوي في المغرب.
          </p>
        </div>

        {/* البطاقتان التعليميتان الأساسيتان المقتبستان بدقة من طلب العميل */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* البطاقة 1: الدودة الحمراء - دودة الإسيينيا - دودة السماد */}
          <div className="bg-[#FCFBF9] border-2 border-[#D8CEBD] rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-[#EDE6D8] p-1 flex items-center justify-center shadow-xs">
                  <WormLogo className="w-full h-full" />
                </span>
                <span className="text-xs font-extrabold text-[#962525] bg-[#FDE8E8] px-3 py-1 rounded-full">
                  سلالة Eisenia Fetida
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#142618]">
                الدودة الحمراء - دودة الإسيينيا - دودة السماد
              </h3>

              {/* النص المباشر من طلب المستخدم */}
              <blockquote className="text-base text-[#2E3F32] leading-relaxed font-medium bg-[#F7F4EC] p-5 rounded-2xl border-r-4 border-[#255230]">
                "دودة السماد هي أحد أنواع دودة الأرض التي تعيش على سطح القشرة الأرضية وتتغذى على المواد العضوية المتحللة لتحولها إلى سماد الفيرميكمبوست. من أشهر فصائلها نجد <strong>الدودة الحمراء</strong> و<strong>الدودة النمر</strong> و<strong>الزاحف الأوروبي</strong> وهي أصناف جد ملائمة لمناخ المغرب."
              </blockquote>

              <p className="text-sm text-[#4E5E52] leading-relaxed">
                تتميز هذه الدودة بشراهتها العالية في التهام بقايا الخضر وقشور الفواكه وتفل القهوة والكرتون المبلل، وتتكاثر بسرعة هائلة؛ حيث تضع شرانق تفقس باستمرار لتضاعف حجم المزرعة في شهور معدودة.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE7DC] flex flex-wrap gap-4 text-xs font-bold text-[#4B6350]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C6237]" />
                تتحمل طقس المغرب المعتدل والحار
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C6237]" />
                تضاعف أعدادها كل 60-90 يوماً
              </span>
            </div>
          </div>

          {/* البطاقة 2: سماد دودة الأرض (الفيرميكمبوست) */}
          <div className="bg-[#FCFBF9] border-2 border-[#D8CEBD] rounded-3xl p-7 sm:p-9 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-[#EDE6D8] text-[#1E3E26] flex items-center justify-center shadow-xs">
                  <Sprout className="w-6 h-6" />
                </span>
                <span className="text-xs font-extrabold text-[#1B4B27] bg-[#E3F2E6] px-3 py-1 rounded-full">
                  الذهب الأسود العضوي
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#142618]">
                سماد دودة الأرض (الفيرميكمبوست)
              </h3>

              {/* النص المباشر من طلب المستخدم */}
              <blockquote className="text-base text-[#2E3F32] leading-relaxed font-medium bg-[#F7F4EC] p-5 rounded-2xl border-r-4 border-[#8B5628]">
                "الفيرميكمبوست عبارة من كلمتين : <strong>فيرمي</strong> التي تعني الدودة، و<strong>كمبوست</strong> التي تعني سماد فالمعنى إذن هو: <strong>سماد الدود</strong>.<br />
                الفيرمكمبوست سماد عضوي طبيعي ناتج عن مخلفات دودة الأرض التي تتغذى على المادة العضوية المتحللة. الفيرميكمبوست يحتوي على جميع العناصر المغذية الضرورية للنبات بالإضافة لاحتوائه على ملايين الكائنات الحية المجهرية المفيدة للأرض والتي تحمي النبات من الأمراض، وترفع من خصوبة الأرض."
              </blockquote>

              <p className="text-sm text-[#4E5E52] leading-relaxed">
                سماد ناعم يشبه القهوة المطحونة، عديم الرائحة الكريهة، يمتصه النبات بسرعة فائقة ولا يحرق الجذور إطلاقاً مهما زادت الكمية، مما يجعله الخيار الأول للزراعات العضوية المعتمدة.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE7DC] flex flex-wrap gap-4 text-xs font-bold text-[#4B6350]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C6237]" />
                ملايين الكائنات الدقيقة النافعة
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C6237]" />
                يرفع مقاومة المحصول للجفاف والأمراض
              </span>
            </div>
          </div>

        </div>

        {/* شبكة فوائد الفيرميكمبوست للمزارع والحدائق في المغرب */}
        <div className="p-6 sm:p-8 bg-[#EFEBE1] border border-[#DCD3C3] rounded-3xl">
          <h4 className="text-lg font-black text-[#152B1B] mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2C6439]" />
            <span>لماذا الفيرميكمبوست هو الحل الأقوى للتربة الفلاحية والحدائق في المغرب؟</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#DDD4C4]">
              <Droplets className="w-6 h-6 text-[#1A6B34] mb-2" />
              <h5 className="font-bold text-sm text-[#18311F]">مقاومة الجفاف وقلة التساقطات</h5>
              <p className="text-xs text-[#526354] mt-1 leading-relaxed">
                يزيد قدرة التربة على تخزين ماء السقي بنسبة تفوق 400%، مما يقلل عدد ريات السقي صيفاً.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#DDD4C4]">
              <ShieldCheck className="w-6 h-6 text-[#1A6B34] mb-2" />
              <h5 className="font-bold text-sm text-[#18311F]">مناعة طبيعية ضد أمراض الجذور</h5>
              <p className="text-xs text-[#526354] mt-1 leading-relaxed">
                الفطريات والبكتيريا المفيدة في الفيرميكمبوست تحيط بالجذور وتحميها من الأعفان والنيماتودا.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#DDD4C4]">
              <Sprout className="w-6 h-6 text-[#1A6B34] mb-2" />
              <h5 className="font-bold text-sm text-[#18311F]">تسريع نمو الخضر والشتلات</h5>
              <p className="text-xs text-[#526354] mt-1 leading-relaxed">
                يحتوي على هرمونات تجذير طبيعية (أوكسينات وسيتوكينينات) ترفع معدل الإنبات إلى أكثر من 98%.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#DDD4C4]">
              <BookOpen className="w-6 h-6 text-[#1A6B34] mb-2" />
              <h5 className="font-bold text-sm text-[#18311F]">تدوير مجاني لنفايات المطبخ</h5>
              <p className="text-xs text-[#526354] mt-1 leading-relaxed">
                تحويل قشور الخضار والفواكه ومخلفات المائدة إلى أثمن مورد زراعي دون روائح كريهة.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
