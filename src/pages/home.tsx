import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { SideMenu } from "../components/SideMenu";
import { useAuth } from "../contexts/Auth";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import api from "../services/api";
import styles from "../styles/pages/Home.module.css";
import Challenges from "./challenges";
import Leaderboard from "./leaderboard";
import { useRouter } from "next/router";

interface UserDataProps {
  id: string;
  login: string;
  avatar: string;
  name: string;
  code: string;
  token: string;
}

interface UsersRankedProps {
  _id: string;
  login: string;
  avatar: string;
  name: string;
  level: number;
  challengesCompleted: number;
  experienceTotal: number;
}

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  userData: UserDataProps;
  users_ranked: UsersRankedProps[];
}

export default function Home(props: HomeProps) {
  const router = useRouter();
  const { signIn } = useAuth();

  const [menu, setMenu] = useState("home");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await signIn({
        user: {
          id: props.userData.id,
          name: props.userData.name,
          login: props.userData.login,
          avatar_url: props.userData.avatar,
          code: props.userData.code,
        },
        token: props.userData.token,
      });
    }

    fetchMyAPI();
  }, []);

  function handleMenu(value: string) {
    setMenu(value);
    refreshData();
  }

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      userData={props.userData}
    >
      <div className={styles.mainContainer}>
        <SideMenu menu={handleMenu} />
        {menu === "home" ? (
          <Challenges />
        ) : (
          <Leaderboard users_ranked={props.users_ranked} />
        )}
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  const { query } = ctx;
  const { code } = query;

  const { data } = await api.get("/api/userData", {
    data: {
      code,
    },
  });

  const user = await api.get("/api/rankPositions");

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      userData: {
        id: data._id,
        name: data.name,
        login: data.login,
        avatar: data.avatar,
        code,
        token: data.token,
      },
      users_ranked: user.data,
    },
  };
};
