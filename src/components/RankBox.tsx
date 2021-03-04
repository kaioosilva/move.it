import React from "react";
import { Profile } from "./Profile";

import styles from "../styles/components/RankBox.module.css";

interface RankBoxProps {
  avatar: string;
  name: string;
  level: number;
  challengesCompleted: number;
  experienceTotal: number;
  position: number;
}

export default function RankBox(props: RankBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.ranked}>
        <p>{props.position}</p>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.profileContainer}>
          <Profile
            avatar={props.avatar}
            name={props.name}
            level={props.level}
          />
        </div>

        <div className={styles.data}>
          <p>
            {props.challengesCompleted} <span>completed</span>
          </p>
          <p>
            {props.experienceTotal} <span>xp</span>
          </p>
        </div>
      </div>
    </div>
  );
}
