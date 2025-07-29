Cypress.Commands.add("login", () => {
  cy.visit("/entrar");
  cy.get("#email").should("be.visible").type(Cypress.env("email"));
  cy.get("#senhaLogin").should("be.visible").type(Cypress.env("password"));
  cy.get("button").contains("Entrar").should("be.visible").click();
  cy.get('[data-ri="0"] > :nth-child(4) > a').should("be.visible").click();
  cy.url().should("include", "/dashboard");
  cy.contains("Dashboard").should("be.visible");
}); //Acessa a página e faz o login

Cypress.Commands.add("preencherProdutoBase", (nomeProduto) => {
  cy.contains("Cadastros").should("be.visible").click();
  cy.contains("Produto").should("be.visible").click();
  cy.contains("Novo Produto").should("be.visible").click();
  cy.get("#frmTabelaProd\\:nome").type(nomeProduto);
  cy.get("#frmTabelaProd\\:cref").clear();
  cy.get("#frmTabelaProd\\:marca").type("MARCA TESTE");
  cy.get("#frmTabelaProd\\:unid").clear().type("UN");
  cy.get("#frmTabelaProd\\:vlcusto").clear().type("1");
  cy.get("#frmTabelaProd\\:vlvenda").clear();
  cy.wait(300);
  cy.get("#frmTabelaProd\\:vlvenda").type("2");
  cy.get("#frmTabelaProd\\:vlvenda", { timeout: 8000 }).should(
    "have.value",
    "2,00"
  );
  cy.get("#frmTabelaProd\\:ncm").clear().type("99999999");
}); //Preenche os campos base necessários para o cadastro de um produto.
