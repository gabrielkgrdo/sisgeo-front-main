import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css']
})
export class AtualizarUsuarioComponent implements OnInit {

 
  usuario: Usuario = {
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

  update(): void {
    this.service.update(this.usuario).subscribe(() => {
      this.alert.success('Usuario atualizado com sucesso', 'Atualização');
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

  addPerfil(perfil: any): void {
    
    if(this.usuario.perfis.includes(perfil)){
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil),1);
      console.log(this.usuario.perfis);   
    }else{
      this.usuario.perfis.push(perfil);
      console.log(this.usuario.perfis);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid
    && this.email.valid && this.senha.valid
  }
}
