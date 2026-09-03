import Header from "../components/header";
import Image from "next/image";
import Link from "next/link";
import styles from "./principal.module.css";

export default function Principal() {
    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                {/* Hero Section com Imagem de Capa */}
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroBadge}>⚡ SESI Mirandópolis</span>
                        <h1 className={styles.heroTitle}>Sistema de Gestão Escolar</h1>
                        <p className={styles.heroSubtitle}>
                            Seja bem-vindo(a) ao portal acadêmico do SESI Mirandópolis. Gerencie o cadastro de alunos, lançamento de notas e acompanhamento escolar de forma rápida e integrada.
                        </p>
                    </div>
                    <div className={styles.heroCoverWrapper}>
                        <Image
                            src="/hero-cover.png"
                            alt="Capa do Portal Escolar SESI"
                            fill
                            className={styles.heroCoverImage}
                            priority
                        />
                        <div className={styles.heroCoverOverlay} />
                    </div>
                </section>

                {/* Módulos de Acesso Rápido */}
                <section>
                    <h2 className={styles.sectionTitle}>Módulos do Sistema</h2>
                    <div className={styles.gridCards}>
                        <Link href="/cadaluno" className={styles.card}>
                            <div className={styles.cardIcon}>📝</div>
                            <h3 className={styles.cardTitle}>Cadastro de Alunos</h3>
                            <p className={styles.cardDesc}>Cadastre novos estudantes informando dados pessoais, matrícula e turma.</p>
                            <span className={styles.cardAction}>Acessar Cadastro &rarr;</span>
                        </Link>

                        <Link href="/listaluno" className={styles.card}>
                            <div className={styles.cardIcon}>📋</div>
                            <h3 className={styles.cardTitle}>Lista de Alunos</h3>
                            <p className={styles.cardDesc}>Visualize, busque e gerencie a lista completa de alunos cadastrados.</p>
                            <span className={styles.cardAction}>Ver Alunos &rarr;</span>
                        </Link>

                        <Link href="/notaluno" className={styles.card}>
                            <div className={styles.cardIcon}>🎯</div>
                            <h3 className={styles.cardTitle}>Lançamento de Notas</h3>
                            <p className={styles.cardDesc}>Registre notas, avaliações e boletins dos alunos com agilidade.</p>
                            <span className={styles.cardAction}>Lançar Notas &rarr;</span>
                        </Link>

                        <Link href="/listanota" className={styles.card}>
                            <div className={styles.cardIcon}>📊</div>
                            <h3 className={styles.cardTitle}>Boletim & Notas</h3>
                            <p className={styles.cardDesc}>Consulte o histórico de notas e desempenho acadêmico dos estudantes.</p>
                            <span className={styles.cardAction}>Ver Notas &rarr;</span>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
