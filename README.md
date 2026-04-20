# mec — мобильное приложение

React Native приложение на Expo с лентой публикаций для платформы Mecenate.

## Требования

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- Для iOS: macOS + Xcode
- Для Android: Android Studio + эмулятор или физическое устройство

## Установка

```bash
npm install
```

## Запуск

<details>
<summary><strong>На телефоне через Expo Go (самый быстрый способ)</strong></summary>

1. Установите приложение **Expo Go** на телефон ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Запустите dev-сервер:

```bash
npm start
```

3. Отсканируйте QR-код из терминала камерой телефона (iOS) или через Expo Go (Android)

</details>

### На iOS-симуляторе

```bash
npm run ios
```

### На Android-эмуляторе

```bash
npm run android
```

## Что смотреть

После запуска открывается лента постов:

- **Вкладка "Все"** — все посты из API
- **Вкладка "Бесплатные"** — только free-контент
- **Вкладка "Платные"** — только paid-контент

Доступные взаимодействия:

- Бесконечный скролл (автоподгрузка при прокрутке вниз)
- Pull-to-refresh (потянуть вниз для обновления)
- Скелетон-загрузка при первом открытии

## Прочее

```bash
npm run lint   # проверка кода линтером
```

---

<details>
<summary><strong>Тестовое задание</strong></summary>

## Тестовое задание 1 — Mecenate

**Платформа:** iOS + Android (React Native + Expo)

### Задача

Разработать экран ленты публикаций для платформы Mecenate — сервиса поддержки авторов (аналог Patreon/Boosty).
Пользователь открывает приложение и видит список постов от авторов, на которых подписан.

### Что нужно реализовать

**Экран Feed (лента)**

- Список постов: аватар автора, имя, превью текста, обложка поста, счётчик лайков и комментариев
- Пагинация — курсорная (подгрузка при скролле вниз)
- Pull-to-refresh
- Закрытый пост (`tier: "paid"`) — показывать заглушку вместо текста
- Сообщение об ошибке если API недоступен: «Не удалось загрузить публикации» с кнопкой повтора

### Design

[Figma](https://www.figma.com/design/bAxXrk7TaPN13TZ60yf7uD/Test-Assignment?node-id=0-1&p=f&t=qnWbxTDbClFsVhxB-0)

### API

[Swagger](https://k8s.mectest.ru/test-app/openapi.json)

### Стек

- **Язык:** TypeScript
- **Mobile:** React Native + Expo (iOS и Android)
- **State management:** MobX и React Query
- **Стилизация:** дизайн-токены

### Формат сдачи

- Публичный GitHub-репозиторий
- README: как запустить, переменные окружения

</details>
