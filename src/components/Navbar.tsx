import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Menu, X, ClipboardList } from 'lucide-react';
import { WormLogo } from './WormLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: الشعار الرسمي - دودة الأرض المغرب / فيرمياتلاس */}
          <a href="#" className="flex items-center gap-3 group text-right">
            <div className="w-12 h-12 transition-transform group-hover:scale-105 shrink-0">
              <WormLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#162E1D] leading-tight">
                دودة الأرض المغرب
              </span>
              <span className="text-xs font-bold text-[#8C582B] tracking-wider uppercase font-mono">
                VERMIATLAS.MA
              </span>
            </div>
          </a>

          {/* Zone 2: روابط التصفح الأساسية */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#405244]">
            <a href="#products" className="hover:text-[#18311F] transition-colors py-1">
              الدودة الحمراء والأسعار
            </a>
            <a href="#vermicompost-info" className="hover:text-[#18311F] transition-colors py-1">
              ما هو الفيرميكمبوست؟
            </a>
            <a href="#calculator" className="hover:text-[#18311F] transition-colors py-1">
              حاسبة الدود والحديقة
            </a>
            <a href="#morocco-delivery" className="hover:text-[#18311F] transition-colors py-1">
              التوصيل لمدن المغرب
            </a>
            <a href="#bulk-offer" className="hover:text-[#18311F] transition-colors py-1">
              طلبيات الجملة والمزارع
            </a>
          </nav>

          {/* Zone 3: الإجراءات الأساسية (السلة + زر الطلب البارز) */}
          <div className="flex items-center gap-2.5">
            {/* زر سلة المشتريات */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#304033] hover:text-[#18311F] hover:bg-[#EFECE4] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203D27] cursor-pointer"
              aria-label={`سلة الطلبات بها ${cartCount} عناصر`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#203D27] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* الزر البارز للطلب الفوري */}
            <button
              onClick={onOrderClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#1E3B26] hover:bg-[#142B1A] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#203D27] cursor-pointer whitespace-nowrap"
            >
              <span>اطلب الدود الآن</span>
              <ArrowLeft className="w-4 h-4 text-[#A8E2B2]" />
            </button>

            {/* القائمة للجوال */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#304033] hover:text-[#18311F] rounded-lg hover:bg-[#EFECE4] transition-colors"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E2D8] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#2C382F] hover:text-[#18311F]"
          >
            الدودة الحمراء والأسعار
          </a>
          <a
            href="#vermicompost-info"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#2C382F] hover:text-[#18311F]"
          >
            ما هو الفيرميكمبوست؟
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#2C382F] hover:text-[#18311F]"
          >
            حاسبة الدود والحديقة
          </a>
          <a
            href="#morocco-delivery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#2C382F] hover:text-[#18311F]"
          >
            التوصيل لمدن المغرب
          </a>
          <a
            href="#bulk-offer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#2C382F] hover:text-[#18311F]"
          >
            طلبيات الجملة (1 درهم للدودة)
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#1E3B26] rounded-xl shadow-md cursor-pointer"
            >
              <span>اطلب الدودة الحمراء الآن</span>
              <ArrowLeft className="w-4 h-4 text-[#A8E2B2]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

