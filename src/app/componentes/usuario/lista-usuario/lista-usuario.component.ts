import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  
  SERVIDOR_INFO: Usuario [] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Usuario>(this.SERVIDOR_INFO);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.SERVIDOR_INFO = resposta
      this.dataSource = new MatTableDataSource<Usuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Função para remover a máscara do CPF
  removeMascaraCpf(cpfComMascara: string): string {
    return cpfComMascara.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }

  formatarCpf(cpf: string): string {
    const cpfSemMascara = this.removeMascaraCpf(cpf);
    // Adicione a máscara (###.###.###-##)
    return cpfSemMascara.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
 }
 


}
