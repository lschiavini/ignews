
import {FaGithub} from "react-icons/fa"
import {FiX} from "react-icons/fi"
import {signIn, signOut, useSession} from 'next-auth/react'
import styles from "./styles.module.scss"

function SignInButton() {
    const { data: session } = useSession()
    console.log('session :>> ', session);
    return session ? (
        <button
            className={styles.signInButton}
            type="button"
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361"/>
            {session.user.name}
            <FiX color="#737380" className={styles.closedIcon}/>
        </button>
    ) :
     (
        <button
            className={styles.signInButton}
            type="button"
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    );
}

export default SignInButton;