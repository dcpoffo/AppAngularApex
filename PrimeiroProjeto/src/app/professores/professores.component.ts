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
  public modo: 'post';

  public professores = [];

  constructor(private formBuilder:FormBuilder,
              private modalService: BsModalService,
              private professorServico: ProfessorService) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

    criarForm() {
      this.professorForm = this.formBuilder.group({
        id: [''],
        nome: ['', Validators.required],
        disciplina: ['', Validators.required]
      });
    }

    salvarProfessor(professor:Professor){
      this.professorServico.put(professor).subscribe(
        (retorno: Professor) => {
          console.log(retorno);
          this.carregarProfessores();
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }

    carregarProfessores(){
      this.professorServico.getAll().subscribe(
        (resultado: Professor[]) => {
          this.professores = resultado;
        },
        (erro: any) => {
          console.log(erro);
        }
      );
    }

    professorSubmit() {
      //console.log(this.professorForm.value);
      this.salvarProfessor(this.professorForm.value);
    }

  professorSelect(professor: Professor){
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  voltar(){
    this.professorSelecionado = null;
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }

}
