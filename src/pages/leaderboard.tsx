import Head from "next/head";
import RankBox from "../components/RankBox";
import { useAuth } from "../contexts/Auth";

import styles from "../styles/pages/leaderboard.module.css";

export default function Leaderboard() {
  const { user } = useAuth();

  console.log({ user });
  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | move.it</title>
      </Head>

      <div className={styles.headerLeardboard}>
        <span>Leaderboard</span>
      </div>

      <div className={styles.headerBoard}>
        <div>
          <p>POSITION</p>
          <p>USER</p>
        </div>
        <div>
          <p>CHALLENGES</p>
          <p>EXPERIENCE</p>
        </div>
      </div>

      <div className={styles.positions}>
        <RankBox />
        <RankBox />
        <RankBox />
        <RankBox />
        <RankBox />
        <RankBox />
        <RankBox />
      </div>
    </div>
  );
}
