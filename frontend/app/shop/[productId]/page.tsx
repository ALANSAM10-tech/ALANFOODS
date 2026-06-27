"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  sourcingInfo?: string;
  nutritionalInfo?: string;
}

const mockProducts: Product[] = [
  {
    id: "whole-malabar-pepper",
    name: "Whole Malabar Pepper",
    category: "SPICES",
    categoryLabel: "Aromatic Spices",
    description: "Ethically sourced whole black peppercorns from Wayanad, Kerala, rich in volatile oils. Sourced directly from our farmer cooperatives, sun-dried to perfection, and packaged airtight to lock in the spicy, woody aroma that has defined Malabar pepper for centuries.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
    rating: 4.9,
    origin: "Wayanad, Kerala, India",
    sourcingInfo: "Our Malabar Pepper is harvested by hand in Wayanad, Kerala. The vines are grown alongside coffee and cardamom, creating a bio-diverse ecosystem that yields peppercorns of unmatched purity.",
    nutritionalInfo: "100% Whole Black Pepper. Free from chemical pesticides and fillers. Volatile oil content > 3.5%.",
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
    description: "Vibrant green cardamom pods from the Cardamom Hills in Idukki, Kerala. Intense floral aroma. Handpicked at the perfect maturity level, sorted by size, and dried carefully to retain their bright green color and sweet-spicy volatile oils.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE",
    rating: 4.8,
    origin: "Idukki, Kerala, India",
    sourcingInfo: "Grown in shaded forest canopies in Idukki, Kerala. We work with local smallholders who employ age-old sorting methods to select only Grade-A pods (8mm+ size).",
    nutritionalInfo: "100% Pure Green Cardamom Pods. No artificial coloring or preservatives.",
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
    description: "California grade-A almonds, dry-roasted and lightly salted to preserve absolute crunch. High in protein, vitamin E, and healthy fats, these nuts are a great energy-boosting snack.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    rating: 4.7,
    origin: "California, USA",
    sourcingInfo: "Sourced from family-run almond orchards in California's Central Valley, committed to water-efficient agricultural practices.",
    nutritionalInfo: "Almonds, Sea Salt. Contains nuts. Protein: 6g per 28g serving.",
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
    description: "Premium large W180 size cashews, buttery, rich, and raw. Handpicked and minimally processed to preserve their natural sweetness, smooth texture, and nutrient value.",
    image_url: "https://lh3.googleusercontent.com/aida/AP1WRLsF4OpWDZ19gsKGTbeyKyoKwcMoDljzPa2EngO4cq2TgxrB7Ek2dQuyNr0D9gHqPWIUhc6SFj_0ueOS_tAHmmILwunxeoGr6pmyl_PgH10cVSmBqJVGTaQIhudLLHNZJSOf8AoEvVV3IrlVM_TuSKQ6-LNjJ3gfJEo1iJ56MsulJRwl0Fr9RBlWJCo44SpL3vVjpgDWyUCwFKf9YpauBJGGySUXBsyS2RnabzH4Zx1bPXxe3PKCtcfp",
    rating: 4.9,
    origin: "Goa, India",
    sourcingInfo: "Grown along the Goan coastline in fertile sandy soil. Processed in local, employee-owned co-ops that handle the shelling and drying manually.",
    nutritionalInfo: "100% Raw Cashew Nuts (Grade W180). Contains nuts.",
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
    description: "Naturally sun-dried sweet apricots packed with vitamins and loaded with fiber. These apricots retain their soft, chewy texture and deep orange glow without sulfur dioxide treatments.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB",
    rating: 4.6,
    origin: "Malatya, Turkey",
    sourcingInfo: "Harvested in the mountain orchards of Malatya, Turkey, globally renowned for growing the sweetest and plumpest apricots.",
    nutritionalInfo: "100% Sun-Dried Apricots. Unsulfured, preservative-free.",
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
    description: "Plump, organic Medjool dates with a rich, caramel-like texture and sweet natural flavor. Sourced from organic palm groves, hand-sorted for quality, and kept cool to maintain their soft, juicy pulp.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u",
    rating: 4.9,
    origin: "Jordan Valley",
    sourcingInfo: "Cultivated in pesticide-free, sustainably irrigated organic farms along the Jordan Valley basin.",
    nutritionalInfo: "100% Organic Medjool Dates. Energy: 66 kcal per date. High in potassium and dietary fiber.",
    variants: [
      { weight: "250g", price: 450 },
      { weight: "500g", price: 850 },
      { weight: "1kg", price: 1600 }
    ]
  }
];


export default function ProductDetailPage() {
  const { productId } = useParams();
  
  // States
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "source" | "nutri">("desc");
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mock_products");
    const db: Product[] = saved ? JSON.parse(saved) : mockProducts;
    const found = db.find((p: Product) => p.id === productId);
    if (found) {
      setTimeout(() => {
        setProduct(found);
        setSelectedWeight(found.variants[0]?.weight || "");
      }, 0);
    }
  }, [productId]);


  if (!product) {
    return (
      <>
        <Navbar cartCount={0} />
        <main className="pt-32 pb-xl max-w-[1280px] mx-auto px-margin-mobile text-center">
          <h2 className="font-serif text-headline-lg font-bold text-on-surface">Product Not Found</h2>
          <p className="font-sans text-body-md text-on-surface-variant mt-sm mb-md">
            The product you are looking for does not exist in our catalog.
          </p>
          <Link href="/shop" className="bg-primary text-white px-lg py-sm rounded-lg font-sans text-label-md">
            Back to Pantry
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const selectedVariant = product.variants.find((v) => v.weight === selectedWeight) || product.variants[0];

  const handleAddToCart = () => {
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
    }, 3000);
  };

  return (
    <>
      <Navbar cartCount={addedAlert ? quantity : 0} />

      <main className="pt-28 pb-xl">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Breadcrumbs */}
          <nav className="flex gap-xs mb-lg font-sans text-label-sm text-on-surface-variant font-semibold">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">
              {product.categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-on-surface">{product.name}</span>
          </nav>

          {/* Alert Notification */}
          {addedAlert && (
            <div className="mb-md p-md bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-sm shadow-sm animate-in fade-in duration-200 border border-secondary/15">
              <span className="material-symbols-outlined font-bold">check_circle</span>
              <p className="font-sans text-label-md font-semibold">
                Success! Added {quantity} x {product.name} ({selectedWeight}) to your cart.
              </p>
            </div>
          )}

          {/* Gallery + Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-lg lg:gap-xl items-start mb-xl">
            {/* Gallery */}
            <div className="space-y-md">
              <div className="bg-white rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-lg shadow-sm border border-outline-variant/10 relative">
                <Image
                  fill
                  className="object-cover rounded-xl"
                  src={product.image_url}
                  alt={product.name}
                />
                <div className="absolute top-md left-md bg-white/95 backdrop-blur-sm px-sm py-xs rounded-lg text-xs uppercase font-bold tracking-wider text-secondary border border-secondary/10">
                  {product.origin}
                </div>
              </div>
            </div>

            {/* Info details */}
            <div className="space-y-lg">
              <div className="space-y-xs">
                <span className="font-sans text-label-sm uppercase tracking-widest text-primary font-bold">
                  {product.categoryLabel}
                </span>
                <h1 className="font-serif text-[36px] md:text-[44px] leading-tight text-on-surface font-bold">
                  {product.name}
                </h1>
                <div className="flex items-center gap-sm">
                  <div className="flex items-center gap-xs font-sans text-body-md font-bold text-on-surface bg-surface-container/40 px-xs py-base rounded-md">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      star
                    </span>
                    {product.rating}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
                  <span className="font-sans text-body-md text-on-surface-variant font-medium">Traceable Origin</span>
                </div>
              </div>

              {/* Price */}
              <div className="border-y border-outline-variant/10 py-md flex items-center justify-between">
                <span className="font-serif text-[32px] font-bold text-primary">
                  ₹{(selectedVariant.price * quantity).toFixed(2)}
                </span>
                <span className="font-sans text-body-md text-on-surface-variant font-medium">
                  Unit Price: ₹{selectedVariant.price.toFixed(2)}
                </span>
              </div>

              {/* Weight selection */}
              <div className="space-y-xs">
                <h3 className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wide">
                  Select Weight Tier
                </h3>
                <div className="flex gap-sm">
                  {product.variants.map((v) => (
                    <button
                      key={v.weight}
                      onClick={() => setSelectedWeight(v.weight)}
                      className={`flex-1 py-3 text-center font-sans text-body-md rounded-xl border-2 transition-all font-bold ${
                        selectedWeight === v.weight
                          ? "bg-secondary text-white border-secondary shadow-sm"
                          : "border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-lg">
                <div className="space-y-xs">
                  <h3 className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wide">
                    Quantity
                  </h3>
                  <div className="flex items-center border border-outline-variant/40 rounded-xl overflow-hidden bg-white max-w-[140px] shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-surface-container text-on-surface-variant font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-sans text-body-md text-on-surface font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-surface-container text-on-surface-variant font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-sans text-label-md font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Description Tabs */}
          <section className="bg-white rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex border-b border-outline-variant/10 bg-surface-container-low/50">
              <button
                onClick={() => setActiveTab("desc")}
                className={`flex-1 py-4 text-center font-sans text-label-md font-bold border-b-2 transition-all ${
                  activeTab === "desc"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("source")}
                className={`flex-1 py-4 text-center font-sans text-label-md font-bold border-b-2 transition-all ${
                  activeTab === "source"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Sourcing & Purity
              </button>
              <button
                onClick={() => setActiveTab("nutri")}
                className={`flex-1 py-4 text-center font-sans text-label-md font-bold border-b-2 transition-all ${
                  activeTab === "nutri"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Nutritional Info
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-lg min-h-[150px]">
              {activeTab === "desc" && (
                <div className="space-y-sm">
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
              {activeTab === "source" && (
                <div className="space-y-sm">
                  <h3 className="font-serif text-headline-md font-bold text-on-surface">The Source Story</h3>
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    {product.sourcingInfo}
                  </p>
                </div>
              )}
              {activeTab === "nutri" && (
                <div className="space-y-sm">
                  <h3 className="font-serif text-headline-md font-bold text-on-surface">Nutritional Analysis</h3>
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    {product.nutritionalInfo}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
