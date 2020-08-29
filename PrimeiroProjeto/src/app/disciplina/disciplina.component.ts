import { DialogService } from './../services/dialog.service';
import { Disciplina } from './../models/Disciplina';
import { Professor } from './../models/Professor';
import { ProfessorService } from './../services/professor.service';
import { DisciplinaService } from './../services/disciplina.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.scss']
})
export class DisciplinaComponent implements OnInit {

  public modalRef: BsModalRef;
  public disciplinaForm: FormGroup;
  public titulo = 'Disciplinas';
  public disciplinaSelecionada: Disciplina;
  public modo = 'post';

  public disciplinas: Disciplina[];

  public professores = [];

  constructor(private fb: FormBuilder,
              private disciplinaService: DisciplinaService,
              private profService: ProfessorService,
              private dialogService: DialogService) {
    this.criarForm();
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.carregarProfessores();
    this.carregarDisicplinas();
  }

  // tslint:disable-next-line: typedef
  carregarProfessores() {
    this.profService.getAll().subscribe(
      (resultado: Professor[]) => {
        this.professores = resultado;
        console.log(resultado);
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line: typedef
  carregarDisicplinas() {
    this.disciplinaService.getAll().subscribe(
      (resultado: Disciplina[]) => {
        this.disciplinas = resultado;
        console.log(resultado);
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line: typedef
  criarForm() {
    this.disciplinaForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      professorId: ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  disciplinaSubmit() {
    this.salvarDisciplina(this.disciplinaForm.value);
  }

  // tslint:disable-next-line: typedef
  salvarDisciplina(disciplina: Disciplina) {
    (disciplina.id === 0 ? this.modo = 'post' : this.modo = 'put');

    this.disciplinaService[this.modo](disciplina).subscribe(
      (retorno: Disciplina) => {
        console.log(retorno);
        this.carregarDisicplinas();
        this.voltar();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line: typedef
  disciplinaSelected(disciplina: Disciplina) {
    this.disciplinaSelecionada = disciplina;
    this.disciplinaForm.patchValue(disciplina);
  }

  // tslint:disable-next-line: typedef
  voltar() {
    this.disciplinaSelecionada = null;
  }

  // tslint:disable-next-line: typedef
  disciplinaNovo() {
    this.disciplinaSelecionada = new Disciplina();
    this.disciplinaForm.patchValue(this.disciplinaSelecionada);
  }

  // tslint:disable-next-line: typedef
  public openConfirmationDialog(disciplina: Disciplina) {
    console.log(disciplina);
    this.dialogService.confirmar('Excluir...', 'Deseja realmente excluir?')
    .then(
      (confirmado) => this.excluirDisciplina(disciplina, confirmado)
    )
    .catch(
      (erro: any) => console.log(erro)
    );
  }

  // tslint:disable-next-line: typedef
  excluirDisciplina(disciplina: Disciplina, confirmado: boolean) {
    if (confirmado){
      console.log(disciplina);
      this.disciplinaService.delete(disciplina.id).subscribe(
        (retorno: string) => {
          console.log(retorno);
          this.carregarDisicplinas();
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }
  }

}
