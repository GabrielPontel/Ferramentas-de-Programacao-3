import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutosService } from '../api/produtos.service';
import { Produto } from '../modelos/produto.modelo';
import { Categoria } from '../modelos/categoria.modelo';

@Component({
  selector: 'app-produto-alteracao',
  templateUrl: './produto-alteracao.page.html',
  styleUrls: ['./produto-alteracao.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonList, IonItem, IonInput, IonSelectOption, IonSelect,IonButton, RouterLink]
})
export class ProdutoAlteracaoPage implements OnInit {

  private route = inject(ActivatedRoute);
  private produtosService = inject(ProdutosService);
  private produto! : Produto;
  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);

  protected form = this.formBuilder.group({
    id: [""],
    nome: ["", Validators.required],
    categoria: [Categoria.Acessórios, Validators.required],
    preco: [0, Validators.min(0)],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    fornecedor: ["", Validators.required],
  });

  constructor() { 
    //NO ARQUIVO APP.ROUTES.TS adicionar /:id
    //{
    //  path: 'produto-alteracao/:id',
    //  loadComponent: () => import('./produto-alteracao/produto-alteracao.page').then( m => m.ProdutoAlteracaoPage)
    //}

    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.obterProduto(id);
  }

  ngOnInit() {
  }

  private obterProduto(id:string){
    this.produtosService.obterPeloId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.form.setValue(this.produto);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  protected alterar(){
    if(this.form.valid){
      const valores = this.form.getRawValue();

      this.produto = {
        id: valores.id,
        nome: valores.nome,
        categoria: valores.categoria,
        fornecedor:valores.fornecedor,
        preco: Number(valores.preco),
        quantidade: Number(valores.quantidade),
      };
      this.produtosService.alterar(this.produto).subscribe({
        next: () => {
          this.router.navigate(['/produto-listagem']);
        },
        error: () => {
          console.log('Não foi possivel cadastrar');
        }
      });
    } else {
      console.log('Formulário invalido');
    }
  }
}
