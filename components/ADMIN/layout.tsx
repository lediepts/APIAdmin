import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
function Layout({ children }: Props) {
  return (
    <>
      <main className="flex w-screen h-auto">
        <div className="text-red-800 font-bold">{children}</div>
      </main>
    </>
  );
}

export default Layout;
