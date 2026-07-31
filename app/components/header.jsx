"use client";

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuth, getStoredUser } from "../lib/api";
import useCartStore from "../Store/cart";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setMobileMenuOpen(false);
    router.push("/Login");
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" onClick={closeMenu}>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-green-500 flex flex-row items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-black">
                RX
              </span>
              <span>Connect</span>
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>

          <Link href="/medicines">Medicines</Link>

          <Link href="/branches">Branches</Link>

          <Link href="/cart">Cart</Link>

          <Link href="/orders">Orders</Link>

          <Link href="/tracking">Track</Link>
        </nav>

        <div className="flex gap-3">
          <button className="font-semibold text-gray-900">Login</button>

          <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
