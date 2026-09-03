import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <div className={styles.logoBadge}>
                        <Image
                            src="/sesi-logo.jpg"
                            alt="Logo SESI"
                            width={44}
                            height={44}
                            className={styles.logoImg}
                            priority
                        />
                    </div>
                    <span className={styles.title}>SESI • Sistema Escolar</span>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="/">Início</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/cadaaluno">Alunos - Cadastro</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/listaluno">Alunos - Lista</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/notaluno">Notas - Cadastro</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/listanota">Notas - Lista</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
