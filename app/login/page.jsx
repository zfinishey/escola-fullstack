"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    function handleEntrar(evento) {
        evento.preventDefault();
        // Por enquanto, redireciona direto para a tela principal
        router.push("/principal");
    }

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                {/* Cabeçalho com logo */}
                <div className={styles.cardHeader}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/sesi-logo.jpg"
                            alt="Logo SESI"
                            width={64}
                            height={64}
                            className={styles.logoImg}
                            priority
                        />
                    </div>
                    <h1 className={styles.title}>Bem-vindo de volta</h1>
                    <p className={styles.subtitle}>
                        Acesse o Sistema de Gestão Escolar SESI Mirandópolis
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleEntrar} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="usuario" className={styles.label}>
                            Usuário
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>👤</span>
                            <input
                                id="usuario"
                                type="text"
                                placeholder="Digite seu usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="senha" className={styles.label}>
                            Senha
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>🔒</span>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        🚀 Entrar no Sistema
                    </button>
                </form>

                {/* Link para registro */}
                <div className={styles.footerLink}>
                    <span className={styles.footerText}>Não tem uma conta?</span>
                    <Link href="/registro" className={styles.link}>
                        Criar conta →
                    </Link>
                </div>
            </div>
        </main>
    );
}

