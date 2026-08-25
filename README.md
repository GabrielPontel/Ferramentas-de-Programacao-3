# Ferramentas para Programação III (FPR3)

Repositório com as aulas e projetos da disciplina de **Ferramentas para Programação III**, do Bacharelado em Ciência da Computação do **IFSP - Câmpus Presidente Epitácio**.

A disciplina trabalha o desenvolvimento de **aplicações mobile híbridas com Ionic e Angular**: da sintaxe do TypeScript e do novo controle de fluxo nos templates até o consumo de APIs REST com JSON Server e o uso de environments.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Linguagem | TypeScript |
| Framework | Angular (standalone components, rotas, services) |
| UI mobile | Ionic Framework |
| Build nativo | Capacitor (Android / iOS) |
| API de desenvolvimento | JSON Server |

## Conteúdo

| Pasta | Conteúdo |
| --- | --- |
| `10-08 Primeiro contato com typesript @for` | Primeiro projeto Ionic/Angular: sintaxe do TypeScript e o bloco `@for` no template |
| `Aula 17-08 -> Inserir, remover e listar` | Manipulação de listas: inserir, remover e listar itens na tela |
| `aula-17-08-marcador-de-truco` | Marcador de pontos de truco - exercício prático de estado e eventos |
| `Aula 24-08 -> JsonServer-Environments` | Consumo de API com JSON Server: services em `api/`, modelos e environments |
| `03-07 Manipulando Arquivo JSON.txt` | Anotações de aula sobre manipulação de arquivos JSON |

## Como rodar

Cada pasta é um projeto independente e autocontido. Entre na pasta desejada e execute:

```bash
npm install
ionic serve
```

A aplicação abre em `http://localhost:8100`.

Nos projetos que consomem API, suba o JSON Server em outro terminal e confira a URL configurada em `src/environments/`.

## Observações

- Os nomes das pastas seguem a data da aula (dd-mm).
- Artefatos de build (`node_modules/`, `www/`, `dist/`) não devem ser versionados.

---

Autor: **Gabriel Pontel de Mori** - [@GabrielPontel](https://github.com/GabrielPontel)
