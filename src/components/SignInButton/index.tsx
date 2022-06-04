
import {FaGithub} from "react-icons/fa"
import {FiX} from "react-icons/fi"

import styles from "./styles.module.scss"

function SignInButton() {

    const isUserLoggedIn = true

    return isUserLoggedIn ? (
        <button
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#04d361"/>
            Lucas Schiavini
            <FiX color="#737380" className={styles.closedIcon}/>
        </button>
    ) :
     (
        <button
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    );
}

export default SignInButton;