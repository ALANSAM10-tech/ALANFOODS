"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  items: string[];
}

function AccountContent() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  // State
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Read from localStorage
    const saved = localStorage.getItem("mock_orders");
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      // Default initial orders
      const initialOrders: Order[] = [
        {
          id: "ORD-928134",
          date: "06/20/2026",
          total: "34.97",
          status: "Delivered",
          items: ["1 x Premium Roasted Almonds (500g)", "1 x Green Cardamom Pods (250g)"]
        }
      ];
      localStorage.setItem("mock_orders", JSON.stringify(initialOrders));
      setOrders(initialOrders);
    }
  }, []);

  return (
    <>
      <Navbar cartCount={0} />

      <main className="pt-28 pb-xl max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-lg p-lg bg-secondary-container text-on-secondary-container rounded-2xl flex flex-col md:flex-row justify-between items-center gap-md shadow-md animate-in fade-in slide-in-from-top-4 duration-300 border border-secondary/15">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[32px] text-secondary font-bold">verified</span>
              <div>
                <h3 className="font-serif text-headline-md font-bold text-on-surface">Order Placed Successfully!</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Thank you for shopping with ALAN FOODS. Your payment has been confirmed, and a Zoho Invoice is being synced.
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="bg-secondary text-white px-lg py-sm rounded-lg font-sans text-label-md font-bold hover:brightness-110 active:scale-95 shadow-sm text-center whitespace-nowrap"
            >
              Continue Sourcing
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
          {/* User Profile Info */}
          <div className="lg:col-span-4 bg-white p-lg rounded-2xl border border-outline-variant/10 shadow-sm space-y-md">
            <div className="flex items-center gap-md pb-md border-b border-outline-variant/10">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif text-[28px] font-bold border border-primary/20">
                A
              </div>
              <div>
                <h2 className="font-serif text-headline-md font-bold text-on-surface">Alan Mathew</h2>
                <p className="font-sans text-xs text-on-surface-variant font-medium">alan.mathew@gmail.com</p>
              </div>
            </div>
            
            <div className="space-y-sm font-sans text-body-md">
              <div className="flex justify-between font-semibold">
                <span className="text-on-surface-variant">Membership</span>
                <span className="text-secondary uppercase">Gold Tier</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-on-surface-variant">Total Orders</span>
                <span className="text-on-surface">{orders.length}</span>
              </div>
            </div>

            <div className="pt-md border-t border-outline-variant/10">
              <Link
                href="/admin/inventory"
                className="w-full flex items-center justify-center gap-xs border border-primary text-primary hover:bg-primary hover:text-white py-2 rounded-lg font-sans text-label-md font-bold transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                Go to Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-8 space-y-lg">
            <h2 className="font-serif text-headline-lg font-bold text-on-surface">Order History</h2>

            {orders.length === 0 ? (
              <div className="text-center py-xl bg-white rounded-2xl border border-outline-variant/10 shadow-sm">
                <p className="font-sans text-body-md text-on-surface-variant">No orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-md">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-lg rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-md"
                  >
                    <div className="space-y-sm">
                      <div className="flex flex-wrap items-center gap-sm">
                        <span className="font-sans text-label-md font-bold text-on-surface uppercase bg-surface-container/60 px-sm py-1 rounded-md">
                          {order.id}
                        </span>
                        <span className="font-sans text-xs text-on-surface-variant font-medium">
                          Placed on: {order.date}
                        </span>
                        <span
                          className={`font-sans text-xs px-sm py-1 rounded-full font-bold border ${
                            order.status === "Paid" || order.status === "Delivered"
                              ? "bg-secondary/10 text-secondary border-secondary/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-xs font-sans text-body-md text-on-surface-variant font-medium pl-xs border-l-2 border-outline-variant/35">
                        {order.items.map((item, idx) => (
                          <div key={idx}>{item}</div>
                        ))}
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between items-end min-w-[120px]">
                      <div className="space-y-xs">
                        <span className="block font-sans text-xs uppercase font-bold text-on-surface-variant">
                          Total Amount
                        </span>
                        <span className="font-serif text-headline-md font-bold text-primary block">
                          ${order.total}
                        </span>
                      </div>

                      <button className="text-secondary font-sans text-xs hover:underline flex items-center gap-xs font-bold mt-md md:mt-0">
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        Download Zoho Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-screen flex items-center justify-center font-serif text-headline-md">
        Loading Account Dashboard...
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
