"use client";

import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <HeroUINavbar
      isMenuOpen={navbarOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={() => setNavbarOpen(!navbarOpen)}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
            onClick={() => setNavbarOpen(false)}
          >
            <Logo width={120} />
          </NextLink>
        </NavbarBrand>
        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "danger" }),
              "text-xs sm:text-sm",
            )}
            href="/check-report"
          >
            {t("check-report-text")}
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
