import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUserNome: string | null;

  constructor(public autenticacaoServico: AutenticacaoService) { 
    this.currentUserNome = '';
  }

  ngOnInit(): void {
    this.currentUserNome = this.autenticacaoServico.getNomeUsuario();
  }

}
