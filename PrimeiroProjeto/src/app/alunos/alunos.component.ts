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

    constructor(private formBuilder:FormBuilder,
                private modalService: BsModalService,
                private alunoServico: AlunoService) {
    this.criarForm();
   }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

   criarForm() {
     this.alunoForm = this.formBuilder.group({
       id: [''],
       nome: ['',Validators.required],
       sobrenome: ['',Validators.required],
       telefone: ['',Validators.required]
     });
   }

   alunoSubmit() {
     //console.log(this.alunoForm.value);
     this.salvarAluno(this.alunoForm.value);
   }

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoServico.getAll().subscribe(
      (resultado: Aluno[]) => {
        this.alunos = resultado;
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  salvarAluno(aluno: Aluno){
    (aluno.id === 0 ? this.modo = 'post'  : this.modo = 'put');

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

  alunoSelect(aluno: Aluno){
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar(){
    this.alunoSelecionado = null;
  }

  novoAluno(){
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

}
