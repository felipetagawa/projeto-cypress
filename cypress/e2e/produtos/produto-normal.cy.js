describe("Cadastro de produto normal", () => {
  beforeEach(() => {
    cy.login(); // Realiza login antes de cada teste
  });

  it("Deve cadastrar um produto normal com sucesso", () => {
    const nomeProduto = `Produto teste ${Date.now()}`; // Nome único baseado em timestamp

    cy.preencherProdutoBase(nomeProduto); //Preenche os campos base necessários para o cadastro de um produto.

    cy.intercept("POST", "**/produto_editar.jsf").as("salvarProduto");

    cy.get("button").contains("Salvar").should("be.visible").click();

    // Aguarda a requisição e valida se o nome enviado é o correto
    cy.wait("@salvarProduto").then((interception) => {
      const params = new URLSearchParams(interception.request.body);
      const nome = params.get("frmTabelaProd:nome");
      expect(nome).to.eq(nomeProduto);
    });

    // Verifica a mensagem de sucesso
    cy.contains("Salvo com sucesso").should("be.visible");
  });
});
