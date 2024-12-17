import store, { rootReducer } from "../../../src/services/store"


describe("Тесты для Root-редьюсера", () => {
    test("Проверка корректной инициализации", () => {
        const defaultState = store.getState();
        const undefinedInit = rootReducer(undefined, {type: "UNKNOWN_ACTION"});
        expect(undefinedInit).toEqual(defaultState);
    })
})