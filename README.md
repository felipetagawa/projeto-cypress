# Testes Automatizados - Cadastro de Produtos (GA)

Este projeto utiliza o Cypress para automatizar o fluxo de cadastro de produtos no sistema GA.

O teste cobre três cenários principais:
- Cadastro de produto simples
- Cadastro de produto com grade
- Cadastro de produto com complemento (2 etapas)

O objetivo é validar o comportamento da tela de cadastro para diferentes tipos de produto, garantindo que os dados sejam preenchidos corretamente e o processo finalizado com sucesso.

## Arquivo de Teste

O script está localizado em:

```
cypress/e2e/cadastroProdutos.cy.js
```

## Como rodar o projeto

1. Clone o repositório:

```
git clone https://github.com/felipetagawa/projeto-cypress.git
```

2. Acesse a pasta do projeto e instale as dependências:

```
cd seu-diretório
npm install
```

3. Execute o Cypress:

```
npx cypress open
```

Selecione o arquivo `cadastroProdutos.cy.js` para rodar o teste interativo ou use:

```
npx cypress run --spec cypress/e2e/cadastroProdutos.cy.js
```

## Vídeo de demonstração

O vídeo com o teste rodando pode ser acessado [aqui](https://drive.google.com/file/d/1I8Z_00Jxg6wi-3LBiSxhTjGeWjrHMIJj/view?usp=sharing).

## Autor

Felipe Tagawa Okamoto
