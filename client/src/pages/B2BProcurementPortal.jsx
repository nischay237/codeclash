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
