# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Brainstorm
![Brainstorm](123.drawio.png "Text to show on mouseover")

## Данные и типы данных, используемые в приложении

Интерфейс карточек товаров

```
export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    itemIndex: number;
}
```

Интерфейс товара

```
export type IProductItem = Pick<ICard, "id" | "description" | "image" | "title" | "category" | "price">
```

Интерфейс корзины заказов

```
export interface IOrderForm {
    items: string[];
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
}
```

Интерфейс состояния приложения

```
export interface IAppState {
    catalog: IProductItem[];
    preview: string | null;
    order: IOrderForm | null;
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

#### Класс Component
Базовый абстракный класс для других компонентов, для работы с DOM в дочерних компонентах.
- `toggleClass` - переключить класс
- `setText` - установить текстовое содержимое
- `setDisabled` - сменить статус блокировки
- `setHidden` - скрыть елемент
- `setVisible` - показать елеиент
- `setImage` - установить изображение с алтернативным текстом
- `render` - вернуть корневой DOM-элемент

### Слой данных

#### Класс AppData

Класс отвечает за хранение и логику работы с данными корзины, товаров и заказа.\
В полях класса хранятся следующие данные:
- basket - выбранные карточки в корзине
- catalog - все карточки с сервера

Методы:
- `setCatalog` - добавить товар в каталог
- `setBusket` - добавить товар в корзину
- `setPreview` - получить id выбранного товара
- `removeBusket` - удалить товар из корзины
- `getTotal` - сумма заказа
- `validateOrder` - валидация
- а так-же сеттеры и геттеры для сохранения и получения данных из полей класса

### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.



