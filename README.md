# diploma
[![Maintainability](https://api.codeclimate.com/v1/badges/acd3800709a40dd679e6/maintainability)](https://codeclimate.com/github/Barrierok/diploma/maintainability) [![Heroku](https://heroku-badge.herokuapp.com/?app=hhdiploma)](https://heroku-badge.herokuapp.com/projects.html)

![Github](https://github.com/Barrierok/diploma/workflows/continuous-integration-workflow.yml/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/acd3800709a40dd679e6/maintainability)](https://codeclimate.com/github/Barrierok/diploma/maintainability) ![Heroku](http://heroku-badge.herokuapp.com/?app=hhdiploma)


Можно потестить: [Чат](https://hhdiploma.herokuapp.com/chat)

Чтобы заработал проект для разработки нужно сделать несколько вещей:

1. Создать пользователя с паролем в PostgreSQL.
2. Создать базу данных hhapp и дать новому пользователю права в ней (см. [Создание пользователя и БД](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e))
3. Создать и заполнить .env файл по примеру .env.example
4. Прописать следующие команды:

```
make init
make start
```
