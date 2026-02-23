import React, { createContext, useContext, useState, type ReactNode } from "react";

interface ContactFunnelContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ContactFunnelContext = createContext<ContactFunnelContextType | undefined>(undefined);

export const ContactFunnelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactFunnelContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ContactFunnelContext.Provider>
  );
};

export const useContactFunnel = () => {
  const context = useContext(ContactFunnelContext);
  if (!context) throw new Error("useContactFunnel must be used within ContactFunnelProvider");
  return context;
};
