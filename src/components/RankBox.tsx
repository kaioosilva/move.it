import React from "react";
import { Profile } from "./Profile";

import styles from "../styles/components/RankBox.module.css";

export default function RankBox() {
  return (
    <div className={styles.container}>
      <div className={styles.ranked}>
        <p>1</p>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.profileContainer}>
          <Profile />
        </div>

        <div className={styles.data}>
          <p>
            127 <span>completed</span>
          </p>
          <p>
            154000 <span>xp</span>
          </p>
        </div>
      </div>
    </div>
  );
}
