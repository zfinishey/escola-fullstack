import db from "../../db/banco";
import { NextResponse } from "next/server";

export async function listAlunos() {
    const alunos = db.prepare("SELECT * FROM alunos ORDER BY nome").all();
    return NextResponse.json(alunos);
}
export async function SalvaAlunos(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO alunos (nome, idade, serie, ra) VALUES (?,?,?,?)`);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra);
        return NextResponse.json({ mensagem: "Aluno cadastrado com sucesso!" });

    } catch (error) {
        console.error("Erro ao cadastrar aluno!", error);
    }
}

export async function editAlunos(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?`);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, dados.id_aluno);
        return NextResponse.json({ mensagem: "Aluno editado com sucesso!" });

    } catch (error) {
        console.error("Erro ao editar aluno!", error);
    }
}
export async function excluiAlunos(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM alunos WHERE id_aluno = ?`);
        sql.run(dados.id_aluno);
        return NextResponse.json({ mensagem: "Aluno excluido com sucesso!" });

    } catch (error) {
        console.error("Erro ao excluir aluno!", error);
    }
}