import { DialogService } from './../services/dialog.service';
import { AlunoService } from './../services/aluno.service';
import { Aluno } from './../models/Aluno';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alunos',
  templateUrl: './Alunos.component.html',
  styleUrls: ['./Alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public alunoForm: FormGroup;
  public modalRef: BsModalRef;
  public modo = 'post';

  public alunos = [];

  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private alunoServico: AlunoService,
    private dialogService: DialogService) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  excluirAluno(aluno: Aluno, confirmado: boolean) {
    if (confirmado) {
      this.alunoServico.delete(aluno.id).subscribe(
        (retorno: string) => {
          console.log(retorno);
          this.carregarAlunos();
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }
  }

  public openConfirmationDialog(aluno: Aluno) {
    console.log(aluno);
    this.dialogService.confirmar('Excluir...', 'Deseja realmente excluir?')
      .then(
        (confirmado) => this.excluirAluno(aluno, confirmado)
      )
      .catch(
        (erro: any) => console.log(erro)
      );
  }

  criarForm() {
    this.alunoForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit() {
    //console.log(this.alunoForm.value);
    this.salvarAluno(this.alunoForm.value);
  }

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunoServico.getAll().subscribe(
      (resultado: Aluno[]) => {
        this.alunos = resultado;
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  salvarAluno(aluno: Aluno) {
    (aluno.id === 0 ? this.modo = 'post' : this.modo = 'put');

    this.alunoServico[this.modo](aluno).subscribe(
      (retorno: Aluno) => {
        console.log(retorno);
        this.carregarAlunos();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar() {
    this.alunoSelecionado = null;
  }

  novoAluno() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

}
