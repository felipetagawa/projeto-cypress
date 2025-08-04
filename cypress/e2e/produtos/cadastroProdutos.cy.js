describe("Fluxo de cadastro de produtos: normal, com grade e com complemento", () => {
  beforeEach(() => {
    cy.login();
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

    cy.get("#frmDialogs\\:j_idt1134_input")
      .should("be.visible")
      .type("001", { delay: 100 });

    cy.get("#frmDialogs\\:complementoItemEtapaDescricao")
      .should("be.visible")
      .focus()
      .clear()
      .type("Selecione o tipo de pao:", { delay: 100 });

    cy.get("#frmDialogs\\:j_idt1142")
      .should("be.visible")
      .focus()
      .clear()
      .type("Pao de forma", { delay: 100 });

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
