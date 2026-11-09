"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from "./notaluno.module.css";
import { useRouter } from "next/navigation";

export default function NotAluno() {
    const router = useRouter();
    const [alunos, setAlunos] = useState([]);
    const [id_aluno, setIdAluno] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');

    // Buscar lista de alunos ao carregar a página
    useEffect(() => {
        async function carregarAlunos() {
            const resposta = await fetch('/api/alunos');
            const dados = await resposta.json();
            setAlunos(dados);
        }
        carregarAlunos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id_aluno) {
            alert("Selecione um aluno!");
            return;
        }

        try {
            const resposta = await fetch("/api/notas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_aluno,
                    t1: parseFloat(t1),
                    t2: parseFloat(t2),
                    n1: parseFloat(n1),
                    n2: parseFloat(n2),
                    n3: parseFloat(n3),
                }),
            });

            const dados = await resposta.json();

            alert(dados.mensagem || dados.erro);

            if (resposta.ok) {
                router.push("/listanota");
            }
        } catch (error) {
            console.error("Erro ao cadastrar nota:", error);
            alert("Erro ao cadastrar nota!");
        }
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
                                <select
                                    id="aluno"
                                    value={id_aluno}
                                    onChange={(e) => setIdAluno(e.target.value)}
                                    className={styles.input}
                                >
                                    <option value="">Selecione um aluno...</option>
                                    {alunos.map((aluno) => (
                                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                            {aluno.nome} (RA: {aluno.ra})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t1" className={styles.label}>T1 (trabalho1)</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
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
                                    min="0"
                                    max="10"
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
                                    min="0"
                                    max="10"
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
                                    min="0"
                                    max="10"
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
                                    min="0"
                                    max="10"
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
