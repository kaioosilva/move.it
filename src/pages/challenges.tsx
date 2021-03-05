import Head from "next/head";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { Experiencebar } from "../components/ExperienceBar";
import { ChallengeBox } from "../components/ChallengeBox";
import { Profile } from "../components/Profile";

import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Challenges.module.css";

interface ChallengesProps {
  menuSelected: string;
}

export default function Challenges(props: ChallengesProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | move.it</title>
      </Head>
      <Experiencebar />

      <CountdownProvider>
        <section>
          <div>
            <Profile menuSelected={props.menuSelected} />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  );
}
