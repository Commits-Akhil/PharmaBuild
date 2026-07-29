import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-green-500 flex flex-row">
              <p className="text-3xl font-extrabold text-black items-center">
                RX
              </p>
              <p>Connect</p>
            </h1>
          </Link>

          {/* <h1 className="text-3xl font-extrabold text-green-500 flex flex-row">
            <p className="text-3xl font-extrabold text-black items-center">RX</p><p>Connect</p>
          </h1> */}
        </div>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>

          <Link href="/medicines">Medicines</Link>

          <Link href="/branches">Branches</Link>

          <Link href="/upload">Upload Prescription</Link>

          <Link href="/orders">Orders</Link>

          <Link href="/about">About</Link>
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
