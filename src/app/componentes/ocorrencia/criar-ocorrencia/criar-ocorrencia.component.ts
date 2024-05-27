import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { Servidor } from 'src/app/modelos/servidor';
import { Usuario } from 'src/app/modelos/usuario';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';
import { ServidorService } from 'src/app/services/servidor.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-ocorrencia',
  templateUrl: './criar-ocorrencia.component.html',
  styleUrls: ['./criar-ocorrencia.component.css']
})
export class CriarOcorrenciaComponent implements OnInit {

  ocorrencia: Ocorrencia ={
    prioridade: '',
    status: '',
    titulo: '',
    descricaoOcorrencia: '',
    servidor: '',
    usuario: '',
    nomeUsuario: '',
    nomeServidor: '',
  }

  usuarios: Usuario[] = []
  servidores: Servidor[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  descricao: FormControl = new FormControl(null, [Validators.required])
  servidor: FormControl = new FormControl(null, [Validators.required])
  usuario: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private servicoOcorrencia: OcorrenciaService,
    private servicoUsuario: UsuarioService,
    private servicoServidor: ServidorService,
    private alerta: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllUsuarios();
    this.findAllServidores();
  }

  create(): void{
    this.servicoOcorrencia.create(this.ocorrencia).subscribe(resposta => {
      this.alerta.success('Ocorrencia criada com sucesso!', 'Aviso:');
      this.router.navigate(['ocorrencias']);
    }, ex => {
      this.alerta.error(ex.error.error);
    })
  }

  findAllUsuarios(): void{
    this.servicoUsuario.findAll().subscribe(resposta => {
      this.usuarios = resposta;
    })  
  }

  findAllServidores(): void{
    this.servicoServidor.findAll().subscribe(resposta => {
      this.servidores = resposta;
    })
  }  

  validaCampos(): boolean {
    return this.titulo.valid && this.prioridade.valid && this.status.valid &&
    this.servidor.valid && this.usuario.valid && this.descricao.valid
  }

}
