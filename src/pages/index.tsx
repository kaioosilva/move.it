import { AiFillGithub } from "react-icons/ai";
import { GetServerSideProps } from "next";
import api from "../services/api";

import Router from "next/router";
// import { useRouter } from "next/router";

import styles from "../styles/pages/Loggin.module.css";

interface UserDataProps {
  id: string;
  login: string;
  avatar: string;
  name: string;
  token: string;
  code: string;
}

interface LogginProps {
  userData: UserDataProps;
}

export default function Loggin(props: LogginProps) {
  // export default function Loggin() {
  // const router = useRouter();

  const clickHandle = () => {
    document.location.href =
      "https://github.com/login/oauth/authorize?client_id=ed3209fa24a5b426d532";
  };

  if (props?.userData?.code !== "") {
    if (typeof window !== "undefined") {
      Router.push(`/home?code=${props?.userData?.code}`);
    }
  }

  return (
    <div className={styles.container}>
      <section>
        <div>
          <img src="./Simbolo.png" alt="Logo" />
        </div>
        <div>
          <img src="./Logo.png" alt="Logo move.it" />

          <strong>Welcome</strong>
          <div onClick={clickHandle}>
            <AiFillGithub size={40} />
            <p>Sign in with your Github account to start using our platform.</p>
          </div>

          {/* <div>
            <input type="text" placeholder="Your username" />
            <button type="button" onClick={clickHandle}>
              <AiOutlineArrowRight size={20} />
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = ctx.req.cookies;

  let userParse = {
    code: "",
  };

  if (user !== undefined) {
    userParse = JSON.parse(user);
  }

  let { data } = await api.get("/api/userData", {
    data: {
      code: userParse?.code ? userParse?.code : "",
    },
  });

  if (!userParse) {
    data = null;
  }

  return {
    props: {
      userData: {
        name: data.name ? data.name : "",
        login: data.login ? data.login : "",
        avatar: data.avatar ? data.avatar : "",
        token: data.token ? data.token : "",
        code: data.code ? data.code : "",
      },
    },
  };
};
