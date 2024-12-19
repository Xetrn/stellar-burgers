describe('Проверка функциональности конструктора бургеров', () => {
  beforeEach(() => {
    // Загрузка фикстур
    cy.fixture('ingredients.json');
    cy.fixture('feed.json');
    cy.fixture('user.json');
    cy.fixture('order.json');

    // Перехватываем API запросы и возвращаем фикстуры
    cy.intercept(
      { method: 'GET', url: 'api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIngredients');
    cy.intercept(
      { method: 'GET', url: 'api/auth/user' },
      { fixture: 'user.json' }
    ).as('user');
    cy.intercept(
      { method: 'GET', url: 'api/orders/all' },
      { fixture: 'feed.json' }
    ).as('feed');
    cy.intercept(
      { method: 'POST', url: 'api/orders' },
      { fixture: 'order.json' }
    ).as('order');

    // Установка фейковых токенов для авторизации
    cy.setCookie('accessToken', 'mockTokenLayvu');
    localStorage.setItem('refreshToken', 'mockTokenLayvu');

    // Переход на главную
    cy.visit('/');
  });

  it('Проверка корректности перехвата запросов API', () => {
    // Ожидаем завершения перехвата запросов
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  it('Проверка отсутствия булки в конструкторе при старте', () => {
    cy.get(`[data-cy='constructor-module']`).should(
      'not.contain.text',
      'просто какая-то булка'
    );
  });

  it('Добавление булки в конструктор', () => {
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    // Проверяем, что булка появилась в конструкторе
    cy.get(`[data-cy='constructor-module']`).should(
      'contain.text',
      'просто какая-то булка'
    );
  });

  it('Добавление другого ингредиента в конструктор', () => {
    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    cy.get(`[data-cy='constructor-module']`).should(
      'contain.text',
      'Марсианская котлета'
    );
  });

  it('Проверка открытия модального окна при клике на ингредиент', () => {
    // Нажимаем на булку
    cy.contains('Булка кратер').click();

    // Проверяем, что модальное окно открылось
    cy.get(`[data-cy='modal']`).should('be.visible');
  });

  it('Проверка закрытия модального окна кнопкой "крестик"', () => {
    cy.contains('Булка кратер').click();

    // Закрываем модальное окно кнопкой "крестик"
    cy.get(`[data-cy='modal']`).find('button').click();

    // Проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Проверка закрытия модального окна с помощью клавиши Esc', () => {
    // Открываем модальное окно
    cy.contains('Булка кратер').click();

    // Закрываем модальное окно с помощью клавиши Esc
    cy.get('body').type('{esc}');

    // Проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Проверка закрытия модального окна при клике на оверлей', () => {
    // Открываем модальное окно
    cy.contains('Булка кратер').click();

    // Закрываем модальное окно кликом по оверлею
    cy.get(`[data-cy='modalOverlay']`).click('top', { force: true });

    // Проверяем, что модальное окно закрыто
    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('Проверка авторизации пользователя в профиле', () => {
    // Переходим на страницу профиля и проверяем имя пользователя
    cy.visit('/profile');
    cy.get(`[data-cy='profile-name']`).should('have.value', 'test');
  });

  it('Добавление ингредиентов в заказ и проверка пустого конструктора', () => {
    // Добавляем ингредиенты в заказ
    cy.get(`[data-cy='ingredients-module']`)
      .first()
      .children()
      .last()
      .find('button')
      .click();

    cy.get(`[data-cy='ingredients-module']`)
      .next()
      .next()
      .children()
      .first()
      .find('button')
      .click();

    cy.get(`[data-cy='ingredients-module']`)
      .last()
      .children()
      .last()
      .find('button')
      .click();

    // Подтверждаем заказ
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .last()
      .find('button')
      .click();

    // Ожидаем окончания запроса на заказ
    cy.wait('@order');

    // Проверяем, что модальное окно заказа открылось
    cy.get(`[data-cy='modal']`).should('be.visible');

    // Закрываем модальное окно
    cy.get(`[data-cy='modal']`).find('button').click();

    // Проверяем, что конструктор пустой и ожидает выбор ингредиентов
    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .should('contain.text', 'Выберите булки');

    cy.get(`[data-cy='constructor-module']`)
      .children()
      .first()
      .next()
      .should('contain.text', 'Выберите начинку');
  });
});
