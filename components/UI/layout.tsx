import React, { ReactNode } from "react";
import Footer from "./footer";
import styles from "./styles/layout.module.scss";

interface Props {
  children: ReactNode;
}
function Layout({ children }: Props) {
  return (
    <>
      <main className={styles.main}>
        <div className="text-red-800 font-bold">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
