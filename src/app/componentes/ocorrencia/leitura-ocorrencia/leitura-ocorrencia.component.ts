import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';

@Component({
  selector: 'app-leitura-ocorrencia',
  templateUrl: './leitura-ocorrencia.component.html',
  styleUrls: ['./leitura-ocorrencia.component.css']
})
export class LeituraOcorrenciaComponent implements OnInit {

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

  constructor(
    private servicoOcorrencia: OcorrenciaService,
    private alerta: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ocorrencia.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.servicoOcorrencia.findById(this.ocorrencia.id).subscribe(resposta => {
      this.ocorrencia = resposta;
    }, ex => {
      this.alerta.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string{
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string{
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

}