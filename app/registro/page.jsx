"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./registro.module.css";

export default function RegistroPage() {
    const [usuario, setUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    function handleRegistrar(evento) {
        evento.preventDefault();
        // Por enquanto, redireciona para o login
        alert("Conta criada com sucesso!");
        router.push("/login");
    }

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.registerCard}>
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
                    <h1 className={styles.title}>Criar nova conta</h1>
                    <p className={styles.subtitle}>
                        Registre-se para acessar o Sistema de Gestão Escolar SESI
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleRegistrar} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="usuario" className={styles.label}>
                            Usuário
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>👤</span>
                            <input
                                id="usuario"
                                type="text"
                                placeholder="Escolha um nome de usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="nome" className={styles.label}>
                            Nome Completo
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>📝</span>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                                placeholder="Crie uma senha segura"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        ✨ Criar Conta
                    </button>
                </form>

                {/* Link para login */}
                <div className={styles.footerLink}>
                    <span className={styles.footerText}>Já possui uma conta?</span>
                    <Link href="/login" className={styles.link}>
                        Fazer login →
                    </Link>
                </div>
            </div>
        </main>
    );
}

