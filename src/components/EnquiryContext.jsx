import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

const EnquiryCtx = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiry = () => useContext(EnquiryCtx);

export function EnquiryProvider({ children }) {
  const [state, setState] = useState(null); // { type: "enquiry" | "demo", product?: slug }

  const openEnquiry = useCallback((product = "", type = "enquiry") => setState({ product, type }), []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close]);

  return (
    <EnquiryCtx.Provider value={openEnquiry}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-navy-950/60 backdrop-blur-sm p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={state.type === "demo" ? "Request a demo" : "Send an enquiry"}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ice-50 text-navy-900/60 hover:text-navy-900"
              >
                <X size={18} />
              </button>
              <EnquiryForm key={`${state.type}-${state.product}`} type={state.type} product={state.product} onDone={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EnquiryCtx.Provider>
  );
}
