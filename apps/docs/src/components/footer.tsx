import React from "react";

export const Footer = () => {
  return (
    <span>
      Copyright {new Date().getFullYear()} ©{" "}
      <a
        href="https://polkadex.trade"
        target="_blank"
        rel="noreferrer noopener"
      >
        Polkadex, Inc
      </a>
      .
    </span>
  );
};
