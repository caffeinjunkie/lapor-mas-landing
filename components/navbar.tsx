"use client"

import Image from "next/image";
import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  FacebookIcon,
  WapresIcon,
  IGIcon,
  YTIcon,
} from "@/components/icons";

export const Navbar = () => {
  // TODO: for further use
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //     }
  //     type="search"
  //   />
  // );
  const [currentTheme, setCurrentTheme] = React.useState('dark');
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <HeroUINavbar isMenuOpen={navbarOpen} maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/*<Logo />*/}
            {currentTheme === "light" && <Image color="#fff" src="https://lapormaswapres.id/assets/images/LaporMasWapres.webp" alt="logo" width={64} height={64} />}
            {/*<p className="font-bold text-inherit">ACME</p>*/}
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Youtube" href={siteConfig.links.youtube}>
            <YTIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Instagram" href={siteConfig.links.instagram}>
            <IGIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Website" href={siteConfig.links.website}>
            <WapresIcon className="text-default-500" />
          </Link>
          <ThemeSwitch
            setCurrentTheme={setCurrentTheme}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.website}>
          <WapresIcon className="text-default-500" />
        </Link>
        <ThemeSwitch setCurrentTheme={setCurrentTheme} />
        <NavbarMenuToggle onClick={() => setNavbarOpen(!navbarOpen)} />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === siteConfig.navMenuItems.length - 1
                    ? "primary"
                    : "foreground"
                }
                href={item.href}
                onPress={index === siteConfig.navMenuItems.length - 1 ? () => setNavbarOpen(false) : () => {}}
                target={index === siteConfig.navMenuItems.length - 1 ? "" : "_blank"}
                rel="noopener noreferrer"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
