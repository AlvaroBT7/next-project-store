"use client";
import React, { createContext, useState, useEffect } from "react";

export const CurrentUserAccountIdContext = createContext<number | null>(null);

const CurrentUserAccountIdProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUserAccountId, setCurrentUserAccountId] = useState<
    number | null
  >(null);
  return (
    <CurrentUserAccountIdContext.Provider value={currentUserAccountId}>
      {children}
    </CurrentUserAccountIdContext.Provider>
  );
};

export default CurrentUserAccountIdProvider;
