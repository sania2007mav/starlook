# StarLook

Браузерная игра-переодевалка в духе классических fashion-симов (StarSim / Star Girl).  
A browser dress-up game inspired by classic phone fashion sims.

**Рабочее название / working title:** StarLook

## Как играть / How to play

1. **Дом** — хаб: монеты, текущий образ, переход в разделы.
2. **Магазин** — выбери категорию, нажми вещь, чтобы примерить её на кукле, затем **Купить** (монеты).
3. **Гардероб** — кукла слева, купленные вещи справа. Фильтры: волосы, верх, низ, платья, обувь, аксессуары. Нажми вещь, чтобы надеть или снять.
4. **Вечеринка** — подтверди образ и получи небольшой бонус монет (раз в несколько часов).
5. **Подруги** — три локальные подруги с готовыми луками.

Прогресс (монеты, гардероб, образ) сохраняется в `localStorage` и переживает обновление страницы.

Progress (coins, inventory, equipped look) is stored in `localStorage`.

## Локальный запуск / Run locally

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

Открой URL, который покажет Vite (обычно `http://localhost:5173/starlook/`).

Open the URL Vite prints (usually `http://localhost:5173/starlook/`).

## GitHub Pages

Сайт рассчитан на project pages с базовым путём `/starlook/`:

- URL: https://sania2007mav.github.io/starlook/
- Workflow: `.github/workflows/deploy.yml` собирает проект и публикует `dist` при пуше в `main`.

**Включить Pages один раз:**

1. GitHub → репозиторий → **Settings → Pages**
2. **Source:** GitHub Actions
3. Смержи PR в `main` или запусти workflow вручную (**Actions → Deploy to GitHub Pages**)

Альтернатива без Actions:

```bash
npm run deploy
```

(скрипт `gh-pages` публикует папку `dist` в ветку `gh-pages`)

## Стек / Stack

Vite + React + TypeScript. Без бэкенда: каталог, экономика и подруги работают полностью в браузере.
