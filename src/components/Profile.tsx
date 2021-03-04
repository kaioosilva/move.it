import { useContext, useState, useEffect, FormEvent } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/Profile.module.css";

interface ProfileProps {
  avatar?: string;
  name?: string;
  level?: number;
}

export function Profile(props: ProfileProps) {
  const { level, userData } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      {props.avatar ? (
        <img src={`${props.avatar}`} alt={props.name} />
      ) : (
        <img src={`${userData.avatar}`} alt={userData.name} />
      )}

      <div>
        {props.name ? (
          <strong>{props.name}</strong>
        ) : (
          <strong>{userData.name}</strong>
        )}

        {props.level ? (
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {props.level}
          </p>
        ) : (
          <p>
            <img src="icons/level.svg" alt="Level" />
            Level {level}
          </p>
        )}
      </div>
    </div>
  );
}
