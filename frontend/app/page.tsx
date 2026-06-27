import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar cartCount={0} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden hero-pattern">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-lg items-center py-md md:py-xl">
            <div className="z-10 order-2 md:order-1">
              <div className="inline-block px-sm py-xs bg-secondary-container text-on-secondary-container font-sans text-label-sm rounded-full mb-md uppercase tracking-wider font-semibold">
                AUTHENTIC &amp; ORGANIC
              </div>
              <h1 className="font-serif text-[32px] md:text-[48px] leading-[38px] md:leading-[56px] tracking-[-0.02em] text-on-surface mb-md">
                Nature’s Best, <br />Delivered to Your <span className="text-primary">Table.</span>
              </h1>
              <p className="font-sans text-body-lg text-on-surface-variant mb-lg max-w-lg leading-relaxed">
                Premium dry fruits, crunchy nuts, and authentic spices sourced for purity and flavor. Welcome to ALAN FOODS.
              </p>
              <div className="flex flex-wrap gap-md">
                <Link
                  href="/shop"
                  className="bg-primary-container text-on-primary-container px-lg py-sm font-sans text-label-md rounded-lg hover:brightness-110 transition-all shadow-md active:scale-95 text-center"
                >
                  Shop the Collection
                </Link>
                <Link
                  href="/about"
                  className="border border-secondary text-secondary px-lg py-sm font-sans text-label-md rounded-lg hover:bg-secondary hover:text-white transition-all active:scale-95 text-center"
                >
                  Explore Story
                </Link>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary opacity-5 rounded-full blur-3xl"></div>
              <div className="relative w-full aspect-square bg-white rounded-2xl shadow-xl overflow-hidden p-gutter">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  alt="Alan Foods spices selection"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb"
                />
                <div className="absolute bottom-gutter right-gutter bg-white/90 backdrop-blur-md p-md rounded-xl shadow-lg flex items-center gap-sm">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: '"FILL" 1' }}>
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-label-md text-on-surface">100% Organic</p>
                    <p className="text-[12px] text-on-surface-variant font-medium">Certified Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-surface py-lg border-y border-outline-variant/10">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="flex flex-col items-center text-center p-md bg-surface-container-low rounded-xl transition-transform hover:-translate-y-1 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-md text-secondary">
                  <span className="material-symbols-outlined text-[32px]">eco</span>
                </div>
                <h3 className="font-serif text-headline-md mb-xs font-bold text-on-surface">100% Natural</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  No artificial preservatives. Just pure, wholesome goodness.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-md bg-surface-container-low rounded-xl transition-transform hover:-translate-y-1 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-md text-primary">
                  <span className="material-symbols-outlined text-[32px]">verified_user</span>
                </div>
                <h3 className="font-serif text-headline-md mb-xs font-bold text-on-surface">Premium Sourcing</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Handpicked directly from top-tier farms and estates.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-md bg-surface-container-low rounded-xl transition-transform hover:-translate-y-1 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-md text-secondary">
                  <span className="material-symbols-outlined text-[32px]">temp_preferences_custom</span>
                </div>
                <h3 className="font-serif text-headline-md mb-xs font-bold text-on-surface">Freshness Guaranteed</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Sealed at the peak of freshness to preserve aroma, crunch, and nutritional value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-xl bg-white">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-md">
              <div>
                <h2 className="font-serif text-headline-lg text-on-surface mb-xs font-bold">Explore Our Pantry</h2>
                <p className="font-sans text-body-md text-on-surface-variant">The finest selection of earth&apos;s treasures, curated for your kitchen.</p>
              </div>
              <Link href="/shop" className="text-primary font-sans text-label-md hover:underline underline-offset-8 font-semibold">
                View All Categories →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Category 1 */}
              <Link href="/shop?category=SPICES" className="group relative overflow-hidden rounded-2xl aspect-[3/2] md:aspect-[4/5] shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Aromatic Spices"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArS_fSeDPFtvjAXmzbgzJNzEieftqb9C-i8uiUy51N4BX8Xtj4VqG1i3TSrG5vjUy-7NqrSrC9A--611uKjB-y6uM-wYrIIdE99qLpvSqDH3kfWqQev0CFI7NKBekQIkKf5icnSocsvWdNegxIp2YF14ZD30VyXX6aw4PVtd_Vsl-fcN5U87qUmPgZ4OMYEG8Gkf9HbqFLva8h4FLembldYMdyyoVDqOqnZfcJUbDSmNBlNr3A-BIRxn-3ZHJ33juSQMotqjdlapE"
                />
                <div className="absolute bottom-0 left-0 p-lg z-20 w-full">
                  <p className="text-white/80 font-sans text-label-sm uppercase tracking-widest mb-xs font-semibold">Heritage Blends</p>
                  <h3 className="text-white font-serif text-headline-lg mb-md font-bold">Discover Authentic Spices</h3>
                  <div className="flex items-center gap-xs text-white font-sans text-label-md opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    Shop Whole Spices <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </Link>
              {/* Category 2 */}
              <Link href="/shop?category=DRY_FRUITS" className="group relative overflow-hidden rounded-2xl aspect-[3/2] md:aspect-[4/5] shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Dried Fruits"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8w50Uh6StssQNUiIC93hweY20ih9LA62D957Zbu56Zv7ZfIemyLEs-yyj-fo9dW9ULfWjTk1KrstJpwMVkFEZbW-d2HvHCZcpPS2_gvffSGBr0wkc1dVQ_6hFXP2r59rwe74RcWkzllBz-6yPFw9XXieixhW8HmvWWmyVwAGO509h6BMZEAa3f3Hffe4dyiGoh-2WmUosxET7SeuF7vKGXcK6gFyxX95_GH7XeZtCwf_kaTQnLqsAcg42lL-I-uRPdftAosbB"
                />
                <div className="absolute bottom-0 left-0 p-lg z-20 w-full">
                  <p className="text-white/80 font-sans text-label-sm uppercase tracking-widest mb-xs font-semibold">Sun-Dried Purity</p>
                  <h3 className="text-white font-serif text-headline-lg mb-md font-bold">Explore Dry Fruits</h3>
                  <div className="flex items-center gap-xs text-white font-sans text-label-md opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    Shop Fruits <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </Link>
              {/* Category 3 */}
              <Link href="/shop?category=NUTS" className="group relative overflow-hidden rounded-2xl aspect-[3/2] md:aspect-[4/5] shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Premium Nuts"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi1RI2BThysC0dJfCYLn6u7i-LHLKQv6877RwoYAgeSE7gbC_D_keLjhssHoOqurYKAtm0Ysgj53vpfVlHl5HCDmTUXeiVyuz50ahbE8lW0b4htzx28aIUF2IyPEWqZKWhcTwBrMRGaZpG8vcudCyU5bJ9LDAM91kj-ygWGO_oUdBaFoe4YPPses8XHxpPKVCRw-FsX_yd8B4xSEtQ3bB7E4XBQpQKmXRGHk9ssMlnz2T1oKyuPqWudDF47a305g2Sth6rAE6u"
                />
                <div className="absolute bottom-0 left-0 p-lg z-20 w-full">
                  <p className="text-white/80 font-sans text-label-sm uppercase tracking-widest mb-xs font-semibold">Hand-Selected</p>
                  <h3 className="text-white font-serif text-headline-lg mb-md font-bold">Shop Premium Nuts</h3>
                  <div className="flex items-center gap-xs text-white font-sans text-label-md opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    Shop Nuts <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter / Social Proof */}
        <section className="py-xl bg-surface-container-high border-y border-outline-variant/20">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto text-center">
            <div className="inline-flex items-center gap-xs mb-md text-secondary justify-center">
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
            </div>
            <h2 className="font-serif text-headline-lg text-on-surface mb-md font-bold">Trusted by 10,000+ Families</h2>
            <p className="font-sans text-body-lg text-on-surface-variant mb-lg max-w-2xl mx-auto italic leading-relaxed">
              &quot;The quality of whole spices from ALAN FOODS is unmatched. These ground-ready pods and seeds make my kitchen smell like a spice market in Kerala every morning!&quot;
              <span className="block font-bold text-on-surface mt-sm not-italic font-sans text-body-md">— Aditi R., Executive Chef</span>
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-xs">
              <input
                className="flex-1 bg-white border border-outline-variant/40 rounded-lg px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-sans text-body-md text-on-surface"
                placeholder="Your Email Address"
                type="email"
              />
              <button className="bg-primary text-white px-lg py-sm font-sans text-label-md rounded-lg hover:brightness-110 shadow-sm active:scale-95 transition-all font-semibold whitespace-nowrap">
                Join Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
