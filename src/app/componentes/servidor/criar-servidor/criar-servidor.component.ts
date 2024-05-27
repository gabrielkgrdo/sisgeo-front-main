import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servidor } from 'src/app/modelos/servidor';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-criar-servidor',
  templateUrl: './criar-servidor.component.html',
  styleUrls: ['./criar-servidor.component.css']
})
export class CriarServidorComponent implements OnInit {

  servidor: Servidor = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cpf: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  senha: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private service: ServidorService,
    private alert: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
  create(): void {
    this.service.create(this.servidor).subscribe(() => {
      this.alert.success('Servidor cadastrado com sucesso', 'Cadastro');
      this.router.navigate(["servidores"]);
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

  addPerfil(perfil: any): void {
    
    if(this.servidor.perfis.includes(perfil)){
      this.servidor.perfis.splice(this.servidor.perfis.indexOf(perfil),1);
      console.log(this.servidor.perfis);   
    }else{
      this.servidor.perfis.push(perfil);
      console.log(this.servidor.perfis);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid
    && this.email.valid && this.senha.valid
  }
}

