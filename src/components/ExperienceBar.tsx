import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function Experiencebar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  let percentToNextLevel = Number(
    Math.round(currentExperience * 100) / experienceToNextLevel
  );

  if (!percentToNextLevel) {
    percentToNextLevel = 0;
  }

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div
          style={{ width: `${percentToNextLevel ? percentToNextLevel : 0}%` }}
        />

        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel ? percentToNextLevel : 0}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
