describe('Проверка авторизации', function () {
   // 1. Позитивный кейс: верный логин, верный пароль 
    it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Кликнули на кнопку войти
        cy.get('#messageHeader').should('contain', 'Авторизация прошла успешно'); // Проверка текста после авторизации
        cy.get('#exitMessageButton').should('be.visible'); // Есть крестик и он виден пользователю
    });
    // 2. Проверка восстановления пароля
    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт 
        cy.get('#forgotEmailButton').click(); // Нажали «Забыли пароль»
        cy.get('#mailForgot').type('german@dolnikov.ru'); // Ввели верный email
        cy.get('#restoreEmailButton').click(); // Отправили запрос
        cy.get('#messageHeader').should('contain', 'Успешно отправили пароль на e-mail'); // Проверка текста
        cy.get('#exitMessageButton').should('be.visible'); // Крестик виден
    });
// 3. Негативный кейс: верный логин, неверный пароль
    it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт 
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudi0'); // Ввели НЕверный пароль
        cy.get('#loginButton').click(); // Кликнули войти
        cy.get('#messageHeader').should('contain', 'Такого логина или пароля нет'); // Проверка ошибки
        cy.get('#exitMessageButton').should('be.visible'); // Крестик виден
    });
    // 4. Негативный кейс: неверный логин, верный пароль
    it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт 
        cy.get('#mail').type('german@dolniko.ru'); // Ввели НЕверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Кликнули войти
        cy.get('#messageHeader').should('contain', 'Такого логина или пароля нет'); // Проверка ошибки
        cy.get('#exitMessageButton').should('be.visible'); // Крестик виден
    });
     // 5. Негативный кейс валидации: логин без @
    it('Логин без @ символа', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт 
        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Кликнули войти
        cy.get('#messageHeader').should('contain', 'Нужно исправить проблему валидации'); // Проверка ошибки
        cy.get('#exitMessageButton').should('be.visible'); // Крестик виден
    });
    // 6. Проверка на приведение к строчным буквам в логине:
    it('Проверка на приведение к строчным буквам в логине (должен упасть)', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин в разном регистре
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Кликнули войти
        
        // ОЖИДАЕМ ПАДЕНИЕ ТЕСТА (баг разработчика):
        cy.get('#messageHeader').should('contain', 'Авторизация прошла успешно'); // Должен упасть здесь
        cy.get('#exitMessageButton').should('be.visible'); // Крестик виден
    });
    
    
});
    
