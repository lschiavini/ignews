import Link from "next/link";
import ActiveLink from "../ActiveLink";
import SignInButton from "../SignInButton";
import styles from "./styles.module.scss"

const Header = () => {
    return (
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <ActiveLink href="/" activeLinkClassname={styles.active}>
              <a>
                <img src="/images/logo.svg" alt="ig.news" />
              </a>
            </ActiveLink>
            <nav>
              <ActiveLink href="/" activeLinkClassname={styles.active}>
                <a>Home</a>
              </ActiveLink>
              <ActiveLink href="/posts" activeLinkClassname={styles.active}>
                <a>Posts</a>
              </ActiveLink>
            </nav>

            <SignInButton />
        </div>
        

        </header>
    );
}

export default Header;