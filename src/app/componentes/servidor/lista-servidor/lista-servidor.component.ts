import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Servidor } from 'src/app/modelos/servidor';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-lista-servidor',
  templateUrl: './lista-servidor.component.html',
  styleUrls: ['./lista-servidor.component.css']
})
export class ListaServidorComponent implements OnInit {
  
  SERVIDOR_INFO: Servidor [] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Servidor>(this.SERVIDOR_INFO);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ServidorService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.SERVIDOR_INFO = resposta
      this.dataSource = new MatTableDataSource<Servidor>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
