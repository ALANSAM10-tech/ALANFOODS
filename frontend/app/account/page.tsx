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

  // Profile state
  const [profile, setProfile] = useState({
    name: "Alan Mathew",
    email: "alan.mathew@gmail.com",
    phone: "+91 98765 43210",
    address: "123 Organic Lane, Green Valley, Kerala, India - 682001"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  useEffect(() => {
    // Read from localStorage
    const saved = localStorage.getItem("mock_orders");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => setOrders(parsed), 0);
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
      setTimeout(() => setOrders(initialOrders), 0);
    }

    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setEditForm(parsedProfile);
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    localStorage.setItem("user_profile", JSON.stringify(editForm));
    setIsEditing(false);
  };

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
          <div className="lg:col-span-5 bg-white p-lg rounded-2xl border border-outline-variant/10 shadow-sm space-y-md">
            {!isEditing ? (
              <>
                <div className="flex items-center justify-between pb-md border-b border-outline-variant/10">
                  <div className="flex items-center gap-md">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif text-[28px] font-bold border border-primary/20">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-serif text-headline-md font-bold text-on-surface">{profile.name}</h2>
                      <p className="font-sans text-xs text-on-surface-variant font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditForm({ ...profile });
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-xs font-sans text-label-sm text-primary border border-primary/20 hover:bg-primary/5 px-sm py-1.5 rounded-lg transition-all font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit
                  </button>
                </div>
                
                <div className="space-y-md font-sans text-body-md">
                  <div className="space-y-xs pb-sm border-b border-outline-variant/5">
                    <span className="block text-xs uppercase font-bold text-on-surface-variant tracking-wider">Phone Number</span>
                    <span className="text-on-surface font-medium">{profile.phone || "Not provided"}</span>
                  </div>
                  <div className="space-y-xs pb-sm border-b border-outline-variant/5">
                    <span className="block text-xs uppercase font-bold text-on-surface-variant tracking-wider">Shipping Address</span>
                    <span className="text-on-surface font-medium block leading-relaxed">{profile.address || "Not provided"}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-sm pt-xs">
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/5">
                      <span className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-xs">Membership</span>
                      <span className="text-secondary font-bold uppercase text-xs">Gold Tier</span>
                    </div>
                    <div className="bg-surface-container-low p-sm rounded-xl border border-outline-variant/5">
                      <span className="block text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-xs">Total Orders</span>
                      <span className="text-on-surface font-bold text-xs">{orders.length}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={saveProfile} className="space-y-md">
                <div className="flex items-center gap-sm pb-md border-b border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary text-[24px]">manage_accounts</span>
                  <h2 className="font-serif text-headline-md font-bold text-on-surface">Edit Profile Details</h2>
                </div>

                <div className="space-y-sm font-sans">
                  <div className="space-y-xs">
                    <label className="text-xs uppercase font-bold text-on-surface-variant">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={editForm.name}
                      onChange={handleProfileChange}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="text-xs uppercase font-bold text-on-surface-variant">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={editForm.email}
                      onChange={handleProfileChange}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="text-xs uppercase font-bold text-on-surface-variant">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleProfileChange}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-xs">
                    <label className="text-xs uppercase font-bold text-on-surface-variant">Shipping Address</label>
                    <textarea
                      name="address"
                      rows={3}
                      value={editForm.address}
                      onChange={handleProfileChange}
                      className="w-full bg-white border border-outline-variant/40 rounded-lg px-md py-2 focus:ring-1 focus:ring-primary focus:border-primary text-sm font-sans resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex gap-sm pt-xs">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container py-2 rounded-lg font-sans text-label-md font-bold transition-all text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white hover:brightness-110 py-2 rounded-lg font-sans text-label-md font-bold transition-all text-center shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            <div className="pt-md border-t border-outline-variant/10">
              <Link
                href="/admin/inventory"
                className="w-full flex items-center justify-center gap-xs border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-sans text-label-md font-bold transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                Go to Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-7 space-y-lg">
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
