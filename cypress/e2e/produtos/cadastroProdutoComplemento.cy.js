describe("Cadastro de produto com complemento", () => {
  beforeEach(() => {
    cy.login(); // Realiza login antes de cada teste
  });

  it("Deve cadastrar um produto com complemento com sucesso", () => {
    const nomeProduto = `Produto com complemento${Date.now()}`; // Nome único baseado em timestamp

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

    //Aqui começa o cadastro do complemento

    cy.contains("a", "Complementos do Item").should("be.visible").click();

    cy.get("#frmDialogs\\:j_idt1134_input").should("be.visible").type("001");

    cy.get("#frmDialogs\\:complementoItemEtapaDescricao")
      .should("be.visible")
      .type("Selecione o tipo de pao:");

    cy.get("#frmDialogs\\:j_idt1142").type("Pao de forma");

    cy.get("#frmDialogs\\:j_idt1146").clear();

    cy.get("#frmDialogs\\:j_idt1146").type("1,00");

    cy.get("#frmDialogs\\:filtroTipoPedido").click();

    cy.contains("li", "Escolha Única").click();

    cy.get("#frmDialogs\\:j_idt1156 > .ui-button-text").click();

    cy.contains("Complemento salvo com sucesso!").should("be.visible");

    //Segunda etapa

    cy.get("#frmDialogs\\:j_idt1134_input").should("be.visible").type("002");

    cy.get("#frmDialogs\\:complementoItemEtapaDescricao")
      .should("be.visible")
      .type("Adicionais");

    cy.get("#frmDialogs\\:j_idt1142").type("Milho");

    cy.get("#frmDialogs\\:j_idt1146").clear();

    cy.get("#frmDialogs\\:j_idt1146").type("1,00");

    cy.get("#frmDialogs\\:filtroTipoPedido").click();

    cy.contains("li", "Escolha Múltipla").click();

    cy.get("#frmDialogs\\:j_idt1156 > .ui-button-text").click();

    cy.contains("Complemento salvo com sucesso!").should("be.visible");

    cy.get("iframe#iframe-sz-chat").invoke("css", "display", "none");

    cy.get("#frmDialogs\\:j_idt1177").should("be.visible").click();

    cy.contains("button", "Salvar").should("be.visible").click();
  });
});
