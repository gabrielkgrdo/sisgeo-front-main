import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-deletar-usuario',
  templateUrl: './deletar-usuario.component.html',
  styleUrls: ['./deletar-usuario.component.css']
})
export class DeletarUsuarioComponent implements OnInit {

  usuario: Usuario = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: UsuarioService,
    private alert: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuario.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.usuario.id).subscribe(resposta => {
      resposta.perfis = []
      this.usuario = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.usuario.id).subscribe(() => {
      this.alert.success('Usuario deletado com sucesso', 'Sucesso!');
      this.router.navigate(["usuarios"]);
    }, ex => {
      if (Array.isArray(ex.error)) {
        ex.error.forEach(element => {
          this.alert.error(element.message);
        });
      } else if (ex.error && ex.error.message) {
        this.alert.error(ex.error.message);
      } else {
        this.alert.error('Erro desconhecido');
      }
    })
  }

}

