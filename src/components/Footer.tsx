import React from 'react';
import { ArrowLeft, Phone, MessageCircle, Globe, MapPin } from 'lucide-react';
import { WormLogo } from './WormLogo';

interface FooterProps {
  onOrderClick: () => void;
  onWhatsAppClick: () => void;
  onSecretAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrderClick, onWhatsAppClick, onSecretAdminClick }) => {
  return (
    <footer className="bg-[#122417] text-[#DCE7DF] pt-16 pb-12 border-t border-[#1C3623] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الشبكة العلوية للفوتر */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* العمود 1: الشعار والهوية الرسمية (5 أعمدة) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 shrink-0">
                <WormLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white">
                  دودة الأرض المغرب
                </span>
                <span className="text-xs font-bold text-[#D4AF37] font-mono tracking-wider">
                  VERMIATLAS · فيرمياتلاس
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A8BEB0] max-w-sm leading-relaxed">
              المتخصصون الأوائل في توفير الدودة الحمراء الأصلية (إيسينيا فيتيدا) وإنتاج سماد الفيرميكمبوست العضوي عالي الجودة بالمملكة المغربية.
            </p>

            <div className="pt-2 text-xs text-[#8DA695] space-y-1.5">
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="https://www.vermiatlas.ma" target="_blank" rel="noopener noreferrer" className="font-mono text-white font-bold hover:underline">
                  www.vermiatlas.ma
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>المغرب · خدمة التوصيل السريع لجميع المدن والأقاليم</span>
              </p>
            </div>
          </div>

          {/* العمود 2: روابط المنتجات والباقات (3 أعمدة) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-[#8EB798] uppercase tracking-wider">
              باقات الدودة والسماد
            </p>
            <ul className="space-y-2.5 text-sm text-[#CAD8CE]">
              <li>
                <a href="#products" className="hover:text-white transition-colors">علبة 1 كيلو (100 دودة) - 200 درهم</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">علبة 3 كيلو (300 دودة) - 550 درهم</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">علبة 5 كيلو (500 دودة) - 800 درهم</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors font-bold">الطلبيات الكبيرة (1 درهم/دودة)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">سماد الفيرميكمبوست النقي الجاهز</a>
              </li>
            </ul>
          </div>

          {/* العمود 3: التواصل والطلب المباشر (4 أعمدة) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold text-[#8EB798] uppercase tracking-wider">
              الطلب والاستفسار الفوري
            </p>
            <p className="text-sm text-[#A8BEB0] leading-relaxed">
              فريقنا جاهز لمساعدتكم في اختيار الباقة المناسبة وتقديم الإرشادات الفلاحية لتربية الدود وإنتاج الفيرميكمبوست بنجاح.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BE5C] text-[#0A2F15] font-black text-xs rounded-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>محادثة واتساب مباشرة</span>
              </button>

              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                <span>طلب الدود الآن</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* الشريط السفلي وحقوق النشر */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B9684] gap-4">
          <p
            onClick={onSecretAdminClick}
            className="cursor-default select-none"
            title=""
          >
            © 2026 فيرمياتلاس المغرب (vermiatlas.ma). جميع الحقوق محفوظة. دودة الأرض المغرب.
          </p>
          <div className="flex items-center gap-6">
            <a href="#vermicompost-info" className="hover:text-white transition-colors">دليل التغذية</a>
            <a href="#morocco-delivery" className="hover:text-white transition-colors">شروط التوصيل والدفع</a>
            <a href="#calculator" className="hover:text-white transition-colors">حاسبة الكميات</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
