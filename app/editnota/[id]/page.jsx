'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import styles from "../../notaluno/notaluno.module.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditNotaPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [id_nota, setIdNota] = useState("");
    const [id_aluno, setIdAluno] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [raAluno, setRaAluno] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarNota(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarNota(idNota) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/notas/${idNota}`);

            if (!resposta.ok) {
                alert("Nota não encontrada!");
                router.push("/listanota");
                return;
            }

            const dados = await resposta.json();
            setIdNota(dados.id_nota || "");
            setIdAluno(dados.id_aluno || "");
            setNomeAluno(dados.nome || "");
            setRaAluno(dados.ra || "");
            setT1(dados.t1 !== undefined ? dados.t1 : "");
            setT2(dados.t2 !== undefined ? dados.t2 : "");
            setN1(dados.n1 !== undefined ? dados.n1 : "");
            setN2(dados.n2 !== undefined ? dados.n2 : "");
            setN3(dados.n3 !== undefined ? dados.n3 : "");
        } catch (erro) {
            console.error("Erro ao carregar nota:", erro);
            alert("Erro ao carregar dados da nota.");
        } finally {
            setCarregando(false);
        }
    }

    function calcularMediaAtual() {
        const valores = [parseFloat(t1) || 0, parseFloat(t2) || 0, parseFloat(n1) || 0, parseFloat(n2) || 0, parseFloat(n3) || 0];
        const soma = valores.reduce((acc, val) => acc + val, 0);
        return (soma / valores.length).toFixed(1);
    }

    async function editarNota(event) {
        event.preventDefault();

        if (!id_nota && !id) {
            alert("ID da nota não encontrado.");
            return;
        }

        try {
            const resposta = await fetch("/api/notas", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_nota: id_nota || id,
                    id_aluno,
                    t1: parseFloat(t1) || 0,
                    t2: parseFloat(t2) || 0,
                    n1: parseFloat(n1) || 0,
                    n2: parseFloat(n2) || 0,
                    n3: parseFloat(n3) || 0,
                }),
            });

            const dados = await resposta.json();
            alert(dados.mensagem || dados.erro);

            if (resposta.ok) {
                router.push("/listanota");
            }
        } catch (error) {
            console.error("Erro ao editar nota:", error);
            alert("Erro ao atualizar notas.");
        }
    }

    if (carregando) {
        return (
            <>
                <Header />
                <main className={styles.mainContainer}>
                    <div className={styles.formCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerIcon}>⏳</div>
                            <div>
                                <h2 className={styles.title}>Carregando Notas</h2>
                                <p className={styles.subtitle}>Buscando os registros do aluno no sistema...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    const mediaAtual = calcularMediaAtual();

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <div className={styles.formCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerIcon}>✏️</div>
                        <div>
                            <h2 className={styles.title}>Edição de Notas</h2>
                            <p className={styles.subtitle}>
                                Atualize as notas e trabalhos do aluno no sistema SESI.
                            </p>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={editarNota}>
                        <div className={styles.formGrid}>
                            <div className={styles.inputGroupFull}>
                                <label className={styles.label}>Aluno</label>
                                <input
                                    type="text"
                                    value={`${nomeAluno} (RA: ${raAluno})`}
                                    disabled
                                    className={styles.input}
                                    style={{ opacity: 0.85, cursor: "not-allowed", background: "rgba(15, 23, 42, 0.4)" }}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t1" className={styles.label}>T1 (Trabalho 1)</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    placeholder="Nota T1"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t2" className={styles.label}>T2 (Trabalho 2)</label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    placeholder="Nota T2"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n1" className={styles.label}>N1 (Nota 1)</label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    placeholder="Nota N1"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n2" className={styles.label}>N2 (Nota 2)</label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    placeholder="Nota N2"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n3" className={styles.label}>N3 (Nota 3)</label>
                                <input
                                    id="n3"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n3}
                                    onChange={(e) => setN3(e.target.value)}
                                    placeholder="Nota N3"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Média Prevista</label>
                                <div
                                    className={styles.input}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        color: parseFloat(mediaAtual) >= 7 ? "#4ade80" : "#ff4d4d",
                                        background: parseFloat(mediaAtual) >= 7 ? "rgba(74, 222, 128, 0.1)" : "rgba(239, 68, 68, 0.15)",
                                        border: parseFloat(mediaAtual) >= 7 ? "1px solid rgba(74, 222, 128, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                                    }}
                                >
                                    {mediaAtual} {parseFloat(mediaAtual) >= 7 ? "✓ Aprovado" : "⚠ Abaixo da média"}
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <Link href="/listanota" className={styles.cancelBtn}>
                                Cancelar
                            </Link>
                            <button className={styles.submitBtn} type="submit">
                                💾 Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
