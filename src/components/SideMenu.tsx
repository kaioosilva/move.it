import React, { useEffect, useState } from "react";
import { FormEvent, useCallback } from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoMedalOutline } from "react-icons/io5";
import { useAuth } from "../contexts/Auth";

import Router from "next/router";

import styles from "../styles/components/SideMenu.module.css";

interface SideMenuProps {
  menu: (value: "home" | "leaderboard") => void;
}

export function SideMenu({ menu }: SideMenuProps) {
  const { signOut } = useAuth();

  function handleSignOut(event: FormEvent) {
    event.preventDefault();
    signOut();

    if (typeof window !== "undefined") Router.push(`/`);
  }

  return (
    <div className={styles.sideMenu}>
      <div>
        <img src="./LogoSimbolo.png" alt="Logo move.it" />
      </div>

      <div>
        <button onClick={() => menu("home")}>
          <AiOutlineHome size={40} />
        </button>
        <button onClick={() => menu("leaderboard")}>
          <IoMedalOutline size={40} />
        </button>
      </div>

      <div>
        <button type="button" onClick={handleSignOut}>
          <AiOutlineLogout size={40} />
        </button>
      </div>
    </div>
  );
}
