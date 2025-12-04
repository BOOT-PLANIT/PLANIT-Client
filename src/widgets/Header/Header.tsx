"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image alt="logo" src="logo.svg" width="40" height="40" />
          </div>
          <span className={styles.logoText}>{title}</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>{children}</ul>

          <div className={styles.avatar}>
            <span>{userName}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
