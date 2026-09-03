'use client';

import { useState } from "react";
import Header from "../components/header";
import styles from "./listaluno.module.css";

export default function ListaAluno() {
    return (
        <>
            <Header />
            <h2>Lista de Alunos</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Série</th>
                    <th>RA</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Kelvin Destaque</td>
                        <td>18</td>
                        <td>3°A</td>
                        <td>23230097</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Pedro</td>
                        <td>18</td>
                        <td>3°A</td>
                        <td>23230003</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Matheus</td>
                        <td>18</td>
                        <td>3°A</td>
                        <td>23230011</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}