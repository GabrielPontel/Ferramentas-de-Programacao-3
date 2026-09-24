import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/angular";
import { ProdutosService } from "../api/produtos.service";
import { Router, RouterLink } from "@angular/router";
import { Produto } from "../modelos/produto.modelo";
import { Categoria } from "../modelos/categoria.modelo";

@Component({
  selector: "app-produto-cadastro",
  templateUrl: "./produto-cadastro.page.html",
  styleUrls: ["./produto-cadastro.page.scss"],
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonList,
    RouterLink,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelectOption,
    IonItem,
    IonSelect,
  ],
})
export class ProdutoCadastroPage implements OnInit {
  private produtosService = inject(ProdutosService);

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

  constructor() {}

  ngOnInit() {}

  protected cadastrar() {
    if (this.form.valid) {
      const valores = this.form.getRawValue();

      //dessse jeito grava os outros campos como numbers
    
      const produto: Produto = {
        id: valores.id,
        nome: valores.nome,
        categoria: valores.categoria,
        fornecedor:valores.fornecedor,
        preco: Number(valores.preco),
        quantidade: Number(valores.quantidade),
      };

      this.produtosService.cadastrar(produto).subscribe({
        next: () => {
          this.router.navigate(["/produto-listagem"]);
        },
        error: () => {
          console.log("Não foi possivel cadastrar");
        },
      });
      this.form.reset();
    } else {
      console.log("Formulario invalido!!!");
    }
  }
}
