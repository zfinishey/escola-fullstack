'use client';

import { useState } from "react";
import Header from "../components/header";
import styles from "./listanota.module.css";

export default function ListaNota() {
    return (
        <>
            <Header />
            <h2>Lista de Notas dos Alunos</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Aluno</th>
                    <th>T1</th>
                    <th>T2</th>
                    <th>N1</th>
                    <th>N2</th>
                    <th>N3</th>
                    <th>Nota Total</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Kelvin Destaque</td>
                        <td>9.0</td>
                        <td>8.5</td>
                        <td>9.5</td>
                        <td>9.0</td>
                        <td>10.0</td>
                        <td>9.2</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Pedro</td>
                        <td>8.0</td>
                        <td>7.5</td>
                        <td>8.5</td>
                        <td>8.0</td>
                        <td>9.0</td>
                        <td>8.2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Matheus</td>
                        <td>10.0</td>
                        <td>9.5</td>
                        <td>10.0</td>
                        <td>9.0</td>
                        <td>9.5</td>
                        <td>9.6</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Lucas Silva</td>
                        <td className={styles.notaBaixa}>6.5</td>
                        <td>7.5</td>
                        <td className={styles.notaBaixa}>6.0</td>
                        <td>7.0</td>
                        <td>8.0</td>
                        <td>7.0</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Amanda Costa</td>
                        <td className={styles.notaBaixa}>4.0</td>
                        <td className={styles.notaBaixa}>5.5</td>
                        <td className={styles.notaBaixa}>6.0</td>
                        <td className={styles.notaBaixa}>5.0</td>
                        <td className={styles.notaBaixa}>6.0</td>
                        <td className={styles.notaBaixa}>5.3</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
