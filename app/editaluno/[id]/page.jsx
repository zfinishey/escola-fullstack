'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import styles from "../../cadaaluno/cadaaluno.module.css";
import {redirect} from "next/navigation";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function EditAlunoPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();


    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [id_aluno, setIdAluno] = useState("")
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");
    const [carregando, setCarregando] = useState(true);


   useEffect(() => {
        if (id) {
            buscarAluno(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarAluno(idAluno) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/alunos/${idAluno}`);

            if (!resposta.ok) {
                alert("Aluno não encontrado!");
                router.push("/listaluno");
                return;
            }

            const dados = await resposta.json();
            setIdAluno(dados.id_aluno || "");
            setNome(dados.nome || "");
            setIdade(dados.idade || "");
            setSerie(dados.serie || "");
            setRa(dados.ra || "");
        } catch (erro) {
            console.error("Erro ao carregar aluno:", erro);
            alert("Erro ao carregar dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarAluno(event) {
        event.preventDefault();

        if (!id) {
            alert("ID do aluno não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/alunos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_aluno,
                nome,
                idade,
                serie,
                ra,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listaluno");
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
                                <h2 className={styles.title}>Carregando Aluno</h2>
                                <p className={styles.subtitle}>Buscando os dados do aluno no sistema...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.mainContainer}>
                <div className={styles.formCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerIcon}>✏️</div>
                        <div>
                            <h2 className={styles.title}>Edição de Aluno</h2>
                            <p className={styles.subtitle}>
                                Atualize os dados cadastrais do aluno no sistema SESI.
                            </p>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={editarAluno}>
                        <input type="hidden" value={id_aluno} />

                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>Nome Completo</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite o nome do aluno"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="idade" className={styles.label}>Idade / Nascimento</label>
                                <input
                                    id="idade"
                                    type="text"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                    placeholder="Digite a idade ou data"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="serie" className={styles.label}>Série / Turma</label>
                                <input
                                    id="serie"
                                    type="text"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    placeholder="Ex: 3º Ano A"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="ra" className={styles.label}>RA (Registro Aluno)</label>
                                <input
                                    id="ra"
                                    type="text"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                    placeholder="Ex: 123456"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <Link href="/listaluno" className={styles.cancelBtn}>
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