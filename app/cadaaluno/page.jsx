"use client";
import { useState } from "react";
import Header from "../components/header";
import styles from "./cadaaluno.module.css";
import {redirect} from "next/navigation";

export default function CadaAluno() {
    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [ra, setRa] = useState('');
    const [turma, setTurma] = useState('');

    async function cadastrarAluno(evento) {
        evento.preventDefault();

        const resposta = await fetch("/api/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                idade: dataNasc,
                serie: turma,
                ra
            }),
        });
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        if(resposta.ok){
            setNome("")
            setDataNasc("")
            setTurma("")
            setRa("")
            redirect('/listaluno')
        }
    }


    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.formCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerIcon}>📝</div>
                        <div>
                            <h2 className={styles.title}>Cadastro de Aluno</h2>
                            <p className={styles.subtitle}>Preencha os dados abaixo para registrar o novo aluno no sistema SESI.</p>
                        </div>
                    </div>

                    <form onSubmit={cadastrarAluno} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>Nome Completo</label>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="Ex: João Silva Santos"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="dataNasc" className={styles.label}>Data de Nascimento</label>
                                <input
                                    id="dataNasc"
                                    type="date"
                                    value={dataNasc}
                                    onChange={(e) => setDataNasc(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="ra" className={styles.label}>RA (Registro Aluno)</label>
                                <input
                                    id="ra"
                                    type="number"
                                    placeholder="Ex: 123456"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="turma" className={styles.label}>Turma</label>
                                <input
                                    id="turma"
                                    type="text"
                                    placeholder="Ex: 3º Ano A"
                                    value={turma}
                                    onChange={(e) => setTurma(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitBtn}>
                                ✨ Cadastrar Aluno
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );

}

