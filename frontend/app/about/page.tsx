import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar cartCount={0} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2vUuan7pexZWqIgS5conzCD4TR9BUC_x5c_HR1ggw2cUFDWxHkRvcx-al6vMtLk5C5ftqfcDgOVevrkE4BZzYGlkUj3tQYjKnlJVNKAA5BLOgJn4G4xpRQXVynOMXaRZsCAv6enoZ_wkYuTtAbfy5ycvHeLpmgUtarvUxWQqxY1DIHHFyLMzM-40H0l4pinkkYrIh0E5_-M1OaH1DKOt32p7HjWORWXbotr4R4dXwT0Na1By7voggvOcYCyPEVBDuAE8Znf62')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center px-margin-mobile">
            <span className="font-sans text-label-md text-white tracking-[0.2em] uppercase mb-base block font-semibold">
              Our Heritage
            </span>
            <h1 className="font-serif text-display-lg md:text-[64px] text-white max-w-4xl mx-auto leading-tight italic font-bold">
              The ALAN FOODS Story
            </h1>
          </div>
        </section>

        {/* Editorial Content 01 */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-xl grid grid-cols-1 md:grid-cols-12 gap-lg items-center">
          <div className="md:col-span-5 space-y-md order-2 md:order-1">
            <div className="w-12 h-[2px] bg-primary"></div>
            <h2 className="font-serif text-headline-lg text-on-surface font-bold">Purity in Every Bite</h2>
            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
              At ALAN FOODS, we believe that great food starts with exceptional ingredients. What began as a passion for quality has grown into a commitment to bringing the finest dry fruits, nuts, and spices directly to your kitchen.
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              We bypass the middlemen to ensure that every almond, every raisin, and every pinch of spice meets our rigorous standards for freshness and flavor. Whether you&apos;re snacking for health or cooking a family feast, ALAN FOODS is your trusted partner in culinary excellence.
            </p>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="aspect-[4/5] md:aspect-[16/10] bg-white p-sm shadow-xl relative overflow-hidden rounded-xl border border-outline-variant/10">
              <img
                className="w-full h-full object-cover rounded-lg"
                alt="Traditional cooking spices prep"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUhHQ5FyqkJlViX7WVmcZNnjq9eqJbuyvv51gTUWinnxwDHipogdFQSu6H2R0r_jKbFTVFk_Ys_vPy8uU2ZooqYvyMX2iF7mMu28CcShL0JlSZ1cziKptK4WZpctDyTmdZnVqr7ZPOdzw47YfPNRPOb4x3999BmjogMPpHGqDyyl91VdKo6ZnmjsasgFnO_qbCEKwjs5_2GT8FZZ1O0omGpiO7jtnVKKZqjvHyGjR2vzHPhqjDOCJgBqdBEIajHRKX1uK85KWS"
              />
              <div className="absolute bottom-md left-md bg-white/90 backdrop-blur-sm p-base px-sm rounded shadow-sm border border-outline-variant/20">
                <span className="font-sans text-label-sm text-primary font-bold">TRADITIONAL METHODS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Feature */}
        <section className="bg-surface-container-low py-xl border-y border-outline-variant/10">
          <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
            <div className="text-center mb-lg">
              <h2 className="font-serif text-headline-lg text-on-surface mb-xs font-bold">Our Pillars of Excellence</h2>
              <p className="font-sans text-body-md text-on-surface-variant max-w-xl mx-auto">
                Meticulously sourced, scientifically tested, and curated for the gourmet palate.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
              {/* Bento Card 1 */}
              <div className="md:col-span-2 md:row-span-2 bg-white group overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl aspect-[4/3] md:aspect-auto md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Organic Orchards"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd8mphqGBpr5rJuZZiHAYsLAZOHlDLT7vj-uNa50llpww1IQlg9ePr7YdayfHp02ejmIM6aTTVfGd9k7U4hPCuXKikVRLHuW_ApIHHP0pWPPcFzWLHNS6OuWdpCy26imsXF4836zt0I_qsAWbqFmovANfji7o4PPNl7yvSWErn2-6Abdee2GhfbbUus9NCPTv6EGZGeavuBD2Otl5vQKwu_BdzOzHIvckn7bHcG8gzH5W803SZc2_EKaOKCT8ZbwWBkkhxcEmn"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-lg z-10">
                  <h3 className="font-serif text-headline-md text-white mb-xs font-bold">Direct Sourcing</h3>
                  <p className="font-sans text-body-md text-white/80 max-w-sm">
                    We skip the middlemen to work directly with generational farmers, ensuring fair trade and peak freshness.
                  </p>
                </div>
              </div>
              {/* Bento Card 2 */}
              <div className="md:col-span-2 bg-white flex flex-col md:flex-row shadow-sm rounded-2xl overflow-hidden border border-outline-variant/10">
                <div className="flex-1 p-lg flex flex-col justify-center space-y-sm">
                  <span className="material-symbols-outlined text-secondary text-[32px]">verified</span>
                  <h3 className="font-serif text-headline-md text-on-surface font-bold">Quality Lab</h3>
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    Every batch undergoes rigorous 5-step purity testing for toxins and moisture.
                  </p>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden aspect-video md:aspect-auto">
                  <img
                    className="w-full h-full object-cover"
                    alt="Quality checking"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCXGtZApNB3gpQIBVNsh18ixSD03mHHdNCkbNhPWkgVNHXTBlYvH7KWIQaEW8oCPJixW0y0UGzGPTRw2gO1zJtmgSQvWEmMqeYRYXpY-bgKpJOMPSQvCS4BKDo9NdX9YuYgEb7rfTzPWqchwEDy2cg5TWAMghHXVQXIWzr-3KwXO6UlWnFM2YqcRvTx8Dmbas2lb7WA9deRBKb4AsKalyQg0tMM4EUF5oTr736Jkhu9d9tanQV_4qnWQZBRxDMdbmKIewm82Mi"
                  />
                </div>
              </div>
              {/* Bento Card 3 */}
              <div className="bg-primary text-on-primary p-lg flex flex-col justify-center items-center text-center rounded-2xl min-h-[200px]">
                <span className="material-symbols-outlined text-[48px] mb-sm">eco</span>
                <h4 className="font-sans text-label-md uppercase tracking-wider font-bold">100% Organic</h4>
                <p className="font-sans text-body-md mt-xs opacity-90">Certified by international standards for chemical-free farming.</p>
              </div>
              {/* Bento Card 4 */}
              <div className="bg-secondary text-on-secondary p-lg flex flex-col justify-center items-center text-center rounded-2xl min-h-[200px]">
                <span className="material-symbols-outlined text-[48px] mb-sm">local_shipping</span>
                <h4 className="font-sans text-label-md uppercase tracking-wider font-bold">Farm to Door</h4>
                <p className="font-sans text-body-md mt-xs opacity-90">Reduced storage time means higher nutrient density and flavor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-[1000px] mx-auto text-center">
          <span className="material-symbols-outlined text-primary text-[40px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            format_quote
          </span>
          <blockquote className="font-serif text-display-lg text-on-surface italic mt-sm mb-lg leading-tight font-bold">
            &quot;Our mission is to return to the essence of food. No additives, no compromises—just the pure, vibrant energy of the earth.&quot;
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-sm border-2 border-primary-container/30">
              <img
                className="w-full h-full object-cover"
                alt="ALAN MATHEW Founder"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG-U3eOFeutvNgOZIENspZuyAEBvIQENwRlgo07kmhCGDZ5Wvv5BJKQrq3LSenYNjoHpNX5SvJRxJXlWcAu3Qoc4JNymadBCfqZjoZ_sbxeknVaz1WuleK5nKbeHjwm4EKLExjuXbuwMufx_gOR2IoZoq8G1HhDaKEhAxVXBLjzXlzKKX2H3a6jeuKpXLPNJBJwI00Pol6SgSsbQ2TRKYo-jtscXkaB6rHSgok2Q6l450w1AJ7cQIyKrPk_NKXlZgcRFdMRSW6"
              />
            </div>
            <p className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wide">ALAN MATHEW</p>
            <p className="font-sans text-body-md text-on-surface-variant italic font-medium">Founder &amp; CEO</p>
          </div>
        </section>

        {/* Origin Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-xl border-t border-outline-variant/15">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="order-2 md:order-1">
              <img
                className="w-full rounded-xl shadow-lg border border-outline-variant/10"
                alt="Kerala Spice Route Map"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMlknCfib-fNDfJDIq6-9nGQF2mSvMgch6V4I02UpK9vNcVX6bYDvSoBAy65OZ0oZEtCe5nAafgQ5c9KtgIUi1vvJlz39ZByu-xMQR_-cyRsMbTuGOPUhlPKZMkcxluGzqIKpQUN4e8lqSvfSxypykBc-6dECufkaxh3pkv_NNuBOO5lLl0B0HcVY0eJFmvUyS19xR5Tw1tl4PVa2LEEe493PMw95cREsfNh2S_kf_LwZ5PmAyx5jpRApN62cehsR0n4JeR4g8"
              />
            </div>
            <div className="space-y-md order-1 md:order-2">
              <h2 className="font-serif text-headline-lg text-on-surface font-bold">Sourced from Kerala</h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
                Our heart lies in the spice capital of the world. By maintaining local hubs in Wayanad and Idukki, we ensure our black pepper and cardamom never lose their volatile oils—the very essence of their flavor.
              </p>
              <div className="flex gap-md pt-sm">
                <div className="flex flex-col">
                  <span className="font-serif text-headline-lg text-primary font-bold">24+</span>
                  <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Farmer Cooperatives
                  </span>
                </div>
                <div className="w-[1px] bg-outline-variant/30 h-12"></div>
                <div className="flex flex-col">
                  <span className="font-serif text-headline-lg text-primary font-bold">100%</span>
                  <span className="font-sans text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Traceable Origin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
