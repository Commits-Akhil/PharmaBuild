import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-2xl font-extrabold text-emerald-700 flex flex-row items-center tracking-tight">
            <span className="text-2xl font-extrabold text-slate-900">RX</span>
            <span>Connect</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            A modern multi-branch pharmacy platform delivering medicines safely
            and quickly.
          </p>
          <div className="text-slate-600 flex items-center gap-4 mt-4 text-xl">
            <RiFacebookBoxLine className="hover:text-emerald-700 cursor-pointer transition" />
            <FaInstagram className="hover:text-emerald-700 cursor-pointer transition" />
            <RiTwitterXFill className="hover:text-emerald-700 cursor-pointer transition" />
            <AiOutlineLinkedin className="hover:text-emerald-700 cursor-pointer transition" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-slate-900 text-sm uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>About Us</li>
            <li>Branches</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-slate-900 text-sm uppercase tracking-wider">
            Shop
          </h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>Medicines</li>
            <li>Orders</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-slate-900 text-sm uppercase tracking-wider">
            Account
          </h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>Login</li>
            <li>Register</li>
            <li>Dashboard</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-slate-900 text-sm uppercase tracking-wider">
            Contact
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-slate-600 flex items-center gap-2">
              <MdOutlineEmail className="text-emerald-700 shrink-0" />
              care@rxconnect.in
            </p>
            <p className="text-slate-600 flex items-center gap-2">
              <FaPhoneAlt className="text-emerald-700 shrink-0" />
              +91 9087654321
            </p>
            <p className="text-slate-600 flex items-center gap-2">
              <IoLocationOutline className="text-emerald-700 shrink-0" />
              Mangaluru, India
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 text-center text-slate-500 text-xs sm:text-sm">
        © 2026 RxConnect. All Rights Reserved.
      </div>
    </footer>
  );
}
