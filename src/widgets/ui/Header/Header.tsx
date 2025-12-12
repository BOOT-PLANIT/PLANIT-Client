import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Avatar } from "@/shared/ui";

import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  userName: string;
  children?: React.ReactNode;
}

const Header = ({ title, userName, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image alt="logo" src="logo.svg" width={40} height={40} priority />
          </div>
          <span className={styles.logoText}>{title}</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>{children}</ul>

          <Avatar userName={userName} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
