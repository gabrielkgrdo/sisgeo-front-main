import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servidor } from 'src/app/modelos/servidor';
import { ServidorService } from 'src/app/services/servidor.service';


@Component({
  selector: 'app-deletar-servidor',
  templateUrl: './deletar-servidor.component.html',
  styleUrls: ['./deletar-servidor.component.css']
})
export class DeletarServidorComponent implements OnInit {

  servidor: Servidor = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ServidorService,
    private alert: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.servidor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.servidor.id).subscribe(resposta => {
      resposta.perfis = []
      this.servidor = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.servidor.id).subscribe(() => {
      this.alert.success('Servidor deletado com sucesso', 'Sucesso!');
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

}

