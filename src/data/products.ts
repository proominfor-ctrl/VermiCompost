export interface ProductPackage {
  id: string;
  name: string;
  wormCount?: number;
  weight: string;
  price: number;
  popular?: boolean;
  unitPriceLabel?: string;
}

export interface ArabicProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'worms' | 'compost' | 'bulk';
  categoryLabel: string;
  description: string;
  features: string[];
  image: string;
  badges: string[];
  packages: ProductPackage[];
  scientificName?: string;
  idealFor: string[];
}

export const ARABIC_PRODUCTS: ArabicProduct[] = [
  {
    id: 'red-worms-starter-1kg',
    title: 'الدود الحمراء الأصلية (علبة 1 كيلو)',
    subtitle: '100 دودة إيسينيا حية ونشطة في بيئة عضوية خصبة جاهزة للتكاثر',
    category: 'worms',
    categoryLabel: 'الدودة الحمراء - دودة السماد',
    scientificName: 'Eisenia Fetida / Red Wigglers',
    description: 'دودة السماد هي أحد أنواع دودة الأرض التي تعيش على سطح القشرة الأرضية وتتغذى على المواد العضوية المتحللة لتحولها إلى سماد الفيرميكمبوست. صنف ملائم جداً لمناخ المغرب وسريع التكاثر والإنتاج.',
    image: '/src/assets/images/red_worms_container_1791467929309.jpg',
    badges: ['أصلية 100%', 'ملائمة لمناخ المغرب', 'إنتاج منزلي'],
    features: [
      '100 دودة بالغة قادرة على وضع الشرانق والتكاثر السريع',
      'بيئة عضوية رطبة وغنية تكفي لنقل الدود بأمان',
      'دليل إرشادي مجاني لطريقة التغذية والرعاية في المنزل',
      'تتحمل درجات الحرارة المعتدلة والدافئة بالمغرب'
    ],
    idealFor: [
      'المبتدئين في التربية المنزلية',
      'تدوير مخلفات المطبخ في الشقق والحدائق الصغيرة',
      'أحواض الدود المبتدئة (Worm Bin)'
    ],
    packages: [
      { id: 'box-1kg', name: 'علبة 1 كيلو (100 دودة)', wormCount: 100, weight: '1 كغ', price: 200, unitPriceLabel: '2 درهم / دودة' }
    ]
  },
  {
    id: 'red-worms-garden-3kg',
    title: 'الدود الحمراء الأصلية (علبة 3 كيلو)',
    subtitle: '300 دودة نشطة - الحجم الأكثر طلباً للحدائق وتسريع إنتاج الفيرميكمبوست',
    category: 'worms',
    categoryLabel: 'الأكثر مبيعاً للحدائق',
    scientificName: 'Eisenia Fetida / Red Wigglers',
    description: 'كمية متوازنة توفر مستعمرة قوية قادرة على التهام كيلوغرامات من النفايات العضوية أسبوعياً وتحويلها إلى سماد أسود فاخر غني بالعناصر والكائنات الدقيقة المفيدة.',
    image: '/src/assets/images/red_worms_cluster_1791467942508.jpg',
    badges: ['الأكثر طلباً', 'مستعمرة سريعة', 'وفر 50 درهم'],
    features: [
      '300 دودة حية مع بيض وشرانق نشطة',
      'تلتهم ما يصل إلى 1.5 كلغ من المخلفات العضوية أسبوعياً',
      'مستعمرة قوية تتضاعف أعدادها كل 60 إلى 90 يوماً',
      'متابعة واستشارة زراعية مجانية بعد الشراء'
    ],
    idealFor: [
      'أصحاب الحدائق المنزلية المتوسطة',
      'إنتاج الفيرميكمبوست بانتظام للخضار والأشجار',
      'المربين الراغبين في بناء مشروع إكثار'
    ],
    packages: [
      { id: 'box-3kg', name: 'علبة 3 كيلو (300 دودة)', wormCount: 300, weight: '3 كغ', price: 550, popular: true, unitPriceLabel: '1.83 درهم / دودة' }
    ]
  },
  {
    id: 'red-worms-farm-5kg',
    title: 'الدود الحمراء الأصلية (علبة 5 كيلو)',
    subtitle: '500 دودة بالغة - أفضل قيمة اقتصادية لإنشاء مزارع الفيرميكمبوست',
    category: 'worms',
    categoryLabel: 'قيمة ممتازة للمزارع',
    scientificName: 'Eisenia Fetida / Tiger Worm',
    description: 'الحزمة الاحترافية للمزارعين وأصحاب الضيعات والبيوت البلاستيكية. تعطي دفعة فورية لإنتاج الفيرميكمبوست السائل والصلب وتحسين خصوبة التربة المجهدة.',
    image: '/src/assets/images/hands_holding_worms_1791467955176.jpg',
    badges: ['أفضل توفير', 'مزارع وضيعات', 'وفر 200 درهم'],
    features: [
      '500 دودة منتقاة يدوياً مع مستعمرة متكاملة',
      'أعلى معدل إنتاج يومي لسماد الفيرميكمبوست',
      'توفير أقصى سعر للدودة (1.6 درهم فقط للدودة)',
      'تغليف آمن ومحكم يضمن وصول الدود حياً 100%'
    ],
    idealFor: [
      'الضيعات الفلاحية والمزارع البيولوجية',
      'أحواض التسميد الكبيرة ومزارع الإكثار التجاري',
      'المشاتل الزراعية وإنتاج الشتلات القوية'
    ],
    packages: [
      { id: 'box-5kg', name: 'علبة 5 كيلو (500 دودة)', wormCount: 500, weight: '5 كغ', price: 800, unitPriceLabel: '1.60 درهم / دودة' }
    ]
  },
  {
    id: 'bulk-worms-orders',
    title: 'الطلبيات الكبيرة للدود (بالجملة)',
    subtitle: 'سعر خاص وموحد: 1 درهم للدودة الواحدة للكميات والمشاريع الكبرى',
    category: 'bulk',
    categoryLabel: 'طلبيات الجملة والمشاريع',
    scientificName: 'الزاحف الأوروبي ودود الإسيينيا',
    description: 'حل مخصص للتعاونيات الفلاحية والمشاريع الزراعية الكبرى ومزارع تدوير النفايات. نوفر كميات ضخمة مع التوصيل والإشراف التقني على تأسيس المزرعة.',
    image: '/src/assets/images/product_biochar_blend_1791466787869.jpg',
    badges: ['1 درهم للدودة', 'مشاريع كبرى', 'إشراف وتدريب'],
    features: [
      'سعر تفضيلي ثابت: 1 درهم للدودة الواحدة',
      'الحد الأدنى للطلب بالجملة: 1,000 دودة وما فوق',
      'إشراف مباشر ومرافقة في تصميم الأحواض ونظام الري',
      'توصيل مبرد وسريع لجميع أقاليم وجهات المملكة'
    ],
    idealFor: [
      'المشاريع الاستثمارية في الفيرميكالتشر بالمغرب',
      'التعاونيات والجمعيات الفلاحية البيئية',
      'مزارع التسميد العضوي الصناعي'
    ],
    packages: [
      { id: 'bulk-1000', name: 'دفعة 1,000 دودة', wormCount: 1000, weight: '~10 كغ', price: 1000, unitPriceLabel: '1 درهم / دودة' },
      { id: 'bulk-2500', name: 'دفعة 2,500 دودة', wormCount: 2500, weight: '~25 كغ', price: 2500, unitPriceLabel: '1 درهم / دودة' },
      { id: 'bulk-5000', name: 'دفعة 5,000 دودة', wormCount: 5000, weight: '~50 كغ', price: 5000, unitPriceLabel: '1 درهم / دودة' }
    ]
  },
  {
    id: 'pure-vermicompost-fertilizer',
    title: 'سماد دودة الأرض النقي (الفيرميكمبوست)',
    subtitle: 'سماد عضوي طبيعي 100% غني بالكائنات الحية الدقيقة والمغذيات المحمية',
    category: 'compost',
    categoryLabel: 'سماد الفيرميكمبوست النقي',
    description: 'الفيرمكمبوست سماد عضوي طبيعي ناتج عن مخلفات دودة الأرض التي تتغذى على المادة العضوية المتحللة. يحتوي على جميع العناصر المغذية الضرورية للنبات بالإضافة لاحتوائه على ملايين الكائنات الحية المجهرية المفيدة للأرض والتي تحمي النبات من الأمراض وترفع من خصوبة الأرض.',
    image: '/src/assets/images/pure_vermicompost_bag_1791467968292.jpg',
    badges: ['طبيعي 100%', 'بدون روائح كيميائية', 'جاهز للاستعمال'],
    features: [
      'غني بعناصر N-P-K الطبيعية وحمض الهيوميك والفولفيك',
      'ملايين البكتيريا النافعة والفطريات الجذرية الحية',
      'يرفع قدرة التربة على حفظ الماء بنسبة تصل إلى 400%',
      'آمن تماماً ولا يحرق جذور النباتات حتى بالكميات الكبيرة'
    ],
    idealFor: [
      'تسميد أشجار الفواكه والزيتون والنخيل',
      'أحواض الخضروات العضوية والبيوت البلاستيكية',
      'نباتات الزينة المنزلية والأصص والحدائق المعلقة'
    ],
    packages: [
      { id: 'vermi-5kg', name: 'كيس 5 كغ', weight: '5 كغ', price: 60, popular: true, unitPriceLabel: '12 درهم / كغ' },
      { id: 'vermi-25kg', name: 'كيس 25 كغ فلاحي', weight: '25 كغ', price: 240, unitPriceLabel: '9.6 درهم / كغ' },
      { id: 'vermi-supersack', name: 'سوبر ساك 500 كغ (نصف طن)', weight: '500 كغ', price: 3900, unitPriceLabel: '7.8 درهم / كغ' }
    ]
  }
];

export interface CartItemArabic {
  productId: string;
  productTitle: string;
  packageId: string;
  packageName: string;
  price: number;
  quantity: number;
  image: string;
}
