import React, { useState } from "react";
import { FormEvent } from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoMedalOutline } from "react-icons/io5";
import { useAuth } from "../contexts/Auth";

import Router from "next/router";

import styles from "../styles/components/SideMenu.module.css";

interface SideMenuProps {
  // menu: (value: "home" | "leaderboard") => void;
  menu: (value: string) => void;
}

export function SideMenu({ menu }: SideMenuProps) {
  const { signOut } = useAuth();
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      menu: "home",
      icon: "AiOutlineHome",
      isActive: true,
    },
    {
      id: 2,
      menu: "leaderboard",
      icon: "IoMedalOutline",
      isActive: false,
    },
  ]);

  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    signOut();

    if (typeof window !== "undefined") Router.push(`/`);
  }

  function handleOnClick(item) {
    setMenuItems(
      menuItems.map((menuItem) =>
        menuItem.id === item.id
          ? { ...menuItem, isActive: true }
          : { ...menuItem, isActive: false }
      )
    );

    menu(item.menu);
  }

  return (
    <div className={styles.sideMenu}>
      <div>
        <img src="./LogoSimbolo.png" alt="Logo move.it" />
      </div>

      <div>
        {menuItems.map((item) => {
          return (
            <button
              onClick={() => handleOnClick(item)}
              key={item.id}
              style={{
                color: item.isActive ? "#5965e0" : "#dcdde0",
              }}
            >
              {item.icon === "AiOutlineHome" ? (
                <AiOutlineHome size={40} />
              ) : (
                <IoMedalOutline size={40} />
              )}
            </button>
          );
        })}
      </div>

      <div>
        <button type="button" onClick={handleSignOut}>
          <AiOutlineLogout size={40} />
        </button>
      </div>
    </div>
  );
}
