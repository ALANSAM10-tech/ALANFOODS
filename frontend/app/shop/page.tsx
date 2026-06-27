"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Product interfaces
interface Variant {
  weight: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  category: "NUTS" | "SPICES" | "DRY_FRUITS";
  categoryLabel: string;
  description: string;
  image_url: string;
  rating: number;
  origin: string;
  variants: Variant[];
}

const mockProducts: Product[] = [
  {
    id: "whole-malabar-pepper",
    name: "Whole Malabar Pepper",
    category: "SPICES",
    categoryLabel: "Aromatic Spices",
    description: "Ethically sourced whole black peppercorns from Wayanad, Kerala, rich in volatile oils.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
    rating: 4.9,
    origin: "Kerala, India",
    variants: [
      { weight: "250g", price: 250 },
      { weight: "500g", price: 480 },
      { weight: "1kg", price: 900 }
    ]
  },
  {
    id: "green-cardamom",
    name: "Green Cardamom Pods",
    category: "SPICES",
    categoryLabel: "Aromatic Spices",
    description: "Vibrant green cardamom pods from the Cardamom Hills in Idukki, Kerala. Intense floral aroma.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE",
    rating: 4.8,
    origin: "Kerala, India",
    variants: [
      { weight: "250g", price: 650 },
      { weight: "500g", price: 1200 },
      { weight: "1kg", price: 2300 }
    ]
  },
  {
    id: "roasted-almonds",
    name: "Premium Roasted Almonds",
    category: "NUTS",
    categoryLabel: "Premium Nuts",
    description: "California grade-A almonds, dry-roasted and lightly salted to preserve absolute crunch.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    rating: 4.7,
    origin: "California, USA",
    variants: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 650 },
      { weight: "1kg", price: 1200 }
    ]
  },
  {
    id: "king-cashews",
    name: "Artisanal Cashew Nuts",
    category: "NUTS",
    categoryLabel: "Premium Nuts",
    description: "Premium large W180 size cashews, buttery, rich, and raw. Perfect for baking or healthy snacking.",
    image_url: "https://lh3.googleusercontent.com/aida/AP1WRLsF4OpWDZ19gsKGTbeyKyoKwcMoDljzPa2EngO4cq2TgxrB7Ek2dQuyNr0D9gHqPWIUhc6SFj_0ueOS_tAHmmILwunxeoGr6pmyl_PgH10cVSmBqJVGTaQIhudLLHNZJSOf8AoEvVV3IrlVM_TuSKQ6-LNjJ3gfJEo1iJ56MsulJRwl0Fr9RBlWJCo44SpL3vVjpgDWyUCwFKf9YpauBJGGySUXBsyS2RnabzH4Zx1bPXxe3PKCtcfp",
    rating: 4.9,
    origin: "Goa, India",
    variants: [
      { weight: "250g", price: 380 },
      { weight: "500g", price: 720 },
      { weight: "1kg", price: 1350 }
    ]
  },
  {
    id: "sun-dried-apricots",
    name: "Mediterranean Sun-Dried Apricots",
    category: "DRY_FRUITS",
    categoryLabel: "Dried Fruits",
    description: "Naturally sun-dried sweet apricots packed with vitamins and loaded with fiber.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB",
    rating: 4.6,
    origin: "Malatya, Turkey",
    variants: [
      { weight: "250g", price: 280 },
      { weight: "500g", price: 520 },
      { weight: "1kg", price: 980 }
    ]
  },
  {
    id: "medjool-dates",
    name: "Premium Medjool Dates",
    category: "DRY_FRUITS",
    categoryLabel: "Dried Fruits",
    description: "Plump, organic Medjool dates with a rich, caramel-like texture and sweet natural flavor.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    rating: 4.9,
    origin: "Jordan Valley",
    variants: [
      { weight: "250g", price: 450 },
      { weight: "500g", price: 850 },
      { weight: "1kg", price: 1600 }
    ]
  }

];

const categoryBanners = {
  ALL: {
    title: "The Pantry of Purity",
    description: "Sourced directly from organic farms, processed with heritage craftsmanship.",
    bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDihUBiL_3h0A8EXy8hYKinLfov81g4QoPRMHo2FRnMw00DDylFQ8cppTVmTJLEPQACHPQaf0agM2ndfIGJBFq5n1Jif8ldh6toda_NAAZBsWnYOlet5w7z8Szfj0Oou1eJz_dBN64EU9wvDlVq_Wd0eDpvExi6j2ElJHlbXFV7sS9OCMeWcF4wD7yPQPcuhw89sal1LfaaNquhxwNdb4xDqcv9kb6w5sQoLoKmuYtvGqsAnt9A_DFYADWDEOyliz-6WoNx5067"
  },
  NUTS: {
    title: "Premium Nuts Collection",
    description: "Crunchy, nutrient-dense almonds, cashews, and walnuts for daily energy.",
    bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u"
  },
  SPICES: {
    title: "Aromatic Spices Collection",
    description: "Ethically harvested whole black pepper, cardamom, and heritage blends.",
    bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE"
  },
  DRY_FRUITS: {
    title: "Dried Fruits Collection",
    description: "Sweet, vitamin-rich sun-dried apricots, dates, and raisins.",
    bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB"
  }
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam || "ALL";

  // State
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<string>("default");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Track weight selection per product
  const [selectedWeights, setSelectedWeights] = useState<{ [productId: string]: string }>({});

  useEffect(() => {
    const saved = localStorage.getItem("mock_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => setProducts(parsed), 0);
    }
  }, []);

  const banner = categoryBanners[selectedCategory as keyof typeof categoryBanners] || categoryBanners.ALL;

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = selectedCategory === "ALL" || product.category === selectedCategory;
    // Search match
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    // Price match (checks current selected weight's price)
    const currentWeight = selectedWeights[product.id] || "250g";
    const currentVariant = product.variants.find((v) => v.weight === currentWeight) || product.variants[0];
    const priceMatch = currentVariant.price <= priceRange;

    return categoryMatch && searchMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = (a.variants.find(v => v.weight === (selectedWeights[a.id] || "250g")) || a.variants[0]).price;
    const bPrice = (b.variants.find(v => v.weight === (selectedWeights[b.id] || "250g")) || b.variants[0]).price;

    if (sortBy === "price-low") return aPrice - bPrice;
    if (sortBy === "price-high") return bPrice - aPrice;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // default
  });

  const handleWeightChange = (productId: string, weight: string) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  return (
    <>
      <Navbar cartCount={0} />

      <main className="pt-24 pb-xl max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Banner Section */}
        <section className="relative rounded-xl overflow-hidden mb-lg h-[180px] md:h-[300px] flex items-center shadow-md">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url('${banner.bg}')` }}
            ></div>
            <div className="absolute inset-0 bg-black/45"></div>
          </div>
          <div className="relative z-10 p-lg max-w-xl text-white">
            <h1 className="font-serif text-[24px] md:text-[48px] leading-tight font-bold mb-xs">{banner.title}</h1>
            <p className="font-sans text-body-md opacity-90 leading-relaxed">{banner.description}</p>
          </div>
        </section>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-lg">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-xs bg-surface-container-low border border-outline-variant/20 rounded-xl px-md py-sm font-sans text-label-md text-on-surface font-semibold w-full"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              {showFilters ? "Hide Filters" : "Filters & Categories"}
            </button>
          </div>
          {/* Sidebar Filters */}
          <aside className={`space-y-lg bg-surface-container-low p-md rounded-2xl border border-outline-variant/10 h-fit lg:block ${showFilters ? 'block' : 'hidden'}`}>
            {/* Search Input (Mobile/Tablet) */}
            <div className="lg:hidden">
              <h3 className="font-sans text-label-md uppercase font-bold text-on-surface mb-sm">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant/40 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  search
                </span>
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="font-sans text-label-md uppercase font-bold text-on-surface mb-sm tracking-wide">
                Categories
              </h3>
              <div className="flex flex-col gap-xs">
                {["ALL", "NUTS", "SPICES", "DRY_FRUITS"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      if (cat === "ALL") {
                        params.delete("category");
                      } else {
                        params.set("category", cat);
                      }
                      router.push(`/shop?${params.toString()}`);
                    }}
                    className={`text-left px-sm py-2 rounded-lg font-sans text-body-md transition-all font-medium ${
                      selectedCategory === cat
                        ? "bg-primary text-white font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    {cat === "ALL"
                      ? "Shop All"
                      : cat === "NUTS"
                      ? "Premium Nuts"
                      : cat === "SPICES"
                      ? "Aromatic Spices"
                      : "Dried Fruits"}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-sans text-label-md uppercase font-bold text-on-surface mb-sm tracking-wide">
                Max Price: ₹{priceRange}
              </h3>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary bg-outline-variant/30 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between font-sans text-[11px] text-on-surface-variant mt-xs font-semibold">
                <span>₹100</span>
                <span>₹3000</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-md">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-sm rounded-xl border border-outline-variant/10 shadow-sm gap-sm">
              {/* Search Bar (Desktop) */}
              <div className="relative w-full sm:w-64 hidden lg:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-outline-variant/40 bg-surface-container-low text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-on-surface font-medium"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  search
                </span>
              </div>

              {/* Count / Sorting */}
              <div className="flex justify-between items-center w-full sm:w-auto gap-md">
                <span className="font-sans text-body-md text-on-surface-variant font-medium">
                  Showing {sortedProducts.length} results
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-outline-variant/40 rounded-lg py-1 px-sm bg-white font-sans text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold"
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: Top Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-xl bg-white rounded-2xl border border-outline-variant/10 shadow-sm space-y-md">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant">search_off</span>
                <h3 className="font-serif text-headline-md font-bold text-on-surface">No products found</h3>
                <p className="font-sans text-body-md text-on-surface-variant max-w-sm mx-auto">
                  Try adjusting your search criteria, price range, or category filter settings.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {sortedProducts.map((product) => {
                  const currentWeight = selectedWeights[product.id] || "250g";
                  const currentVariant = product.variants.find((v) => v.weight === currentWeight) || product.variants[0];

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      {/* Product Image */}
                      <Link href={`/shop/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-container-low">
                        <Image
                          fill
                          src={product.image_url}
                          alt={product.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-sm left-sm bg-white/95 backdrop-blur-sm px-xs py-base rounded text-[10px] uppercase font-bold tracking-wider text-secondary border border-secondary/15">
                          {product.origin}
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="p-md flex-1 flex flex-col justify-between space-y-md">
                        <div className="space-y-xs">
                          <span className="font-sans text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                            {product.categoryLabel}
                          </span>
                          <Link href={`/shop/${product.id}`}>
                            <h3 className="font-serif text-headline-md font-bold text-on-surface hover:text-primary transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="font-sans text-body-md text-on-surface-variant line-clamp-2 text-xs leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Ratings & Price */}
                        <div className="space-y-sm">
                          <div className="flex justify-between items-center">
                            <span className="font-serif text-headline-md font-bold text-primary">
                              ₹{currentVariant.price}
                            </span>
                            <div className="flex items-center gap-xs font-sans text-body-md font-bold text-on-surface">
                              <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                star
                              </span>
                              {product.rating}
                            </div>
                          </div>

                          {/* Weight Tier Selector */}
                          <div className="flex gap-xs">
                            {product.variants.map((v) => (
                              <button
                                key={v.weight}
                                onClick={() => handleWeightChange(product.id, v.weight)}
                                className={`flex-1 py-1 text-center font-sans text-xs rounded border transition-all font-semibold ${
                                  currentWeight === v.weight
                                    ? "bg-secondary text-white border-secondary"
                                    : "border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
                                }`}
                              >
                                {v.weight}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add to Cart */}
                        <button className="w-full bg-primary-container text-on-primary-container py-2 rounded-lg font-sans text-label-md font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-screen flex items-center justify-center font-serif text-headline-md">
        Loading Alan Foods Pantry...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
