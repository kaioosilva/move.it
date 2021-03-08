import Head from "next/head";

import RankBox from "../components/RankBox";

import styles from "../styles/pages/leaderboard.module.css";

interface UsersRankedProps {
  _id: string;
  login: string;
  avatar: string;
  name: string;
  level: number;
  challengesCompleted: number;
  experienceTotal: number;
}

interface LeaderboardProps {
  users_ranked: UsersRankedProps[];
  menuSelected: string;
}

export default function Leaderboard(props: LeaderboardProps) {
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
          <p className={styles.challenges}>CHALLENGES</p>
          <p className={styles.experience}>EXPERIENCE</p>
        </div>
      </div>

      <div className={styles.positions}>
        {props?.users_ranked?.map((user, index) => {
          return (
            <RankBox
              key={user._id}
              position={index + 1}
              avatar={user.avatar}
              name={user.name ? user.name : user.login}
              level={user.level}
              challengesCompleted={user.challengesCompleted}
              experienceTotal={user.experienceTotal}
              menuSelected={props.menuSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
