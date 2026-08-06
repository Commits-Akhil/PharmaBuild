"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

let toastListeners = [];
let toastQueue = [];
let nextId = 1;

export function toast(message, type = "success", duration = 3500) {
  const id = nextId++;
  const item = { id, message, type, duration };
  toastQueue = [...toastQueue, item];
  toastListeners.forEach((fn) => fn([...toastQueue]));
  setTimeout(() => removeToast(id), duration);
}

function removeToast(id) {
  toastQueue = toastQueue.filter((t) => t.id !== id);
  toastListeners.forEach((fn) => fn([...toastQueue]));
}

const icons = {
  success: <CheckCircle size={18} className="text-emerald-700 flex-shrink-0" />,
  error: <XCircle size={18} className="text-rose-700 flex-shrink-0" />,
  warning: <AlertCircle size={18} className="text-amber-700 flex-shrink-0" />,
};

const borders = {
  success: "border-emerald-200",
  error: "border-rose-200",
  warning: "border-amber-200",
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setToasts);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-3 max-w-sm w-[calc(100vw-2rem)] sm:w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 bg-white border ${
            borders[t.type] ?? borders.success
          } rounded-2xl px-4 py-3 shadow-sm pointer-events-auto animate-slideIn`}
        >
          {icons[t.type] ?? icons.success}
          <p className="text-slate-800 text-sm leading-snug flex-1">{t.message}</p>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-700 ml-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
