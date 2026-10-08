import React, { useState } from 'react';
import { ArabicProduct, ARABIC_PRODUCTS, ProductPackage } from '../data/products';
import { ShoppingCart, Check, MessageCircle, ArrowLeft, Star, Sparkles } from 'lucide-react';
import { WormLogo } from './WormLogo';

interface ProductsSectionProps {
  onAddToCart: (product: ArabicProduct, pkg: ProductPackage, quantity: number) => void;
  onDirectOrder: (product: ArabicProduct, pkg: ProductPackage) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onAddToCart, onDirectOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'worms' | 'compost' | 'bulk'>('all');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'جميع المنتجات والعروض' },
    { id: 'worms', label: 'باقات الدودة الحمراء' },
    { id: 'compost', label: 'سماد الفيرميكمبوست الجاهز' },
    { id: 'bulk', label: 'الطلبيات الكبيرة (1 درهم/دودة)' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? ARABIC_PRODUCTS
    : ARABIC_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddClick = (product: ArabicProduct, pkg: ProductPackage) => {
    onAddToCart(product, pkg, 1);
    setAddedItemNotice(`تمت إضافة "${product.title} - ${pkg.name}" إلى سلة الطلبات!`);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2800);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#F5F2EA] border-y border-[#E6E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* عنوان القسم وتصفيات الفئات */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#35563D] mb-2">
              <span>أسعار فيرمياتلاس الرسمية</span>
              <span aria-hidden="true">·</span>
              <span>سلالات أصلية مضمونة 100%</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#142618]">
              باقات الدودة الحمراء الأصلية وسماد الفيرميكمبوست
            </h2>
            <p className="mt-3 text-base text-[#4C5D50]">
              اقتنِ مستعمرتك اليوم وابدأ في تحويل بقايا مطبخك وحديقتك إلى أنقى سماد عضوي مغربي، متكيف مع مختلف مناطق المملكة.
            </p>
          </div>

          {/* أزرار التصفية التفاعلية */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#E6E0D2] rounded-2xl self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1D3B25] text-white shadow-sm'
                    : 'text-[#48564B] hover:text-[#182B1C] hover:bg-[#DCD5C4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* إشعار إضافة عنصر للسلة */}
        {addedItemNotice && (
          <div className="mb-6 p-4 bg-[#1F4129] text-white rounded-xl shadow-md flex items-center justify-between text-sm animate-fade-in">
            <span className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-[#9EE2A8] shrink-0" />
              <span className="font-semibold">{addedItemNotice}</span>
            </span>
            <span className="text-xs text-[#BFE8C7] font-bold">يمكنك المتابعة أو تأكيد الطلب</span>
          </div>
        )}

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const defaultPkg = product.packages[0];

            return (
              <div
                key={product.id}
                className="flex flex-col bg-[#FCFBF9] border border-[#DDD6C7] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* صورة المنتج */}
                <div className="relative aspect-[4/3] bg-[#EAE5D9] overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* الشارات على الصورة */}
                  <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-[#193220]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg shadow-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* ختم دودة الأرض المغرب في الزاوية */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white/95 p-0.5 shadow-md">
                    <WormLogo className="w-full h-full" />
                  </div>

                  {/* السعر البارز على الصورة */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#162D1D] px-3.5 py-1.5 rounded-xl shadow-sm border border-black/5">
                    <span className="text-xs text-[#526656] block">السعر:</span>
                    <span className="text-xl font-black tabular-nums text-[#193822]">
                      {defaultPkg.price} درهم
                    </span>
                  </div>
                </div>

                {/* تفاصيل البطاقة */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#4F6D55] font-semibold">
                      <span>{product.categoryLabel}</span>
                      {product.scientificName && (
                        <span className="font-mono text-[11px] text-[#718476]">{product.scientificName}</span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-[#14291B] leading-snug">
                      {product.title}
                    </h3>

                    <p className="text-sm text-[#3E4F42] font-semibold leading-relaxed">
                      {product.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#5B6B5E] leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* مميزات المنتج */}
                    <div className="pt-3 border-t border-[#EDE7DB] space-y-1.5 text-xs text-[#435446]">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2E683E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* منطقة الأزرار والشراء */}
                  <div className="pt-4 border-t border-[#EDE7DB] space-y-2">
                    <div className="flex items-center gap-2">
                      {/* زر الإضافة للسلة */}
                      <button
                        onClick={() => handleAddClick(product, defaultPkg)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#1B3A23] hover:bg-[#122A19] active:scale-[0.98] text-white text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 text-[#9EE2A8]" />
                        <span>أضف إلى السلة</span>
                      </button>

                      {/* زر الطلب المباشر */}
                      <button
                        onClick={() => onDirectOrder(product, defaultPkg)}
                        className="px-3.5 py-3 bg-[#E7E1D2] hover:bg-[#DDD5C3] text-[#1B3621] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        title="طلب فوري بالدفع عند الاستلام"
                      >
                        طلب فوري
                      </button>
                    </div>

                    {product.packages.length > 1 && (
                      <div className="text-center">
                        <span className="text-[11px] text-[#697A6D]">
                          تتوفر أحجام إضافية ({product.packages.map((p) => p.name).join(' · ')})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* لافتة الطلبيات الكبيرة الذهبية المطابقة لبوستر العميل */}
        <div id="bulk-offer" className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#17331F] via-[#244C30] to-[#17331F] text-white rounded-3xl border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] text-[#17331F] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#D4AF37] text-[#17331F] text-xs font-black px-2.5 py-0.5 rounded-md">
                  عرض خاص للمشاريع
                </span>
                <span className="text-xs text-[#A8D8B2]">للمزارع والتعاونيات والضيعات الفلاحية</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mt-1">
                الطلبيات الكبيرة: 1 درهم للدودة الواحدة!
              </h3>
              <p className="text-sm text-[#D3E8D9] mt-1 max-w-xl">
                نوفر كميات تبدأ من 1,000 دودة إلى أكثر من 50,000 دودة لمزارع الفيرميكمبوست الكبرى مع التوصيل والإشراف الزراعي على تجهيز الأحواض في المغرب.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/212600000000?text=السلام%20عليكم،%20أريد%20الاستفسار%20عن%20الطلبيات%20الكبيرة%20للدودة%20الحمراء%20(1%20درهم%20للدودة)"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#C29F2E] text-[#142A1A] font-black text-base rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>طلب عرض أسعار عبر الواتساب</span>
          </a>
        </div>

      </div>
    </section>
  );
};
