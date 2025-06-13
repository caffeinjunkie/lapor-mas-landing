"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import React from "react";

import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { Image } from "@heroui/image";

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
            className="flex justify-start items-center gap-2"
            href="/"
            onClick={() => setNavbarOpen(false)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/app-assets/kabmimika.png`}
              height={40}
              className="object-contain"
              alt="Logo"
            />
            <Logo width={100} animated />
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
