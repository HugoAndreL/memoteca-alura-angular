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

  // Funcionalide de ler os Pensamentos e de ler os Pensamentos
  listar(page: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itens = 6;
    let params = new HttpParams().set('_page', page).set('_limit', itens);

    if(filtro.trim().length > 2) {
      params = params.set('q', filtro)
    }

    if(favoritos) {
      params = params.set('favorito', true)
    }
    //return this.http.get<Pensamento[]>(`${this.API}?_page=${page}&_limit=${itens}`);
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  // Funcionalidade de criar os Pensamentos
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  // Funcionalidade de editar os Pensamentos
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  // Funcionalidade de excluir os Pensamentos
  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  // Fucionalidade de buscar os Pensamentos
  buscar(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  // Funcionalidade de favoritar os Pensamentos
  favoritar(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    const url = `${this.API}/${pensamento.id}`;
    return this.editar(pensamento);
  }
}
