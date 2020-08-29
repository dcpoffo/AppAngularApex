import { Disciplina } from './Disciplina';

export class Professor {
    constructor() {
        this.id = 0;
        this.nome = '';
        this.disciplinas = [];
    }

    id: number;
    nome: string;
    disciplinas: Disciplina[];
}
