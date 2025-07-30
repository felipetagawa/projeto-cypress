describe("Cadastro de produto com grade", () => {
  beforeEach(() => {
    cy.login(); // Login reutilizado
  });

  it("Deve cadastrar um produto com grade com sucesso", () => {
    const nomeProduto = `Produto grade ${Date.now()}`;

    cy.preencherProdutoBase(nomeProduto);

    cy.contains("a", "Grade").should("be.visible").click();

    cy.get(
      "#frmGrade\\:allVariante > .ui-selectonemenu-trigger > .ui-icon"
    ).click();

    cy.get("#frmGrade\\:allVariante_0").click();

    cy.get(
      "#frmGrade\\:variacoes > .ui-selectonemenu-trigger > .ui-icon"
    ).click();

    cy.get("#frmGrade\\:variacoes_0").click();

    cy.get(
      "#frmGrade\\:variacoes > .ui-selectonemenu-trigger > .ui-icon"
    ).click();

    cy.get("#frmGrade\\:valorcusto").clear().type("3,00");

    cy.get("#frmGrade\\:j_idt928 > .ui-button-text").click();

    cy.get("#j_idt1041 > .ui-button-text").click({ force: true });

    // Envia o produto com grade
    cy.intercept("POST", "**/produto_editar.jsf").as("salvarProduto");
    cy.get("button").contains("Salvar").should("be.visible").click();

    cy.wait("@salvarProduto").then((interception) => {
      const params = new URLSearchParams(interception.request.body);
      const nome = params.get("frmTabelaProd:nome");
      expect(nome).to.eq(nomeProduto);
    });

    cy.contains("Salvo com sucesso").should("be.visible");
  });
});
