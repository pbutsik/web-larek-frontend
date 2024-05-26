import { IProduct } from '../../types';
import { Model } from '../base/BaseModel';


export class Product extends Model<IProduct> {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
	ordered: boolean;

	// добавить карточку товара в корзину
	addToBasket(): void {
		this.ordered = true;
		this.emitChanges('product:changed', { ordered: this.ordered });
	}

	// удалить карточку товара из корзины
	deleteFromBasket(): void {
		this.ordered = false;
		this.emitChanges('product:changed', { ordered: this.ordered });
	}
}