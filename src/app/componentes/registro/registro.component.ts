import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: Usuario = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cpf: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  senha: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private service: UsuarioService,
    private alert: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.usuario).subscribe(() => {
      this.alert.success('Usuário cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['login']);
    }, (ex) => {
      if (Array.isArray(ex.error)) {
        ex.error.forEach((element) => {
          this.alert.error(element.message);
        });
      } else if (ex.error && ex.error.message) {
        this.alert.error(ex.error.message);
      } else {
        this.alert.error('Erro desconhecido');
      }
    });
  }

  addPerfil(perfil: any): void {
    if (this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  validaPerfis(): boolean {
    return this.usuario.perfis.length > 0;
  }
  

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.senha.valid &&
      this.validaPerfis()
    );
  }
}
