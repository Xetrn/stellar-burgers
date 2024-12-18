# 3 курс
# Тиунов Андрей Игоревич

# Проектная работа 11-го спринта

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.


# Проект. «Stellar Burger». Тестирование и деплой

## Что нужно сделать
На всякий случай — вспомните макет.
Вам нужно написать юнит-тесты и интеграционные тесты к вашему приложению.

##Функциональные требования
Интеграционные тесты на Cypress написаны для страницы конструктора бургера:
  
* Созданы моковые данные для ингредиентов (например, в файле ingredients.json);
* Настроен перехват запроса на эндпоинт 'api/ingredients’, в ответе на который возвращаются созданные ранее моковые данные.
* Протестировано добавление ингредиента из списка в конструктор. Минимальные требования — добавление одного ингредиента, в идеале — добавление булок и добавление начинок.
* Протестирована работа модальных окон:
* * открытие модального окна ингредиента;
* * закрытие по клику на крестик;
* * закрытие по клику на оверлей (желательно);
* Создание заказа:
* * Созданы моковые данные ответа на запрос данных пользователя.
* * Созданы моковые данные ответа на запрос создания заказа.
* * Подставляются моковые токены авторизации.
* * Собирается бургер.
* * Вызывается клик по кнопке «Оформить заказ».
* * Проверяется, что модальное окно открылось и номер заказа верный.
* * Закрывается модальное окно и проверяется успешность закрытия.
* * Проверяется, что конструктор пуст.

Тесты на Jest:
  
* Проверяют правильную инициализацию rootReducer.
* Проверяют редьюсер слайса constructor:
* * обработку экшена добавления ингредиента;
* * обработку экшена удаления ингредиента;
* * обработку экшена изменения порядка ингредиентов в начинке;
* Проверяют ревьюсеры остальных слайсов (на примере ingredients):
* При вызове экшенаRequest булевая переменная, отвечающая за текущий запрос (например, store.isLoading) меняется на true.
* При вызове экшена Success и передаче в него ингредиентов эти данные записываются в стор (например, в [store.data](http://store.data)) и store.isLoading меняется на false.
* При вызове экшена Failed и передаче в него ошибки она записывается в стор (например, store.error) и store.isLoading меняется на false.


## Шаг 0. Подготовка
Продолжайте работать в репозитории из прошлого спринта.
## Шаг 1. Тесты Cypress
Установите cypress в проект, добавьте скрипт запуска.
Добавьте файл constructor.cy.tsx с необходимыми тестами.
## Шаг 2. Тесты на Jest
Установите Jest в проект, добавьте скрипт запуска.
Добавьте соответствующий файл с тестами в папку каждого слайса и напишите необходимые тесты.
## Шаг 3. Завершение
Убедитесь, что тестами покрыта вся необходимая функциональность:
Должны присутствовать все описанные в требованиях тесты.
Есть возможность в целом видеть, какой процент проекта или конкретного файла покрыт тестами. В тренажёре мы об этом не говорили, поэтому можете поразбираться с этим сами с помощью документации (не обязательно).
Убедитесь, что все тесты успешно выполняются.
Вы восхитительны!

#Чек-лист

## Работа отклоняется от проверки
Пока эти проблемы не будут исправлены, ревьюер не примет работу на проверку и не даст обратную связь по всему проекту:
* Пул-реквест не отправлен на проверку.
* При запуске, сборке или работе проекта возникают ошибки.
* Часть функциональности не реализована.
* На повторных итерациях не исправлены критические замечания.
* Работа содержит вопросы или просьбы о помощи к ревьюеру.

## Критические требования
Без соблюдения этих требований ваш проект не пройдёт проверку, эти пункты обязательно попросит исправить ревьюер.

## Настроено тестирование приложения
* Функциональность из задания и чек-листа предыдущей работы реализована корректно и всё ещё работает.
* В проект добавлены и настроены библиотеки Cypress и Jest.
* В разделе scripts файла package.json описаны команды запуска Cypress- и Jest-тестов.
* Тесты, относящиеся к проверке одной функциональности, объединены блоком describe. В нём описано, что проверяет этот набор тестов.
* В каждом тесте есть корректное описание того, что именно проверяет этот тест.
* Тесты содержат набор проверок, которого достаточно для проверки правильности работы тестируемой функциональности.
* В файлах тестов единообразное форматирование кода и соблюдаются соглашения об именованиях, используемые в прошлых спринтах.
* Все тесты написаны на TypeScript.
* Все тесты завершаются успешно.

## Тесты на Cypress
* Написаны тесты, проверяющие следующую функциональность:
* * Добавление ингредиента из списка ингредиентов в конструктор.
* * Открытие и закрытие модального окна с описанием ингредиента.
* * Отображение в открытом модальном окне данных именно того ингредиента, по которому произошёл клик.
* * Процесс создания заказа: добавление ингредиентов в конструктор бургера, проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа. Проверка очистки конструктора бургера от добавленных ингредиентов.
* В папке cypress/fixtures созданы файлы с данными ответов на запросы, которые используются для подмены запросов к реальному бэкенду.
* Настроен перехват с помощью cy.intercept всех запросов к бэкенду, выполняемых во время запуска тестов.
* Перед выполнением теста создания заказа в localStorage и сookie подставляются фейковые токены авторизации, а после завершения теста они очищаются.

## Тесты на Jest
* Файлы Jest-тестов находятся рядом с файлом, который они тестируют, или в отдельной папке __tests__.
* Написан тест, проверяющий правильную настройку и работу rootReducer: вызов rootReducer с undefined-состоянием и экшеном, который не обрабатывается ни одним редьюсером (например, { type: 'UNKNOWN_ACTION' }), возвращает корректное начальное состояние хранилища.
* Написаны тесты, проверяющие работу редьюсера конструктора бургера при обработке экшенов добавления и удаления ингредиента.
* Написаны тесты, проверяющие обработку редьюсером экшенов, генерируемых при выполнении асинхронного запроса: экшены начала запроса, успешного выполнения запроса и ошибки запроса.
