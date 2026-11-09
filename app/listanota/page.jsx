'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import styles from "./listanota.module.css";

export default function ListaNota() {
    const [notas, setNotas] = useState([]);
    const [busca, setBusca] = useState("");
    const router = useRouter();

    useEffect(() => {
        buscarNotas();
    }, []);

    async function buscarNotas() {
        try {
            const resposta = await fetch('/api/notas');
            const dados = await resposta.json();
            setNotas(dados);
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        }
    }

    function calcularMedia(nota) {
        const valores = [nota.t1, nota.t2, nota.n1, nota.n2, nota.n3];
        const soma = valores.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
        return (soma / valores.length).toFixed(1);
    }

    function editarNota(idNota) {
        router.push(`/editnota/${idNota}`);
    }

    async function excluirNota(idNota) {
        if (!confirm("Deseja realmente excluir as notas deste aluno?")) {
            return;
        }

        try {
            const resposta = await fetch("/api/notas", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_nota: idNota,
                }),
            });

            const dados = await resposta.json();
            alert(dados.mensagem || dados.erro);

            if (resposta.ok) {
                buscarNotas();
            }
        } catch (erro) {
            console.error("Erro ao excluir nota:", erro);
            alert("Erro ao excluir nota.");
        }
    }

    const notasFiltradas = busca.trim().length > 0
        ? notas.filter((item) =>
            item.nome?.toLowerCase().includes(busca.toLowerCase()) ||
            item.ra?.toString().includes(busca) ||
            item.id_nota?.toString().includes(busca)
        )
        : notas;

    return (
        <>
            <Header />

            <main className={styles.container}>
                <section className={styles.headerSection}>
                    <h2>Lista de Notas dos Alunos</h2>
                    <p>Consulte, edite e gerencie as avaliações de todos os alunos.</p>
                </section>

                <section className={styles.tableCard}>
                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar por aluno, RA ou ID..."
                            className={styles.search}
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <div className={styles.total}>
                            Total: {notasFiltradas.length} {notasFiltradas.length === 1 ? 'registro' : 'registros'}
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className={styles.thAluno}>Aluno</th>
                                <th>T1</th>
                                <th>T2</th>
                                <th>N1</th>
                                <th>N2</th>
                                <th>N3</th>
                                <th>Média</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 1rem' }}>
                                        {busca ? 'Nenhum resultado encontrado para a busca.' : 'Nenhuma nota cadastrada ainda.'}
                                    </td>
                                </tr>
                            ) : (
                                notasFiltradas.map((nota) => {
                                    const media = calcularMedia(nota);
                                    const mediaNum = parseFloat(media);

                                    return (
                                        <tr key={nota.id_nota}>
                                            <td className={styles.idCol}>{nota.id_nota}</td>
                                            <td className={styles.nomeCol}>
                                                <div>{nota.nome}</div>
                                                {nota.ra && (
                                                    <small style={{ color: '#64748b', fontSize: '0.78rem' }}>
                                                        RA: {nota.ra}
                                                    </small>
                                                )}
                                            </td>
                                            <td>
                                                <span className={nota.t1 < 7 ? styles.notaBaixa : ''}>
                                                    {Number(nota.t1).toFixed(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={nota.t2 < 7 ? styles.notaBaixa : ''}>
                                                    {Number(nota.t2).toFixed(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={nota.n1 < 7 ? styles.notaBaixa : ''}>
                                                    {Number(nota.n1).toFixed(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={nota.n2 < 7 ? styles.notaBaixa : ''}>
                                                    {Number(nota.n2).toFixed(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={nota.n3 < 7 ? styles.notaBaixa : ''}>
                                                    {Number(nota.n3).toFixed(1)}
                                                </span>
                                            </td>
                                            <td className={styles.mediaCol}>
                                                <span className={mediaNum < 7 ? styles.notaBaixa : styles.notaAlta}>
                                                    {media}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.actionCell}>
                                                    <button
                                                        className={styles.editBtn}
                                                        onClick={() => editarNota(nota.id_nota)}
                                                        title="Editar notas do aluno"
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        className={styles.deleteBtn}
                                                        onClick={() => excluirNota(nota.id_nota)}
                                                        title="Excluir notas"
                                                    >
                                                        🗑️ Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}
