import { IProduct } from '../../types';
import { Model } from '../base/Model';


export class Product extends Model<IProduct> {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
	ordered: boolean;

	addToBasket(): void {}

	deleteFromBasket(): void {}
}