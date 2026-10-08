/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { VermicompostGuide } from './components/VermicompostGuide';
import { MoroccoCalculator } from './components/MoroccoCalculator';
import { MoroccoDeliverySection } from './components/MoroccoDeliverySection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { ArabicProduct, ProductPackage, CartItemArabic, ARABIC_PRODUCTS } from './data/products';
import { getStoreSettings } from './data/ordersStore';
import { MessageCircle, PhoneCall, Truck } from 'lucide-react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  // الكشف التلقائي عن الرابط السري الخاص بالمسؤول (?admin=true أو #admin)
  useEffect(() => {
    const checkAdminAccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hasAdminParam = urlParams.get('admin') === 'true' || urlParams.get('admin') === '1';
      const hasAdminHash = window.location.hash.toLowerCase() === '#admin';
      const hasAdminPath = window.location.pathname === '/admin';

      if (hasAdminParam || hasAdminHash || hasAdminPath) {
        setAdminOpen(true);
      }
    };

    checkAdminAccess();
    window.addEventListener('hashchange', checkAdminAccess);
    window.addEventListener('popstate', checkAdminAccess);

    // اختصار لوحة المفاتيح السري لصاحب المتجر (Ctrl + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      window.removeEventListener('popstate', checkAdminAccess);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSecretFooterClick = () => {
    setSecretClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setAdminOpen(true);
        return 0;
      }
      return next;
    });
  };

  // السلة المبدئية تحتوي على علبة 3 كيلو الأكثر طلباً
  const [cartItems, setCartItems] = useState<CartItemArabic[]>([
    {
      productId: 'red-worms-garden-3kg',
      productTitle: 'الدود الحمراء الأصلية (علبة 3 كيلو)',
      packageId: 'box-3kg',
      packageName: 'علبة 3 كيلو (300 دودة)',
      price: 550,
      quantity: 1,
      image: '/src/assets/images/red_worms_cluster_1791467942508.jpg',
    }
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: ArabicProduct, pkg: ProductPackage, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.packageId === pkg.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            productTitle: product.title,
            packageId: pkg.id,
            packageName: pkg.name,
            price: pkg.price,
            quantity: quantity,
            image: product.image,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, packageId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.packageId === packageId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItemArabic => item !== null);
    });
  };

  const handleRemoveItem = (productId: string, packageId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.packageId === packageId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getOwnerWa = () => {
    const settings = getStoreSettings();
    let num = settings.ownerWhatsApp.replace(/\D/g, '');
    if (num.startsWith('0')) num = '212' + num.slice(1);
    return num || '212600000000';
  };

  const handleOpenWhatsApp = () => {
    window.open(
      `https://wa.me/${getOwnerWa()}?text=السلام%20عليكم%20فيرمياتلاس،%20أريد%20الاستفسار%20وطلب%20الدودة%20الحمراء%20لإنتاج%20الفيرميكمبوست`,
      '_blank'
    );
  };

  const handleDirectOrder = (product: ArabicProduct, pkg: ProductPackage) => {
    handleAddToCart(product, pkg, 1);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E231F] selection:bg-[#204028] selection:text-white" dir="rtl">
      
      {/* شريط الإعلان العلوي للمغرب */}
      <div className="bg-[#18311F] text-[#D0EADB] text-xs py-2 px-4 text-center font-bold">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Truck className="w-3.5 h-3.5 text-[#9EE2A8]" />
          <span>توصيل سريع لجميع مدن المغرب عبر أمانة إكسبريس · الدفع نقداً عند الاستلام COD</span>
          <button
            onClick={scrollToProducts}
            className="underline text-[#A2E4B2] hover:text-white cursor-pointer mr-1"
          >
            تصفح الباقات والأسعار ←
          </button>
        </div>
      </div>

      {/* شريط التنقل العلوي (نظيف وبدون أزرار إدارة عامة) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOrderClick={scrollToProducts}
      />

      {/* المحتوى الرئيسي */}
      <main className="flex-1">
        <Hero
          onOrderClick={scrollToProducts}
          onWhatsAppClick={handleOpenWhatsApp}
        />

        <ProductsSection
          onAddToCart={handleAddToCart}
          onDirectOrder={handleDirectOrder}
        />

        <VermicompostGuide />

        <MoroccoCalculator
          onAddCalculated={(prod, pkg) => {
            handleAddToCart(prod, pkg, 1);
            setCartOpen(true);
          }}
        />

        <MoroccoDeliverySection />
      </main>

      {/* تذييل الصفحة الرسمي */}
      <Footer
        onOrderClick={scrollToProducts}
        onWhatsAppClick={handleOpenWhatsApp}
        onSecretAdminClick={handleSecretFooterClick}
      />

      {/* سلة التسوق المنبثقة بالدرهم المغربي */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* لوحة تحكم وإدارة الطلبيات لصاحب المتجر (تفتح بالرابط المباشر ?admin=true أو #admin) */}
      <AdminOrdersModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* زر الواتساب العائم السريع للزبائن بالمغرب */}
      <a
        href={`https://wa.me/${getOwnerWa()}?text=السلام%20عليكم%20فيرمياتلاس،%20أريد%20طلب%20الدودة%20الحمراء`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20BE5C] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
        title="تواصل مباشر عبر الواتساب"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="hidden sm:inline-block font-bold text-xs pl-1">
          واتساب فيرمياتلاس
        </span>
      </a>

    </div>
  );
}
