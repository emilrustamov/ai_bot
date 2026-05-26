# Kaspi AI Chatbot Survey

Веб-анкета для исследования AI-чатбота Kaspi.kz с сохранением в SQLite и админ-панелью.

Фронтенд анкеты: **Vue 3 + Vite + Tailwind CSS 4**. Сборка попадает в `public/`, админка остаётся статической HTML в `public/admin/`.

## Установка

```bash
npm install
cp .env.example .env
```

Заполните `.env`: `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `IP_HASH_SALT`.

Для продакшена задайте `NODE_ENV=production` (включит secure-cookie и HSTS).

## Запуск (продакшен / OSPanel)

```bash
npm start
```

Перед стартом автоматически выполняется `npm run build` (сборка Vue в `public/`).

- Анкета: http://localhost:3000/
- Админка: http://localhost:3000/admin/login.html

## Разработка фронтенда

В двух терминалах:

```bash
node server.js
npm run dev
```

- API: http://localhost:3000/
- Анкета (HMR): http://localhost:5173/ — запросы `/api/*` проксируются на порт 3000

Правки вопросов: `shared/survey-data.js`, `shared/blocks-config.js` (используются и фронтом, и `config/schema.js`).

## Резервная копия БД

```bash
npm run backup
```

Файл сохраняется в `backups/database_YYYY-MM-DD.db`.

## OSPanel

1. Настройте домен на папку проекта или проксируйте на Node (порт из `.env`).
2. Запустите сервер через PM2 или как службу Windows для автозапуска.
3. Периодический бэкап: Планировщик заданий → `npm run backup`.

## Структура

- `client/` — исходники Vue 3 (Vite)
- `shared/` — данные анкеты (общие для фронта и бэкенда)
- `public/` — собранная анкета + `public/admin/`
- `routes/` — API отправки и админки
- `data/database.db` — SQLite (создаётся автоматически)
- `config/schema.js` — схема вопросов для БД и валидации
- `middleware/security.js` — заголовки безопасности (helmet, CSP)

## Возможности анкеты

- Черновик в `localStorage`, кнопка «Начать заново»
- Понятные сообщения при офлайне и таймауте запроса
- Индексы SQLite для фильтров админки
