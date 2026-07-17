"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import BookingDialog from "@/components/booking/BookingDialog";

interface BookingDialogContextValue {
  openBookingDialog: () => void;
  closeBookingDialog: () => void;
}

const BookingDialogContext = createContext<BookingDialogContextValue | null>(
  null,
);

// Mount ONE of these near the root of the app (e.g. in app/layout.tsx,
// wrapping {children}) so every page shares the same dialog instance
// instead of each page needing its own local copy + open/close state.
export function BookingDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBookingDialog = useCallback(() => setOpen(true), []);
  const closeBookingDialog = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openBookingDialog, closeBookingDialog }),
    [openBookingDialog, closeBookingDialog],
  );

  return (
    <BookingDialogContext.Provider value={value}>
      {children}
      <BookingDialog open={open} onClose={closeBookingDialog} />
    </BookingDialogContext.Provider>
  );
}

// Call this from any client component that needs a "Book Flight" button
// — Header, Contact, a blog post CTA, wherever — without each one having
// to manage its own dialog state or render its own <BookingDialog>.
export function useBookingDialog(): BookingDialogContextValue {
  const ctx = useContext(BookingDialogContext);
  if (!ctx) {
    throw new Error(
      "useBookingDialog must be used within a BookingDialogProvider — make sure it's mounted in your root layout.",
    );
  }
  return ctx;
}
