import { IAppState, IProduct } from '../../types';
import { Model } from '../base/Model';
import { IEvents } from '../base/events';
import { Product } from './Product';


export class AppState extends Model<IAppState> {
	private _catalog: IProduct[];

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
}

