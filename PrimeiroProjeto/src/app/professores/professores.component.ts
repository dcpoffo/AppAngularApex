import { ProfessorService } from './../services/professor.service';
import { Professor } from './../models/Professor';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public titulo = 'Professores';
  public professorSelecionado: Professor;
  public professorForm: FormGroup;
  public modalRef: BsModalRef;
  public modo = 'post';

  public professores = [];

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private profService: ProfessorService) {
    this.criarForm();
  }

  // tslint:disable-next-line: typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.carregarProfessores();
  }

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
  criarForm() {
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  professorSubmit() {
    this.salvarProfessor(this.professorForm.value);
  }

  salvarProfessor(professor: Professor) {
    (professor.id === 0 ? this.modo = 'post' : this.modo = 'put');

    this.profService[this.modo](professor).subscribe(
      (retorno: Professor) => {
        console.log(retorno);
        this.voltar();
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  professorSelected(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar() {
    this.professorSelecionado = null;
  }

  professorNovo() {
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

}
