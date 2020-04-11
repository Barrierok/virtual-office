# diploma
Можно потестить: [Чат](https://hhdiploma.herokuapp.com/chat)

Чтобы заработал проект для разработки нужно сделать несколько вещей:

1. Создать пользователя с паролем в PostgreSQL.
2. Создать базу данных hhapp и дать новому пользователю права в ней (см. [Создание пользователя и БД](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e))
3. Создать и заполнить .env файл по примеру .env.example
4. Прописать следующие команды я начала разработки:

```
npm run i
npm run migrate
npm run start:dev
```

Для тестирования production сборки:
```
npm run i
npm run build
npm run start
```
