// Product List
// {
//     "total": 10,
//     "items": [
//         {
//             "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//             "description": "Если планируете решать задачи в тренажёре, берите два.",
//             "image": "/5_Dots.svg",
//             "title": "+1 час в сутках",
//             "category": "софт-скил",
//             "price": 750
//         },
//         {
//             "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//             "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
//             "image": "/Shell.svg",
//             "title": "HEX-леденец",
//             "category": "другое",
//             "price": 1450
//         },
//     ]
// }

// Product Item
// {
//     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "/5_Dots.svg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 750
// }

// Order
// {
//     "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
//     "total": 2200
// }
// ________________________________________________________________________________________________________________________________

// Интерфейс карточек товаров
export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    itemIndex: number;
}

// интерфейс товара
export type IProductItem = Pick<ICard, "id" | "description" | "image" | "title" | "category" | "price">;


// Интерфейс корзины заказов
export interface IOrderForm {
    items: string[];
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
}

// Интерфейс состояния приложения
export interface IAppState {
    catalog: IProductItem[];
    preview: string | null;
    order: IOrderForm | null;
}