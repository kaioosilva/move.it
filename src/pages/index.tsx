import { AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";

import styles from "../styles/pages/Loggin.module.css";

export default function Loggin() {
  return (
    <div className={styles.container}>
      <section>
        <div>
          <img src="./Simbolo.png" alt="Logo" />
        </div>
        <div>
          <img src="./logo.png" alt="Logo move.it" />

          <strong>Welcome</strong>
          <div>
            <AiFillGithub size={40} />
            <p>Log-in with your Github account to start using our platform.</p>
          </div>

          <div>
            <input type="text" placeholder="Your username" />
            <button type="button">
              <AiOutlineArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
