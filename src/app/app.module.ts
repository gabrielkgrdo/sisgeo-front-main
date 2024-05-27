import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';


import { NavComponent } from './componentes/nav/nav.component';
import { HomeComponent } from './componentes/home/home.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ListaServidorComponent } from './componentes/servidor/lista-servidor/lista-servidor.component';
import { LoginComponent } from './componentes/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { CriarServidorComponent } from './componentes/servidor/criar-servidor/criar-servidor.component';
import { NgxMaskModule } from 'ngx-mask';
import { AtualizarServidorComponent } from './componentes/servidor/atualizar-servidor/atualizar-servidor.component';
import { DeletarServidorComponent } from './componentes/servidor/deletar-servidor/deletar-servidor.component';
import { CriarUsuarioComponent } from './componentes/usuario/criar-usuario/criar-usuario.component';
import { ListaUsuarioComponent } from './componentes/usuario/lista-usuario/lista-usuario.component';
import { DeletarUsuarioComponent } from './componentes/usuario/deletar-usuario/deletar-usuario.component';
import { AtualizarUsuarioComponent } from './componentes/usuario/atualizar-usuario/atualizar-usuario.component';
import { ListarOcorrenciaComponent } from './componentes/ocorrencia/listar-ocorrencia/listar-ocorrencia.component';
import { CriarOcorrenciaComponent } from './componentes/ocorrencia/criar-ocorrencia/criar-ocorrencia.component';
import { AtualizarOcorrenciaComponent } from './componentes/ocorrencia/atualizar-ocorrencia/atualizar-ocorrencia.component';
import { LeituraOcorrenciaComponent } from './componentes/ocorrencia/leitura-ocorrencia/leitura-ocorrencia.component';
import { RegistroComponent } from './componentes/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    ListaServidorComponent,
    LoginComponent,
    CriarServidorComponent,
    AtualizarServidorComponent,
    DeletarServidorComponent,
    CriarUsuarioComponent,
    ListaUsuarioComponent,
    DeletarUsuarioComponent,
    AtualizarUsuarioComponent,
    ListarOcorrenciaComponent,
    CriarOcorrenciaComponent,
    AtualizarOcorrenciaComponent,
    LeituraOcorrenciaComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
    
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
