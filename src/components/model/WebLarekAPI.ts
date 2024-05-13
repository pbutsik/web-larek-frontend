import { Api, ApiListResponse } from '../base/api';
import { IProduct } from '../../types';


interface IWebLarekAPI {
	getProduct: (id: string) => Promise<IProduct>;
	getProductList: () => Promise<IProduct[]>;
}


export class WebLarekAPI extends Api implements IWebLarekAPI {
	private readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
}

