import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  }

  criarPensamento() {
    this.service.criar(this.pensamento).subscribe(() => {
      // Outra fucionalidade do router
      this.router.navigate(['/listarPensamento']);
    })
  }

  cancelarPensamento() {
    this.router.navigate(['/listarPensamento']);
  }

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {}
}
