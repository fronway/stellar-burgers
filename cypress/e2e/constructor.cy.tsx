describe('Страница конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет ингредиенты в конструктор (булка + начинка)', () => {
    cy.contains('Флюоресцентная булка R2-D3')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Выберите булки').should('not.exist');
    cy.contains('Выберите начинку').should('not.exist');
    cy.contains('Флюоресцентная булка R2-D3 (верх)').should('exist');
    cy.contains('Флюоресцентная булка R2-D3 (низ)').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('открывает и закрывает модальное окно ингредиента (крестик и оверлей)', () => {
    cy.contains('Флюоресцентная булка R2-D3')
      .closest('a')
      .click();

    cy.get('#modals').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Флюоресцентная булка R2-D3').should('exist');
      cy.get('button[type="button"]').first().find('svg').click();
    });

    cy.get('#modals').should('be.empty');

    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('a')
      .click();

    cy.get('#modals').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });
    cy.get('#modals').children().last().click({ force: true });

    cy.get('#modals').should('be.empty');
  });

  it('создаёт заказ: подставляет токены, показывает номер, закрывает и очищает конструктор', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=Bearer test-access-token';
      }
    });
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('Флюоресцентная булка R2-D3')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('#modals').within(() => {
      cy.contains('12345').should('exist');
      cy.get('button[type="button"]').first().find('svg').click();
    });

    cy.get('#modals').should('be.empty');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});

