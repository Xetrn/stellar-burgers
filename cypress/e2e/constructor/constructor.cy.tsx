

const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjI4Y2RlNzUwODY0MDAxZDM3MjMyMCIsImlhdCI6MTczNDUyODkyOSwiZXhwIjoxNzM0NTMwMTI5fQ.gGXjgcZXZupH0Ku2Bku6qaY3Dc6yvieOHQqLRYeKWOE";
const refreshToken = "ff7975c3edf57b3535d488c1a188ef800d0be60cd63a707aedfb8874c314235f47a9f0853a380af9";

beforeEach(() => {
    cy.fixture("order.json");
    cy.fixture("user.json")
    cy.fixture("ingredients.json");

    cy.intercept("api/ingredients",
        {fixture: "ingredients.json"}).as("getIngredients");
    cy.intercept(
        {method: "POST", url: "api/orders"},
        {fixture: "order.json"}).as("orderBurger");
    cy.intercept(
        {method: "GET", url: "api/auth/user"},
        {fixture: "user.json"}).as("loginUser");

    cy.setCookie("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    cy.viewport(1280, 720);
    cy.visit("http://localhost:4000");
});

afterEach(() => {
    cy.clearCookie("accessToken");
    localStorage.removeItem("refreshToken");
})

describe("Интеграционные тесты на конструктор бургера", () => {
    it("Открытие модального окна ингредиента и проверка соответствия данных", () => {
        const burgerIngredient = cy.get("[data-cy='643d69a5c3f7b9001cfa0946']");
        burgerIngredient.children().first().click();
        const modalContent = cy.get("[data-cy='modal-content']");
        modalContent.should('be.visible');
        modalContent.contains("Хрустящие минеральные кольца");
    });

    it("Проверка закрытия модального окна на крестик", () => {
        const burgerIngredient = cy.get("[data-cy='643d69a5c3f7b9001cfa0946']");
        burgerIngredient.children().first().click();
        const modalContent = cy.get("[data-cy='modal-content']");
        cy.get("[data-cy='modal-button-close']").click();
        modalContent.should('not.exist');
    });

    it("Проверка закрытия модального окна на оверлей", () => {
        const burgerIngredient = cy.get("[data-cy='643d69a5c3f7b9001cfa0946']");
        burgerIngredient.children().first().click();
        const modalContent = cy.get("[data-cy='modal-content']");
        cy.get("[data-cy='modal-overlay-close']").click({force: true});
        modalContent.should('not.exist');
    });

    it("Добавление булки в конструктор", () => {
        const burgerConstructor = cy.get("[data-cy='burger-constructor']");
        const burgerBun = cy.get("[data-cy='643d69a5c3f7b9001cfa093d']");
        burgerBun.children().last().click();
        burgerConstructor.contains("Флюоресцентная булка R2-D3");
    });

    it("Добавление ингредиента в конструктор", () => {
        const burgerIngredients = cy.get("[data-cy='burger-ingredients']");
        const burgerIngredient = cy.get("[data-cy='643d69a5c3f7b9001cfa093f']");
        burgerIngredient.children().last().click();
        burgerIngredients.contains("Мясо бессмертных моллюсков Protostomia");
    });

    it("Проверка полного сценария создания заказа", () => {
        cy.wait("@loginUser");
        const userProfileName = cy.get("[data-cy='user-name']");
        userProfileName.contains("test");

        const bun = cy.get("[data-cy='643d69a5c3f7b9001cfa093d']");
        const ingredient = cy.get("[data-cy='643d69a5c3f7b9001cfa093f']");
        const sauce = cy.get("[data-cy='643d69a5c3f7b9001cfa0945']");
        const orderBurgerBlock = cy.get("[data-cy='do-order-btn']");

        bun.children().last().click();
        ingredient.children().last().click();
        sauce.children().last().click();

        orderBurgerBlock.find("button").click();
        cy.wait("@orderBurger");

        const modalContent = cy.get("[data-cy='modal-content']");
        modalContent.should('be.visible');
        cy.get("[data-cy='modal-button-close']").click();
        modalContent.should('not.exist');

        const constructor = cy.get("[data-cy='burger-constructor']");
        const burgerIngredients = cy.get("[data-cy='burger-ingredients']");
        constructor.contains("Выберите булки");
        burgerIngredients.contains("Выберите начинку");
    });
})