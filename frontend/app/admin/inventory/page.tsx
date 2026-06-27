"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Variant {
  weight: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: "NUTS" | "SPICES" | "DRY_FRUITS";
  categoryLabel: string;
  description: string;
  image_url: string;
  origin: string;
  variants: Variant[];
}

const initialProducts: Product[] = [
  {
    id: "whole-malabar-pepper",
    name: "Whole Malabar Pepper",
    category: "SPICES",
    categoryLabel: "Aromatic Spices",
    description: "Ethically sourced whole black peppercorns from Wayanad, Kerala, rich in volatile oils. Sourced directly from our farmer cooperatives, sun-dried to perfection, and packaged airtight to lock in the spicy, woody aroma that has defined Malabar pepper for centuries.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
    origin: "Wayanad, Kerala, India",
    variants: [
      { weight: "250g", price: 8.99, stock: 120 },
      { weight: "500g", price: 15.99, stock: 85 },
      { weight: "1kg", price: 28.99, stock: 40 }
    ]
  },
  {
    id: "green-cardamom",
    name: "Green Cardamom Pods",
    category: "SPICES",
    categoryLabel: "Aromatic Spices",
    description: "Vibrant green cardamom pods from the Cardamom Hills in Idukki, Kerala. Intense floral aroma. Handpicked at the perfect maturity level, sorted by size, and dried carefully to retain their bright green color and sweet-spicy volatile oils.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE",
    origin: "Idukki, Kerala, India",
    variants: [
      { weight: "250g", price: 12.99, stock: 4 },
      { weight: "500g", price: 22.99, stock: 12 },
      { weight: "1kg", price: 42.99, stock: 0 }
    ]
  },
  {
    id: "roasted-almonds",
    name: "Premium Roasted Almonds",
    category: "NUTS",
    categoryLabel: "Premium Nuts",
    description: "California grade-A almonds, dry-roasted and lightly salted to preserve absolute crunch. High in protein, vitamin E, and healthy fats, these nuts are a great energy-boosting snack.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    origin: "California, USA",
    variants: [
      { weight: "250g", price: 9.99, stock: 240 },
      { weight: "500g", price: 17.99, stock: 110 },
      { weight: "1kg", price: 32.99, stock: 95 }
    ]
  },
  {
    id: "king-cashews",
    name: "Artisanal Cashew Nuts",
    category: "NUTS",
    categoryLabel: "Premium Nuts",
    description: "Premium large W180 size cashews, buttery, rich, and raw. Handpicked and minimally processed to preserve their natural sweetness, smooth texture, and nutrient value.",
    image_url: "https://lh3.googleusercontent.com/aida/AP1WRLsF4OpWDZ19gsKGTbeyKyoKwcMoDljzPa2EngO4cq2TgxrB7Ek2dQuyNr0D9gHqPWIUhc6SFj_0ueOS_tAHmmILwunxeoGr6pmyl_PgH10cVSmBqJVGTaQIhudLLHNZJSOf8AoEvVV3IrlVM_TuSKQ6-LNjJ3gfJEo1iJ56MsulJRwl0Fr9RBlWJCo44SpL3vVjpgDWyUCwFKf9YpauBJGGySUXBsyS2RnabzH4Zx1bPXxe3PKCtcfp",
    origin: "Goa, India",
    variants: [
      { weight: "250g", price: 10.99, stock: 150 },
      { weight: "500g", price: 19.99, stock: 90 },
      { weight: "1kg", price: 36.99, stock: 45 }
    ]
  },
  {
    id: "sun-dried-apricots",
    name: "Mediterranean Sun-Dried Apricots",
    category: "DRY_FRUITS",
    categoryLabel: "Dried Fruits",
    description: "Naturally sun-dried sweet apricots packed with vitamins and loaded with fiber. These apricots retain their soft, chewy texture and deep orange glow without sulfur dioxide treatments.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB",
    origin: "Malatya, Turkey",
    variants: [
      { weight: "250g", price: 7.99, stock: 180 },
      { weight: "500g", price: 14.99, stock: 95 },
      { weight: "1kg", price: 26.99, stock: 30 }
    ]
  },
  {
    id: "medjool-dates",
    name: "Premium Medjool Dates",
    category: "DRY_FRUITS",
    categoryLabel: "Dried Fruits",
    description: "Plump, organic Medjool dates with a rich, caramel-like texture and sweet natural flavor. Sourced from organic palm groves, hand-sorted for quality, and kept cool to maintain their soft, juicy pulp.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    origin: "Jordan Valley",
    variants: [
      { weight: "250g", price: 11.99, stock: 140 },
      { weight: "500g", price: 21.99, stock: 75 },
      { weight: "1kg", price: 39.99, stock: 25 }
    ]
  }
];

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<"NUTS" | "SPICES" | "DRY_FRUITS">("NUTS");
  const [formDescription, setFormDescription] = useState("");
  const [formOrigin, setFormOrigin] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formPrice250, setFormPrice250] = useState(0);
  const [formStock250, setFormStock250] = useState(0);
  const [formPrice500, setFormPrice500] = useState(0);
  const [formStock500, setFormStock500] = useState(0);
  const [formPrice1kg, setFormPrice1kg] = useState(0);
  const [formStock1kg, setFormStock1kg] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mock_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => setProducts(parsed), 0);
    } else {
      setTimeout(() => setProducts(initialProducts), 0);
      localStorage.setItem("mock_products", JSON.stringify(initialProducts));
    }
  }, []);

  // Persist helper
  const updateProductsList = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("mock_products", JSON.stringify(newProducts));
  };

  // Statistics
  const totalSKUs = products.length;
  const outOfStockItems = products.filter(p => p.variants.some(v => v.stock === 0)).length;
  const lowStockItems = products.filter(p => p.variants.some(v => v.stock > 0 && v.stock <= 10)).length;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("NUTS");
    setFormDescription("");
    setFormOrigin("");
    setFormImageUrl("");
    setFormPrice250(9.99);
    setFormStock250(100);
    setFormPrice500(18.99);
    setFormStock500(50);
    setFormPrice1kg(35.99);
    setFormStock1kg(20);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormDescription(p.description);
    setFormOrigin(p.origin);
    setFormImageUrl(p.image_url);

    const v250 = p.variants.find(v => v.weight === "250g") || { price: 0, stock: 0 };
    const v500 = p.variants.find(v => v.weight === "500g") || { price: 0, stock: 0 };
    const v1kg = p.variants.find(v => v.weight === "1kg") || { price: 0, stock: 0 };

    setFormPrice250(v250.price);
    setFormStock250(v250.stock);
    setFormPrice500(v500.price);
    setFormStock500(v500.stock);
    setFormPrice1kg(v1kg.price);
    setFormStock1kg(v1kg.stock);

    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      updateProductsList(products.filter(p => p.id !== id));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabels = {
      NUTS: "Premium Nuts",
      SPICES: "Aromatic Spices",
      DRY_FRUITS: "Dried Fruits"
    };

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formName,
      category: formCategory,
      categoryLabel: categoryLabels[formCategory],
      description: formDescription,
      origin: formOrigin,
      image_url: formImageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
      variants: [
        { weight: "250g", price: Number(formPrice250), stock: Number(formStock250) },
        { weight: "500g", price: Number(formPrice500), stock: Number(formStock500) },
        { weight: "1kg", price: Number(formPrice1kg), stock: Number(formStock1kg) }
      ]
    };

    if (editingProduct) {
      updateProductsList(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      updateProductsList([newProduct, ...products]);
    }
    
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-outline-variant/20 flex flex-col h-screen shrink-0 shadow-sm">
        <div className="p-md border-b border-outline-variant/15">
          <Link href="/" className="font-serif text-headline-md font-bold text-primary tracking-tight block">
            ALAN FOODS
          </Link>
          <span className="font-sans text-[11px] uppercase font-bold text-on-surface-variant tracking-wider">
            Admin Portal
          </span>
        </div>
        <nav className="flex-1 mt-md px-sm space-y-1">
          <div className="flex items-center px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-sans text-label-md font-bold">
            <span className="material-symbols-outlined mr-3">inventory_2</span>
            Inventory
          </div>
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-xl font-sans text-label-md font-bold"
          >
            <span className="material-symbols-outlined mr-3">arrow_back</span>
            Back to Store
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-lg">
        {/* Header */}
        <header className="flex justify-between items-center mb-lg">
          <div>
            <h1 className="font-serif text-[32px] font-bold text-on-surface">Inventory Management</h1>
            <p className="font-sans text-body-md text-on-surface-variant">Manage stock levels, weights, and product details.</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-primary text-white font-sans text-label-md font-bold px-lg py-3 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Product
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
          <div className="bg-white p-md rounded-2xl border border-outline-variant/15 shadow-sm flex items-center gap-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">format_list_bulleted</span>
            </div>
            <div>
              <span className="block font-sans text-xs uppercase font-bold text-on-surface-variant">Total products</span>
              <span className="font-serif text-headline-lg font-bold text-on-surface">{totalSKUs}</span>
            </div>
          </div>
          <div className="bg-white p-md rounded-2xl border border-outline-variant/15 shadow-sm flex items-center gap-md">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <div>
              <span className="block font-sans text-xs uppercase font-bold text-on-surface-variant">Low Stock items</span>
              <span className="font-serif text-headline-lg font-bold text-on-surface">{lowStockItems}</span>
            </div>
          </div>
          <div className="bg-white p-md rounded-2xl border border-outline-variant/15 shadow-sm flex items-center gap-md">
            <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
              <span className="material-symbols-outlined text-[28px]">cancel</span>
            </div>
            <div>
              <span className="block font-sans text-xs uppercase font-bold text-on-surface-variant">Out of Stock</span>
              <span className="font-serif text-headline-lg font-bold text-on-surface">{outOfStockItems}</span>
            </div>
          </div>
        </section>

        {/* Table Filters */}
        <section className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
          <div className="p-md border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between gap-sm bg-surface-container-low/30">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-outline-variant/40 text-xs focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-outline-variant/40 rounded-xl py-2 px-md bg-white font-sans text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-bold"
            >
              <option value="ALL">Filter: All Categories</option>
              <option value="NUTS">Nuts</option>
              <option value="SPICES">Spices</option>
              <option value="DRY_FRUITS">Dry Fruits</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-body-md">
              <thead>
                <tr className="bg-surface-container-low/50 text-on-surface-variant font-bold text-xs uppercase border-b border-outline-variant/10">
                  <th className="p-md">Product</th>
                  <th className="p-md">Category</th>
                  <th className="p-md">Origin</th>
                  <th className="p-md">Price / Stock by weight</th>
                  <th className="p-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-md flex items-center gap-sm">
                      <Image width={48} height={48} src={p.image_url} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-outline-variant/10 bg-surface-container-low" />
                      <div>
                        <span className="font-bold text-on-surface block text-sm">{p.name}</span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-bold">{p.id}</span>
                      </div>
                    </td>
                    <td className="p-md">
                      <span className="px-sm py-1 bg-surface-container rounded-full text-xs font-bold text-on-surface-variant">
                        {p.categoryLabel}
                      </span>
                    </td>
                    <td className="p-md text-sm font-medium text-on-surface-variant">{p.origin}</td>
                    <td className="p-md">
                      <div className="space-y-1">
                        {p.variants.map((v) => (
                          <div key={v.weight} className="flex gap-sm text-xs items-center font-medium">
                            <span className="w-8 font-bold text-on-surface">{v.weight}:</span>
                            <span className="w-16 text-primary font-bold">${v.price.toFixed(2)}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                v.stock === 0
                                  ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                  : v.stock <= 10
                                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                  : "bg-secondary/10 text-secondary border border-secondary/20"
                              }`}
                            >
                              {v.stock === 0 ? "Out of Stock" : `${v.stock} units`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-md text-right">
                      <div className="flex gap-xs justify-end">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 hover:bg-surface-container rounded-lg text-secondary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-surface-container rounded-lg text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-sm animate-in fade-in duration-250">
          <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-xl max-w-2xl w-full p-lg overflow-y-auto max-h-[90vh] space-y-lg animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-sm">
              <h2 className="font-serif text-headline-lg font-bold text-on-surface">
                {editingProduct ? `Edit: ${editingProduct.name}` : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-md">
              <div className="grid grid-cols-2 gap-sm">
                <div className="space-y-xs">
                  <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary text-sm font-sans"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as "NUTS" | "SPICES" | "DRY_FRUITS")}
                    className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary text-sm font-sans"
                  >
                    <option value="NUTS">Nuts</option>
                    <option value="SPICES">Spices</option>
                    <option value="DRY_FRUITS">Dry Fruits</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="space-y-xs">
                  <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">Origin</label>
                  <input
                    type="text"
                    required
                    value={formOrigin}
                    onChange={(e) => setFormOrigin(e.target.value)}
                    className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary text-sm font-sans"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">Cover Image URL</label>
                  <input
                    type="url"
                    required
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 text-sm font-sans focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-xs">
                <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary text-sm font-sans resize-none"
                />
              </div>

              {/* Weight tier setups */}
              <div className="border-t border-outline-variant/10 pt-md space-y-md">
                <h4 className="font-sans text-xs uppercase font-bold text-on-surface tracking-wider">
                  Weight Pricing &amp; Stock Levels
                </h4>

                <div className="grid grid-cols-3 gap-sm items-center">
                  <span className="font-sans text-sm font-bold text-on-surface-variant">250g tier</span>
                  <div className="space-y-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formPrice250}
                      onChange={(e) => setFormPrice250(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="text-[10px] uppercase font-bold text-on-surface-variant">Stock units</label>
                    <input
                      type="number"
                      required
                      value={formStock250}
                      onChange={(e) => setFormStock250(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-sm items-center">
                  <span className="font-sans text-sm font-bold text-on-surface-variant">500g tier</span>
                  <div className="space-y-xs">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formPrice500}
                      onChange={(e) => setFormPrice500(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                  <div className="space-y-xs">
                    <input
                      type="number"
                      required
                      value={formStock500}
                      onChange={(e) => setFormStock500(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-sm items-center">
                  <span className="font-sans text-sm font-bold text-on-surface-variant">1kg tier</span>
                  <div className="space-y-xs">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formPrice1kg}
                      onChange={(e) => setFormPrice1kg(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                  <div className="space-y-xs">
                    <input
                      type="number"
                      required
                      value={formStock1kg}
                      onChange={(e) => setFormStock1kg(Number(e.target.value))}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-1.5 focus:ring-1 focus:ring-primary text-xs font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="border-t border-outline-variant/10 pt-md flex justify-end gap-sm">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-lg py-2.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container font-sans text-label-md font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-lg py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md font-sans text-label-md font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
