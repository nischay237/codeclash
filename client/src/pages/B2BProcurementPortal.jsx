import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  Factory, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Calculator, 
  FileText, 
  Plus, 
  Minus, 
  ShieldCheck, 
  PackageCheck,
  Percent,
  Search,
  Phone,
  MessageSquare,
  User,
  Star,
  Check,
  X,
  CreditCard,
  Building,
  Zap,
  Tag
} from 'lucide-react';

// ==============================================================
// USER'S REAL WHOLESALE SELLERS & SUPPLIERS DATABASE (UP & DELHI HUBS)
// ==============================================================
const INITIAL_SUPPLIERS_DB = [
  {
    id: "SUP-UNN-02",
    name: "Unnao Agro & FMCG Processing Industries",
    type: "Manufacturer",
    location: "Industrial Area, Unnao, UP",
    phone: "+91 99999 9999",
    whatsapp: "91999999999",
    coords: [26.5393, 80.4878],
    rating: 4.8,
    accuracy: 0.98,
    leadTime: 3.5,
    catalog: [
      { item: "Wheat Flour (Aata)", category: "KIRANA", price: 27.5, unit: "kg", stock: 15000, minQty: 100 },
      { item: "Mustard Oil", category: "KIRANA", price: 128.0, unit: "Liters", stock: 8000, minQty: 50 },
      { item: "Refined Soyabean Oil", category: "KIRANA", price: 115.0, unit: "Liters", stock: 10000, minQty: 50 },
      { item: "Dettol Bath Soap (Carton of 144 pcs)", category: "SABUN_HYGIENE", price: 3600.0, unit: "Carton", stock: 500, minQty: 1 },
      { item: "Surf Excel Easy Wash (10kg Sack)", category: "SABUN_HYGIENE", price: 850.0, unit: "Sack", stock: 1200, minQty: 5 }
    ],
    reviews: [
      { reviewer: "Ramesh Sharma", shop: "Sharma Kirana Store", location: "Kanpur", rating: 5, date: "18 Aug 2026", comment: "Fast 3-hour express delivery! Aata quality is top grade and rate is ₹27.50." },
      { reviewer: "Vijay Kumar", shop: "Kumar Supermandi", location: "Unnao", rating: 5, date: "15 Aug 2026", comment: "Best bulk manufacturer in UP. Sealed factory condition." }
    ]
  },
  {
    id: "SUP-KNP-01",
    name: "Kanpur Central Mandi Wholesale",
    type: "Wholesaler",
    location: "Nayaganj, Kanpur, UP",
    phone: "+91 98765 4321",
    whatsapp: "91987654321",
    coords: [26.4600, 80.3400],
    rating: 4.6,
    accuracy: 0.96,
    leadTime: 1.5,
    catalog: [
      { item: "Wheat Flour (Aata)", category: "KIRANA", price: 32.0, unit: "kg", stock: 5000, minQty: 50 },
      { item: "Mustard Oil", category: "KIRANA", price: 140.0, unit: "Liters", stock: 2000, minQty: 20 },
      { item: "Basmati Rice (Premium)", category: "KIRANA", price: 65.0, unit: "kg", stock: 3000, minQty: 25 },
      { item: "Sugar (Chini)", category: "KIRANA", price: 38.0, unit: "kg", stock: 4000, minQty: 50 }
    ],
    reviews: [
      { reviewer: "Deepak Agarwal", shop: "Agarwal General Store", location: "Kanpur", rating: 5, date: "20 Aug 2026", comment: "Super fast 1.5 hour delivery in Kanpur!" }
    ]
  },
  {
    id: "SUP-SRT-05",
    name: "Surat Textile Mills & Garment Wholesalers",
    type: "Manufacturer",
    location: "Surat / Kanpur Wholesale Hub",
    phone: "+91 97777 8888",
    whatsapp: "91977778888",
    coords: [26.4500, 80.3200],
    rating: 4.85,
    accuracy: 0.97,
    leadTime: 2.5,
    catalog: [
      { item: "Men's Cotton T-Shirts (Lot of 50 pcs)", category: "APPAREL_CLOTHES", price: 6250.0, unit: "Lot", stock: 300, minQty: 1 },
      { item: "Surat Printed & Silk Sarees (Lot of 20 sarees)", category: "APPAREL_CLOTHES", price: 5600.0, unit: "Lot", stock: 400, minQty: 1 },
      { item: "Men's Denim Jeans (Carton of 25 pairs)", category: "APPAREL_CLOTHES", price: 9375.0, unit: "Carton", stock: 150, minQty: 1 }
    ],
    reviews: [
      { reviewer: "Kavita Sethi", shop: "Sethi Fashion", location: "Kanpur", rating: 5, date: "19 Aug 2026", comment: "Sarees lot was amazing quality! High margin." }
    ]
  },
  {
    id: "SUP-DLH-06",
    name: "Delhi Sadar Bazaar Electronics Hub",
    type: "Distributor",
    location: "Delhi / Kanpur Express Line",
    phone: "+91 96666 5555",
    whatsapp: "91966665555",
    coords: [26.4800, 80.3500],
    rating: 4.9,
    accuracy: 0.99,
    leadTime: 1.0,
    catalog: [
      { item: "20W Type-C Fast Chargers (Box of 20 pcs)", category: "ELECTRONICS", price: 2400.0, unit: "Box", stock: 400, minQty: 1 },
      { item: "9W LED Bulbs (Box of 100 bulbs)", category: "ELECTRONICS", price: 2800.0, unit: "Box", stock: 900, minQty: 1 }
    ],
    reviews: [
      { reviewer: "Vikas Saxena", shop: "Saxena Mobile Care", location: "Kanpur", rating: 5, date: "21 Aug 2026", comment: "Fast Chargers box @ ₹120/pc is unbeatable!" }
    ]
  }
];

export default function B2BProcurementPortal({ onExit }) {
  const [suppliersDB] = useState(INITIAL_SUPPLIERS_DB);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeNav, setActiveNav] = useState("HOME");

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  
  // Auth & Profile Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("LOGIN");
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [loginUsername, setLoginUsername] = useState("guptakirana");
  const [loginPassword, setLoginPassword] = useState("******");

  // Merchant Profile & Address
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [merchantProfile, setMerchantProfile] = useState({
    merchantName: "Shri Gupta",
    shopName: "Gupta Kirana & General Store",
    category: "Kirana / Grocery Shop Owner",
    gstin: "09ABCDE1234F1Z5",
    phone: "+91 99999 9999",
    whatsapp: "+91 99999 9999",
    streetAddress: "Plot 42, Main Wholesale Mandi Road",
    houseShopNo: "Shop No. 12-B",
    landmark: "Near Central Bank Branch",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pincode: "208011",
    isComplete: true
  });

  // Reviews Modal
  const [selectedSellerForReview, setSelectedSellerForReview] = useState(null);

  // Checkout State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI");

  // Tri-Objective Algorithm Filters
  const filteredResults = useMemo(() => {
    const queryLower = searchQuery.toLowerCase().trim();
    const matchedList = [];

    suppliersDB.forEach(supp => {
      supp.catalog.forEach(catItem => {
        const matchesCategory = selectedCategory === "ALL" || catItem.category === selectedCategory;
        const matchesSearch = !queryLower || catItem.item.toLowerCase().includes(queryLower);

        if (matchesCategory && matchesSearch) {
          const dist = Math.max(Math.round((26.4499 - supp.coords[0]) * 100 * 10) / 10, 5.0);
          const speedKmh = 45;
          const etaHours = Math.round((supp.leadTime + (dist / speedKmh)) * 10) / 10;

          matchedList.push({
            sellerId: supp.id,
            sellerName: supp.name,
            sellerType: supp.type,
            location: supp.location,
            phone: supp.phone,
            whatsapp: supp.whatsapp,
            rating: supp.rating,
            reviews: supp.reviews || [],
            distanceKm: dist,
            etaHours,
            item: catItem.item,
            category: catItem.category,
            wholesalePrice: catItem.price,
            unit: catItem.unit,
            stock: catItem.stock,
            minQty: catItem.minQty
          });
        }
      });
    });

    if (matchedList.length === 0) return [];

    const priceMap = {};
    const etaMap = {};

    matchedList.forEach(m => {
      if (!priceMap[m.item] || m.wholesalePrice < priceMap[m.item]) priceMap[m.item] = m.wholesalePrice;
      if (!etaMap[m.item] || m.etaHours < etaMap[m.item]) etaMap[m.item] = m.etaHours;
    });

    return matchedList.map(item => ({
      ...item,
      isCheapest: item.wholesalePrice === priceMap[item.item],
      isFastest: item.etaHours === etaMap[item.item]
    })).sort((a, b) => a.wholesalePrice - b.wholesalePrice);
  }, [searchQuery, selectedCategory, suppliersDB]);

  // Cart Operations
  const addToCart = (sellerItem, reqQty) => {
    const qtyToAdd = Number(reqQty) || sellerItem.minQty;
    const existingIndex = cart.findIndex(
      c => c.sellerId === sellerItem.sellerId && c.item === sellerItem.item
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].qty += qtyToAdd;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...sellerItem, qty: qtyToAdd }]);
    }
    setIsCartOpen(true);
  };

  const cartSubtotal = cart.reduce((sum, i) => sum + (i.wholesalePrice * i.qty), 0);
  const cartLogistics = cart.length > 0 ? Math.round(350 + (cartSubtotal * 0.03)) : 0;
  const cartTax = Math.round(cartSubtotal * 0.05);
  const cartTotal = cartSubtotal + cartLogistics + cartTax;

  // Load Kanpur Kirana 500kg Demo (from User's Original Codebase)
  const loadKanpurDemo = () => {
    setSelectedCategory("ALL");
    setSearchQuery("Wheat Flour (Aata)");
    const unnaoFlour = suppliersDB[0].catalog[0];
    const kanpurOil = suppliersDB[1].catalog[1];

    setCart([
      {
        sellerId: suppliersDB[0].id,
        sellerName: suppliersDB[0].name,
        location: suppliersDB[0].location,
        phone: suppliersDB[0].phone,
        whatsapp: suppliersDB[0].whatsapp,
        item: unnaoFlour.item,
        wholesalePrice: unnaoFlour.price,
        unit: unnaoFlour.unit,
        qty: 500,
        distanceKm: 22.4,
        etaHours: 3.9
      },
      {
        sellerId: suppliersDB[1].id,
        sellerName: suppliersDB[1].name,
        location: suppliersDB[1].location,
        phone: suppliersDB[1].phone,
        whatsapp: suppliersDB[1].whatsapp,
        item: kanpurOil.item,
        wholesalePrice: kanpurOil.price,
        unit: kanpurOil.unit,
        qty: 200,
        distanceKm: 5.0,
        etaHours: 1.6
      }
    ]);
    setIsCartOpen(true);
  };

  const placeOrder = () => {
    const orderId = `ORD-KNP-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      orderId,
      items: [...cart],
      totalPaid: cartTotal,
      paymentMethod: selectedPaymentMethod,
      deliveryEta: Math.min(...cart.map(c => c.etaHours || 2.5))
    });
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* ============================================================== */}
      {/* TOP STICKY PORTFOLIO RETURN & GITHUB HEADER */}
      {/* ============================================================== */}
      <div className="sticky top-0 z-50 bg-[#0f172a] text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-700 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black transition-all cursor-pointer border border-slate-700 hover:border-slate-500"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Return to Portfolio</span>
          </button>
          
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-black tracking-wider uppercase text-white hidden sm:inline">
              B2B Wholesale Mandi — Direct Merchant Procurement Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-slate-300 hidden md:inline">
            Original Full-Stack Project • MERN MVC Architecture
          </span>
          <a
            href="https://github.com/nischay237/b2b-merchant-procurement-platform"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-purple-900/30"
          >
            <span>GitHub Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* B2B MANDI BRANDED NAVBAR */}
      {/* ============================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-12 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-6 md:gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveNav("HOME")}
              className={`transition-colors py-1 ${activeNav === "HOME" ? "font-black text-slate-900 border-b-2 border-slate-900" : "text-slate-500 hover:text-slate-800"}`}
            >
              Wholesale Home
            </button>
            <button
              onClick={() => { setActiveNav("SERVICES"); setIsCatalogModalOpen(true); }}
              className={`transition-colors py-1 ${activeNav === "SERVICES" ? "font-black text-slate-900 border-b-2 border-slate-900" : "text-slate-500 hover:text-slate-800"}`}
            >
              Catalog & Search
            </button>
            <button
              onClick={loadKanpurDemo}
              className="text-[#FF7A59] font-black hover:text-[#e06344] transition-colors py-1"
            >
              ⚡ 500kg Demo
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all border border-slate-200"
            >
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span>{merchantProfile.shopName}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF7A59] text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* SECTION 1: HERO SERVICES GRID */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Box: Wholesale Services Cards */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#FF7A59] uppercase tracking-wider mb-2">
                <Factory className="w-4 h-4" />
                <span>Zero Middleman Procurement Network</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                Wholesale Sourcing for Retailers
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Kirana & FMCG</h4>
                  <p className="text-slate-500 leading-relaxed">Aata, Rice, Oil, Sugar & Pulses in bulk.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Sabun & Hygiene</h4>
                  <p className="text-slate-500 leading-relaxed">Bath Soaps, Surf & Vim Bar cartons.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Apparel Lots</h4>
                  <p className="text-slate-500 leading-relaxed">Surat Sarees, T-Shirts & Jeans lots.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Electronics</h4>
                  <p className="text-slate-500 leading-relaxed">Delhi Chargers, Bulbs & Accessories.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Hardware & Pipes</h4>
                  <p className="text-slate-500 leading-relaxed">PVC Pipes, Brass Taps & Screws.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Stationery</h4>
                  <p className="text-slate-500 leading-relaxed">Classmate Registers & Pen Boxes.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setIsCatalogModalOpen(true)}
                className="bg-[#FF7A59] hover:bg-[#e06344] text-white font-black px-8 py-3.5 rounded-full text-xs tracking-wider uppercase transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH WHOLESALE CATALOG</span>
              </button>
              <button
                onClick={loadKanpurDemo}
                className="bg-[#FCD385] hover:bg-[#f6c66a] text-slate-900 font-black px-6 py-3.5 rounded-full text-xs uppercase transition-all shadow-sm cursor-pointer"
              >
                ⚡ Kanpur 500kg Demo
              </button>
            </div>
          </div>

          {/* Right Box: Hero Metrics & Direct Support */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <div className="h-60 bg-gradient-to-br from-purple-900 to-indigo-950 p-6 flex flex-col justify-between text-white relative">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[11px] font-black tracking-wider uppercase border border-white/20">
                  Direct Mill Connection
                </span>
                <span className="text-emerald-400 font-black text-xs flex items-center gap-1">
                  ● Verified GST Mills
                </span>
              </div>

              <div>
                <div className="text-4xl font-black text-white">15%–20%</div>
                <p className="text-xs text-purple-200 font-bold mt-1">Average profit margin saved per bulk order</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold pt-3 border-t border-white/15">
                <div>
                  <span className="text-slate-400 block text-[10px]">DISPATCH</span>
                  <span>48h Direct Mill</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">FREIGHT</span>
                  <span>Haversine Matrix</span>
                </div>
              </div>
            </div>

            <div className="bg-[#4ECDC4] p-8 text-center text-slate-950 flex-1 flex flex-col items-center justify-center">
              <h3 className="text-xl font-black tracking-tight mb-1 text-slate-900">Direct Wholesale Hotline</h3>
              <a href="tel:+91999999999" className="text-3xl font-black tracking-wider hover:underline text-slate-950">
                +91 99999 9999
              </a>
              <span className="text-xs font-bold text-slate-800 mt-2">
                Kanpur • Unnao • Surat • Delhi Mandi Network
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: TEAL HOW IT WORKS BANNER */}
      {/* ============================================================== */}
      <section className="bg-[#4ECDC4] text-slate-950 py-12 px-6 my-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">The Easiest Way to Source Wholesale Products</h2>
          <p className="text-slate-900 text-sm max-w-2xl mx-auto font-bold leading-relaxed">
            Search items, compare wholesale rates across verified manufacturers, calculate lowest landed cost, and get express delivery straight to your retail store.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white text-[#FF7A59] rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                🔍
              </div>
              <span className="text-xs font-black tracking-wide text-slate-900">1. Search Items</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white text-[#FF7A59] rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                🏷️
              </div>
              <span className="text-xs font-black tracking-wide text-slate-900">2. Compare Rates</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                🟢
              </div>
              <span className="text-xs font-black tracking-wide text-slate-900">3. Sabse Sasta</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white text-purple-600 rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                🚚
              </div>
              <span className="text-xs font-black tracking-wide text-slate-900">4. Express Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: TRI-OBJECTIVE PRODUCT CATALOG */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Live Wholesale Catalog</h3>
            <p className="text-xs text-slate-500 font-bold">
              Comparing manufacturers based on Landed Cost, Delivery ETA, and Verified Ratings
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["ALL", "KIRANA", "SABUN_HYGIENE", "APPAREL_CLOTHES", "ELECTRONICS"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#4ECDC4] text-slate-950 shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((seller, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
