"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { products, type Product } from "@/lib/shop";

export type CartLine = {
  slug: string;
  finish: string;
  qty: number;
};

export type CartLineWithProduct = CartLine & { product: Product };

/** `ready` = localStorage wurde gelesen. Liegt im Reducer, damit der
 *  Mount-Effekt nur *einmal* dispatcht statt zusätzlich setState zu rufen. */
type State = { lines: CartLine[]; ready: boolean };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; slug: string; finish: string; qty: number }
  | { type: "setQty"; slug: string; finish: string; qty: number }
  | { type: "remove"; slug: string; finish: string }
  | { type: "clear" };

const STORAGE_KEY = "fasswerk.cart.v1";

const sameLine = (l: CartLine, slug: string, finish: string) =>
  l.slug === slug && l.finish === finish;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, ready: true };

    case "add": {
      const existing = state.lines.find((l) =>
        sameLine(l, action.slug, action.finish),
      );
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            sameLine(l, action.slug, action.finish)
              ? { ...l, qty: Math.min(l.qty + action.qty, 99) }
              : l,
          ),
        };
      }
      return {
        ...state,
        lines: [
          ...state.lines,
          { slug: action.slug, finish: action.finish, qty: action.qty },
        ],
      };
    }

    case "setQty": {
      if (action.qty <= 0) {
        return {
          ...state,
          lines: state.lines.filter(
            (l) => !sameLine(l, action.slug, action.finish),
          ),
        };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          sameLine(l, action.slug, action.finish)
            ? { ...l, qty: Math.min(action.qty, 99) }
            : l,
        ),
      };
    }

    case "remove":
      return {
        ...state,
        lines: state.lines.filter(
          (l) => !sameLine(l, action.slug, action.finish),
        ),
      };

    case "clear":
      return { ...state, lines: [] };
  }
}

type CartContextValue = {
  lines: CartLineWithProduct[];
  count: number;
  subtotal: number;
  /** Ab 500 € versandkostenfrei (Demo-Regel) */
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  isOpen: boolean;
  /** true, sobald localStorage gelesen wurde — verhindert Hydration-Mismatch */
  ready: boolean;
  /** zählt bei jedem add() hoch, damit der Header-Badge animieren kann */
  addPulse: number;
  open: () => void;
  close: () => void;
  add: (slug: string, finish: string, qty?: number) => void;
  setQty: (slug: string, finish: string, qty: number) => void;
  remove: (slug: string, finish: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 39;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], ready: false });
  const [isOpen, setIsOpen] = useState(false);
  const { ready } = state;
  const [addPulse, setAddPulse] = useState(0);

  // Gespeicherten Warenkorb einmalig nach dem Mount lesen.
  useEffect(() => {
    let lines: CartLine[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartLine[]) : null;
      if (Array.isArray(parsed)) {
        lines = parsed.filter(
          (l) =>
            l &&
            typeof l.slug === "string" &&
            products.some((p) => p.slug === l.slug),
        );
      }
    } catch {
      /* Privater Modus / Storage deaktiviert — dann eben leer starten. */
    }
    dispatch({ type: "hydrate", lines });
  }, []);

  // Speichern bei jeder Änderung — aber erst ab dem Render *nach* dem Einlesen.
  // Ohne den `ready`-Guard würde dieser Effekt schon im Mount-Commit laufen,
  // wo `state.lines` noch der leere Startwert ist, und den gespeicherten
  // Warenkorb sofort mit [] überschreiben.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [ready, state.lines]);

  const lines = useMemo<CartLineWithProduct[]>(
    () =>
      state.lines
        .map((l) => {
          const product = products.find((p) => p.slug === l.slug);
          return product ? { ...l, product } : null;
        })
        .filter((l): l is CartLineWithProduct => l !== null),
    [state.lines],
  );

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const add = useCallback((slug: string, finish: string, qty = 1) => {
    dispatch({ type: "add", slug, finish, qty });
    setAddPulse((n) => n + 1);
    setIsOpen(true);
  }, []);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    isOpen,
    ready,
    addPulse,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add,
    setQty: (slug, finish, qty) => dispatch({ type: "setQty", slug, finish, qty }),
    remove: (slug, finish) => dispatch({ type: "remove", slug, finish }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
