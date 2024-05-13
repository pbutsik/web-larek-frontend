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
export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	// category: 'софт-скил'| 'другое'| 'дополнительное'| 'кнопка';
	category: string;
	price: number | null;
	ordered: boolean;
	addToBasket: () => void;
	deleteFromBasket: () => void;
}


// Интерфейс формы c оплатой
export interface IOrderDeliveryForm {
	payment: string;
	address: string;
}

// Интерфейс формы с контактными данными
export interface IOrderContactsForm {
	email: string;
	phone: string;
}

// интерфейс формы
type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

export interface IOrder extends IOrderForm {
   items: IProduct[];
   validation(): void;
   clearOrder(): void;
   postOrder(): void; 
}

// Интерфейс состояния приложения
export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	preview: IProduct;
	checkProductBasket(): boolean;
	clearBasket(): void;
	Total(): number;
	BasketIds(): number;
	BasketLen(): number;
	initOrder(): IOrder;
}