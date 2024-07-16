import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
