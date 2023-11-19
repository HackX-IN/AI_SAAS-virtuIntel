"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c8de7a37-2e84-4c12-b96b-08873b5d1a36");
  }, []);

  return null;
};
