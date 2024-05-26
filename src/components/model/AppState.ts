import { IAppState, IProduct, IOrder  } from '../../types';
import { Model } from '../base/BaseModel';
import { IEvents } from '../base/BaseEvents';
import { Product } from './Product';
import { Order } from '../model/Order';


export class AppState extends Model<IAppState> {
	private _catalog: IProduct[];
	private _order: IOrder;
	private _preview: IProduct;

	constructor(data: Partial<IAppState>, events: IEvents) {
		super(data, events);
	}

	set catalog(items: IProduct[]) {
		this._catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}

	get catalog(): IProduct[] {
		return this._catalog;
	}

	get basket(): IProduct[] {
		return this._catalog.filter((item) => item.ordered);
	}

	get order(): IOrder {
		return this._order;
	}

	get preview(): IProduct {
		return this._preview;
	}

	set preview(value: IProduct) {
		this._preview = value;
		this.emitChanges('preview:changed', this.preview);
	}

	// проверка наличия продукта в корзине
	checkProductBasket(item: IProduct): boolean {
		return item.ordered;
	}

	// очистка корзины
	clearBasket(): void {
		this.basket.forEach((lot) => lot.deleteFromBasket());
	}

	// стоимость товаров корзины
	getTotalAmount(): number {
		return this.basket.reduce((a, c) => a + c.price, 0);
	}

	// индексы карточек товаров в корзине
	getBasketIds(): string[] {
		return this.basket.map((item) => item.id);
	}

	// количество карточек товаров в корзине
	getBasketLength(): number {
		return this.basket.length;
	}

	// создание объекта заказа
	initOrder(): IOrder {
		this._order = new Order({}, this.events);
		this.order.clearOrder();
		return this.order;
	}
}

