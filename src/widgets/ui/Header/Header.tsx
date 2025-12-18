"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useAppSelector } from "@/shared/store/hooks";
import { Avatar } from "@/shared/ui";

import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const displayName = useAppSelector((state) => state.auth.displayName);
  const userName = displayName ?? "PLANIT";

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
          <Link href="/mypage">
            <Avatar userName={userName} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
