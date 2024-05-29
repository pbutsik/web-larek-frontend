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
	category: string;
	price: number | null;
	ordered: boolean;
	addToBasket: () => void;
	deleteFromBasket: () => void;
}

export type IProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type IPaymentType = 'card' | 'cash';

export interface ICard {
	category: string;
	title: string;
	image: string;
	price: number;
	description: string;
	button?: string;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Интерфейс формы c оплатой и контактами
export interface IOrderForm {
	payment: IPaymentType;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderAPI extends IOrderForm {
	items: string[];
	total: number; 
}

export interface IOrder extends IOrderForm {
   items: IProduct[];
   clearOrder(): void;
   postOrder(): void; 
}

export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

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

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IWebLarekAPI {
	getProduct: (id: string) => Promise<IProduct>;
	getProductList: () => Promise<IProduct[]>;
}

export interface IBasketView {
	items: HTMLElement[];
	total: number;
	valid: boolean;
}

export interface IBasketCard {
	index: number; 
	title: string;
	price: number;
	delete: () => void;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IModalData {
	content: HTMLElement;
}

export interface IPage {
	counter: number;
	galery: HTMLElement[];
	locked: boolean;
}

export interface ISuccess {
    total: number;
}

export interface IActions {
    onClick: () => void;
}

export enum TypesOfEvents {
	DownloadProducts = 'catalog:changed',
	OpenProduct = 'card:open',
	OpenModal = 'modal:open',
	CloseModal = 'modal:close',
	OpenBasket = 'basket:open',
	ChangeInBasketPtoducts = 'product:changed',
	Validation = 'form:changed',
	OpenPayment = 'order_payment:open',
	SubmitPaymentAdressForm = 'order:submit',
	OpenUserContacts = 'order_contacts:open',
	SubmitUserContactsForm = 'contacts:submit',
	SelectPayment = 'payment:changed',
	ChangeInputAddress = 'order.address:change',
	ChangeInputEmail = 'contacts.email:change',
	ChangeInputPhone = 'contacts.phone:change',
	PostOrder = 'order:post',
}