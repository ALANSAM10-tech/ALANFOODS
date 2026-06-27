import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-xl pb-lg bg-surface-container-highest dark:bg-surface-container-lowest mt-auto border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
        <div className="col-span-1 md:col-span-1 mb-lg md:mb-0">
          <span className="font-serif text-headline-md text-primary dark:text-primary-container font-bold tracking-tight block mb-sm">
            ALAN FOODS
          </span>
          <p className="font-sans text-body-md text-on-surface-variant mb-md leading-relaxed">
            Bringing the finest organic products from the farm directly to your doorstep. Quality you can taste, purity you can trust.
          </p>
          <div className="flex gap-sm">
            <a
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">favorite</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wider mb-md">
            Quick Links
          </h4>
          <ul className="space-y-sm">
            <li>
              <Link
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="/shop"
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="/shop?category=GIFTS"
              >
                Gifts & Hampers
              </Link>
            </li>
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Sustainability
              </a>
            </li>
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Shipping Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wider mb-md">
            Customer Care
          </h4>
          <ul className="space-y-sm">
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Wholesale Queries
              </a>
            </li>
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="font-sans text-label-sm text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4"
                href="#"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-label-md text-on-surface font-bold uppercase tracking-wider mb-md">
            Visit Us
          </h4>
          <p className="font-sans text-body-md text-on-surface-variant mb-sm leading-relaxed">
            123 Organic Lane, Green Valley
            <br />
            Kerala, India 682001
          </p>
          <div className="p-sm bg-white rounded-lg shadow-sm border border-outline-variant/30">
            <span className="font-sans text-label-sm text-primary font-bold">
              Organic Certification:
            </span>
            <p className="text-[10px] text-on-surface-variant font-medium">Reg No: IND-ORG-011</p>
          </div>
        </div>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto mt-xl pt-md border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-md">
        <p className="font-sans text-label-sm text-on-surface-variant">
          © {new Date().getFullYear()} ALAN FOODS. Purity in every bite.
        </p>
        <div className="flex gap-md items-center grayscale opacity-50">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <span className="material-symbols-outlined text-[24px]">credit_card</span>
          <span className="material-symbols-outlined text-[24px]">wallet</span>
        </div>
      </div>
    </footer>
  );
}
