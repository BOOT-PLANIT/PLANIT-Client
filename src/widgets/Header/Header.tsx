"use client";

import Link from "next/link";
import React from "react";

import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  avatar: string;
  children?: React.ReactNode;
}

const Header = ({ title, avatar, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>{title}</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>{children}</ul>

          <div className={styles.avatar}>
            <span>{avatar}</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
