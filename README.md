# mec — мобильное приложение

React Native приложение на Expo с лентой постов, поддержкой бесплатного и платного контента.

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

### На телефоне через Expo Go (самый быстрый способ)

1. Установите приложение **Expo Go** на телефон ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Запустите dev-сервер:

```bash
npm start
```

3. Отсканируйте QR-код из терминала камерой телефона (iOS) или через Expo Go (Android)

### На iOS-симуляторе

```bash
npm run ios
```

### На Android-эмуляторе

```bash
npm run android
```

### В браузере

```bash
npm run web
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
