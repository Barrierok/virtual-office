# Совместная ВКР на тему: "Виртуальный офис"

Виртуальный офис состоит из нескольких модулей: [Менеджер задач](https://hhdiploma.herokuapp.com/tasks), [Лента новостей](https://hhdiploma.herokuapp.com/news), [Чат](https://hhdiploma.herokuapp.com/chat)
* Разработка модуля "Менеджер задач" велась [Александром Колиух](https://github.com/AlexandrKoliukh)
* Разработка модуля "Лента новостей" велась [Павлом Дерюгиным](https://github.com/PavelDeuce)
* Разработка модуля "Чат" и системы авторизации приложения велась [Ильей Зубцовым](https://github.com/Barrierok)

Можно протестировать: [Виртуальный офис](https://hhdiploma.herokuapp.com)

---
Для разработки:

1. Создать пользователя с паролем в PostgreSQL.
2. Создать базу данных и дать новому пользователю права в ней (см. [Создание пользователя и БД](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e))
3. Создать и заполнить .env файл по примеру .env.example
4. Прописать следующие команды для начала разработки:

```npm i
npm run migrate
npm run start:dev
```
---
Для тестирования production сборки:

```npm run i
npm run build
npm run start
```
