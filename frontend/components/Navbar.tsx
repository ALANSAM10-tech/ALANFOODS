"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 shadow-sm bg-white/80 backdrop-blur-md dark:bg-surface-dim/80 h-20 border-b border-surface-container-high/50 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto h-full">
        {/* Logo */}
        <div className="flex items-center gap-md flex-shrink-0">
          <Link
            href="/"
            className="font-serif text-headline-md font-bold text-primary dark:text-primary-container tracking-tight whitespace-nowrap"
          >
            ALAN FOODS
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-gutter">
          <Link
            className="font-sans text-label-md text-on-surface hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary"
            href="/shop"
          >
            Shop All
          </Link>
          <Link
            className="font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="/shop?category=NUTS"
          >
            Nuts
          </Link>
          <Link
            className="font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="/shop?category=DRY_FRUITS"
          >
            Dry Fruits
          </Link>
          <Link
            className="font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="/shop?category=SPICES"
          >
            Whole Spices
          </Link>
          <Link
            className="font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="/about"
          >
            Our Story
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-sm">
          <button className="p-base text-on-surface-variant hover:text-primary transition-all duration-200">
            <span className="material-symbols-outlined">search</span>
          </button>
          
          <Link href="/account" className="p-base text-on-surface-variant hover:text-primary transition-all duration-200">
            <span className="material-symbols-outlined">person</span>
          </Link>

          <Link
            href="/cart"
            className="p-base text-on-surface-variant hover:text-primary transition-all duration-200 relative"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-base text-on-surface-variant hover:text-primary transition-all duration-200"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-surface-dim border-b border-surface-container-high shadow-lg px-margin-mobile py-md flex flex-col gap-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-label-md text-on-surface hover:text-primary py-2 border-b border-surface-container/50"
            href="/shop"
          >
            Shop All
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-label-md text-on-surface hover:text-primary py-2 border-b border-surface-container/50"
            href="/shop?category=NUTS"
          >
            Nuts
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-label-md text-on-surface hover:text-primary py-2 border-b border-surface-container/50"
            href="/shop?category=DRY_FRUITS"
          >
            Dry Fruits
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-label-md text-on-surface hover:text-primary py-2 border-b border-surface-container/50"
            href="/shop?category=SPICES"
          >
            Whole Spices
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-label-md text-on-surface hover:text-primary py-2"
            href="/about"
          >
            Our Story
          </Link>
        </div>
      )}
    </nav>
  );
}
