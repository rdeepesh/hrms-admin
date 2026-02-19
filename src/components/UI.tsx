import type { ReactNode } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 20, className = "" }: SpinnerProps) {
  return (
    <Loader2 size={size} className={`animate-spin text-white ${className}`} />
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Spinner size={28} />
      <p className="text-zinc-500 text-sm">{message}</p>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative card w-full max-w-md p-6 animate-slide-up shadow-2xl shadow-black/50">
        <h2 className="font-display font-bold text-lg text-white mb-5">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative card w-full max-w-sm p-6 animate-slide-up shadow-2xl shadow-black/50">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mb-4">
          <AlertCircle size={22} className="text-white" />
        </div>

        <h2 className="font-display font-bold text-base text-white mb-2">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm mb-6">{message}</p>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger flex-1 flex items-center justify-center gap-2"
          >
            {loading && <Spinner size={14} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

type StatColor = "accent" | "red" | "amber" | "blue";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: StatColor;
  trend?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "accent",
  trend,
}: StatCardProps) {
  const colorMap: Record<StatColor, string> = {
    accent: "bg-white text-black border-white",
    red: "bg-zinc-200 text-black border-zinc-200",
    amber: "bg-zinc-300 text-black border-zinc-300",
    blue: "bg-zinc-400 text-black border-zinc-400",
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
          {title}
        </p>

        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorMap[color]}`}
        >
          <Icon size={15} />
        </div>
      </div>

      <p className="font-display font-bold text-3xl text-white">{value}</p>

      {trend && <p className="text-zinc-500 text-xs">{trend}</p>}
    </div>
  );
}
