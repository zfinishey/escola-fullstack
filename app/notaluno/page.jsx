"use client";

import { useState } from "react";
import Header from "../components/header";
import styles from "./notaluno.module.css";

export default function NotAluno() {
    const [aluno, setAluno] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Notas do aluno ${aluno} cadastradas com sucesso!`);
    };

    return (
        <>
            <Header />
            <main className={styles.mainContainer}>
                <div className={styles.formCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerIcon}>📊</div>
                        <div>
                            <h2 className={styles.title}>Cadastro de Notas</h2>
                            <p className={styles.subtitle}>Preencha as notas e trabalhos do aluno abaixo.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.inputGroupFull}>
                                <label htmlFor="aluno" className={styles.label}>Aluno</label>
                                <input
                                    id="aluno"
                                    type="text"
                                    placeholder="Nome do Aluno"
                                    value={aluno}
                                    onChange={(e) => setAluno(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t1" className={styles.label}>T1 (trabalho1)</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    placeholder="Nota do T1"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t2" className={styles.label}>T2 (trabalho2)</label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    placeholder="Nota do T2"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n1" className={styles.label}>N1 (nota1)</label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    placeholder="Nota N1"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n2" className={styles.label}>N2 (nota2)</label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    placeholder="Nota N2"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n3" className={styles.label}>N3 (nota3)</label>
                                <input
                                    id="n3"
                                    type="number"
                                    step="0.1"
                                    placeholder="Nota N3"
                                    value={n3}
                                    onChange={(e) => setN3(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitBtn}>
                                ✨ Cadastrar Notas
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
