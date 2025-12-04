"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={`${styles.navLink} ${isActive ? styles.active : ""}`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
