"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Cart Item interface
interface CartItem {
  id: string;
  name: string;
  categoryLabel: string;
  image_url: string;
  weight: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "whole-malabar-pepper-250g",
      name: "Whole Malabar Pepper",
      categoryLabel: "Aromatic Spices",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAshdTiRi-_UBhP-P8OMxRFOjHOuNXciAxdvzUd0NUw1rn93ecilcjqLzheMoN32l8jAthvHl2ESNhjmoE51r576Qz3jcxEZtUi9_y9uaG0ez2nSc0W7uJdnkaBz-OipwKG-66FaKLXPI71P3jSLmH5WF6ghVdXol1TLvny0lGzYLq37dBlHCzJ11Fur-eB7a0FgDUXeGTJulbSBE4gFR27WYFvAyE1F7EKoOYz3P8UjG5NN6XLsJ4P3cLezeZtbfYOJf7IdbIb",
      weight: "250g",
      price: 8.99,
      quantity: 2
    },
    {
      id: "king-cashews-500g",
      name: "Artisanal Cashew Nuts",
      categoryLabel: "Premium Nuts",
      image_url: "https://lh3.googleusercontent.com/aida/AP1WRLsF4OpWDZ19gsKGTbeyKyoKwcMoDljzPa2EngO4cq2TgxrB7Ek2dQuyNr0D9gHqPWIUhc6SFj_0ueOS_tAHmmILwunxeoGr6pmyl_PgH10cVSmBqJVGTaQIhudLLHNZJSOf8AoEvVV3IrlVM_TuSKQ6-LNjJ3gfJEo1iJ56MsulJRwl0Fr9RBlWJCo44SpL3vVjpgDWyUCwFKf9YpauBJGGySUXBsyS2RnabzH4Zx1bPXxe3PKCtcfp",
      weight: "500g",
      price: 19.99,
      quantity: 1
    }
  ]);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });
  
  const [paymentStep, setPaymentStep] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const updateQuantity = (itemId: string, val: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + val } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 35 ? 0 : subtotal === 0 ? 0 : 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentStep) {
      setPaymentStep(true);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // Save order to localStorage to mock backend retrieval on My Account page
        const newOrder = {
          id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toLocaleDateString(),
          total: total.toFixed(2),
          status: "Paid",
          items: cartItems.map(item => `${item.quantity} x ${item.name} (${item.weight})`)
        };
        const existingOrders = JSON.parse(localStorage.getItem("mock_orders") || "[]");
        localStorage.setItem("mock_orders", JSON.stringify([newOrder, ...existingOrders]));

        // Clear cart
        setCartItems([]);
        
        // Redirect to Account / Success page
        router.push("/account?success=true");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} />

      <main className="pt-28 pb-xl max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <h1 className="font-serif text-[36px] md:text-[44px] font-bold text-on-surface mb-lg">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-xl bg-white rounded-2xl border border-outline-variant/10 shadow-sm space-y-md">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant">shopping_cart_off</span>
            <h3 className="font-serif text-headline-md font-bold text-on-surface">Your cart is empty</h3>
            <p className="font-sans text-body-md text-on-surface-variant max-w-sm mx-auto">
              Add premium organic nuts and aromatic spices to your cart to begin shopping.
            </p>
            <Link href="/shop" className="inline-block bg-primary text-white px-lg py-sm rounded-lg font-sans text-label-md font-bold hover:brightness-110 active:scale-95 shadow-sm">
              Back to Pantry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7 space-y-md">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-md rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col sm:flex-row gap-md sm:items-center"
                >
                  {/* Image + Info */}
                  <div className="flex gap-md items-center flex-1 min-w-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-surface-container-low flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-sans text-[10px] uppercase font-bold text-on-surface-variant">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-serif text-headline-md font-bold text-on-surface truncate">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-on-surface-variant font-medium">
                        Weight: {item.weight} | Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Qty + Price row */}
                  <div className="flex items-center justify-between sm:justify-end gap-md">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-outline-variant/30 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-surface-container text-on-surface font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 font-sans text-xs text-on-surface font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-surface-container text-on-surface font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-serif text-headline-md font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout / Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-lg space-y-lg">
                <h2 className="font-serif text-headline-lg font-bold text-on-surface border-b border-outline-variant/10 pb-sm">
                  {paymentStep ? "Payment Details" : "Delivery Address"}
                </h2>

                <form onSubmit={handleCheckout} className="space-y-md">
                  {!paymentStep ? (
                    // Step 1: Shipping Form
                    <>
                      <div className="space-y-xs">
                        <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-sm">
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                      </div>
                      <div className="space-y-xs">
                        <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                          Shipping Address
                        </label>
                        <textarea
                          name="address"
                          required
                          rows={2}
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-sm">
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            required
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Step 2: Payment Form (Stripe/Razorpay Mock Input)
                    <>
                      <div className="p-sm bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-secondary">
                          SECURE STRIPE CHECKOUT
                        </span>
                        <div className="flex gap-xs grayscale opacity-60">
                          <span className="material-symbols-outlined text-[20px]">credit_card</span>
                        </div>
                      </div>
                      <div className="space-y-xs">
                        <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="4242 •••• •••• 4242"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-sm">
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM / YY"
                            required
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                        <div className="space-y-xs">
                          <label className="font-sans text-xs uppercase font-bold text-on-surface-variant">
                            CVC
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            placeholder="123"
                            required
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPaymentStep(false)}
                        className="text-primary font-sans text-xs hover:underline flex items-center gap-xs font-bold"
                      >
                        ← Edit Shipping Details
                      </button>
                    </>
                  )}

                  {/* Pricing Summary */}
                  <div className="bg-surface-container-low p-md rounded-xl space-y-sm font-sans text-body-md border border-outline-variant/10">
                    <div className="flex justify-between text-on-surface-variant font-medium">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant font-medium">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant font-medium">
                      <span>GST (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-on-surface font-bold border-t border-outline-variant/10 pt-sm">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary-container text-on-primary-container py-3.5 rounded-xl font-sans text-label-md font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-xs disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Processing Payment...</span>
                    ) : paymentStep ? (
                      <span>Pay & Complete Order</span>
                    ) : (
                      <span>Proceed to Payment</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
