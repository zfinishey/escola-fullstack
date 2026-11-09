import db from "../../db/banco";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const alunos = db.prepare("SELECT * FROM alunos ORDER BY nome").all();
        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao buscar alunos!", error);
        return NextResponse.json({ erro: "Erro ao buscar alunos!" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO alunos (nome, idade, serie, ra) VALUES (?,?,?,?)`);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra);
        return NextResponse.json({ mensagem: "Aluno cadastrado com sucesso!" });

    } catch (error) {
        console.error("Erro ao cadastrar aluno!", error);
        return NextResponse.json({ erro: "Erro ao cadastrar aluno!" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?`);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, dados.id_aluno);
        return NextResponse.json({ mensagem: "Aluno editado com sucesso!" });

    } catch (error) {
        console.error("Erro ao editar aluno!", error);
        return NextResponse.json({ erro: "Erro ao editar aluno!" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM alunos WHERE id_aluno = ?`);
        sql.run(dados.id_aluno);
        return NextResponse.json({ mensagem: "Aluno excluido com sucesso!" });

    } catch (error) {
        console.error("Erro ao excluir aluno!", error);
        return NextResponse.json({ erro: "Erro ao excluir aluno!" }, { status: 500 });
    }
}