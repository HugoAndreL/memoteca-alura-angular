import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http: HttpClient) { }

  // Funcionalide de ler
  listar(page: number, filtro: string): Observable<Pensamento[]> {
    const itens = 6;
    let params = new HttpParams().set('_page', page).set('_limit', itens);

    if(filtro.trim().length > 2) {
      params = params.set('q', filtro)
    }

    //return this.http.get<Pensamento[]>(`${this.API}?_page=${page}&_limit=${itens}`);
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  // Funcionalidade de criar
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  // Funcionalidade de editar
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  // Funcionalidade de excluir
  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  // Fucionalidade de buscar
  buscar(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  // Funcionalidade de favoritar
  favoritar(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    const url = `${this.API}/${pensamento.id}`;
    return this.editar(pensamento);
  }
}
