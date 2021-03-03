import { useContext, useState, useEffect, FormEvent } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level, userData } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={`${userData.avatar}`} alt="Kaio Silva" />
      <div>
        <strong>{userData.name}</strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
