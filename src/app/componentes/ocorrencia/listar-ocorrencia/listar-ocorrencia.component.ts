import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ocorrencia } from 'src/app/modelos/chamado';
import { OcorrenciaService } from 'src/app/services/ocorrencia.service';

@Component({
  selector: 'app-listar-ocorrencia',
  templateUrl: './listar-ocorrencia.component.html',
  styleUrls: ['./listar-ocorrencia.component.css']
})
export class ListarOcorrenciaComponent implements OnInit {

  OCORRENCIA_INFO: Ocorrencia [] = []
  FILTRAR_DADOS: Ocorrencia [] = []

  displayedColumns: string[] = ['id', 'titulo', 'usuario', 'servidor', 'dataAbertura','prioridade', 'status', 'acoes',];
  dataSource = new MatTableDataSource<Ocorrencia>(this.OCORRENCIA_INFO);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private service: OcorrenciaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe(resposta => {
      this.OCORRENCIA_INFO = resposta;
      this.dataSource.data = resposta;
      this.dataSource.paginator = this.paginator;
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  status(status: any): string{
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  prioridade(prioridade: any): string{
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  ordenaStatus(status: any): void {
    let list: Ocorrencia[] = []
    this.OCORRENCIA_INFO.forEach(element => {
      if(element.status == status)
      list.push(element)
    });
    this.FILTRAR_DADOS = list;
    this.dataSource = new MatTableDataSource<Ocorrencia>(list);
    this.dataSource.paginator = this.paginator;
  }
}
