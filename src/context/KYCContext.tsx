import React, { createContext, useContext, useState, ReactNode } from "react";

interface Dob {
  day: string;
  month: string;
  year: string;
}
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
export interface KycData {
  selectedCountry?: string;
  dob: Dob;
  phone?: string;
  address: Address;
}

interface KycContextType {
  data: KycData;
  updateKycData: <K extends keyof KycData>(key: K, value: KycData[K]) => void;
}

const defaultData: KycData = {
  selectedCountry: "",
  dob: { day: "", month: "", year: "" },
  phone: "",
  address: { street: "", city: "", state: "", zipCode: "" },
};

const KycContext = createContext<KycContextType>({
  data: defaultData,
  updateKycData: () => {},
});

export const KycProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<KycData>(defaultData);
  const updateKycData = <K extends keyof KycData>(
    key: K,
    value: KycData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <KycContext.Provider value={{ data, updateKycData }}>
      {children}
    </KycContext.Provider>
  );
};

export const useKyc = () => useContext(KycContext);
