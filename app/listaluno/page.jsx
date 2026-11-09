'use client';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Header from "../components/header";
import styles from "./listaluno.module.css";
import { useRouter } from "next/navigation";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [busca, setBusca] = useState('');
    const router = useRouter();

    useEffect(() => {
        buscarAlunos()
    }, [])//toda vez que a tela for recarregada

    function editarAlunos(id) {
        router.push(`/editaluno/${id}`)
    }

    // Filtra alunos quando a busca tiver 3+ caracteres
    const alunosFiltrados = busca.length >= 3
        ? alunos.filter((aluno) =>
            aluno.nome.toLowerCase().includes(busca.toLowerCase())
        )
        : alunos;

    async function buscarAlunos() {
        const resposta = await fetch('/api/alunos');
        const dados = await resposta.json();
        setAlunos(dados);
    }

    async function excluirAlunos(event) {
        event.preventDefault();
        if (!confirm("Deseja realmente excluir este aluno?")) {
            return;
        }
        const resposta = await fetch("/api/alunos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_aluno: event.target.dataset.id,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        buscarAlunos();
    }


    return (
        <>
            <Header />

            <main className={styles.container}>
                <section className={styles.headerSection}>
                    <h2>Lista de Alunos</h2>

                    <p>
                        Consulte todos os alunos cadastrados no sistema.
                    </p>
                </section>

                <section className={styles.tableCard}>

                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar aluno (digite pelo menos 3 letras)..."
                            className={styles.search}
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        <div className={styles.total}>
                            Total: {alunosFiltrados.length} {alunosFiltrados.length === 1 ? 'aluno' : 'alunos'}
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Série</th>
                                <th>RA</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                alunosFiltrados.map((aluno) => {
                                    return (
                                        <tr key={aluno.id_aluno}>
                                            <td>{aluno.id_aluno}</td>
                                            <td>{aluno.nome}</td>
                                            <td>{aluno.idade}</td>
                                            <td>{aluno.serie}</td>
                                            <td>{aluno.ra}</td>
                                            <td>
                                                <div className={styles.actionCell}>
                                                    <button className={styles.editBtn} onClick={() => editarAlunos(aluno.id_aluno)}>✏️ Editar</button>
                                                    <button className={styles.deleteBtn} onClick={(e) => excluirAlunos(e)} data-id={aluno.id_aluno}>🗑️ Excluir</button>
                                                </div>
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>

                </section>
            </main>
        </>
    );
}