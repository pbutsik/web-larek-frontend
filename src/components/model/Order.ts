import { IFormErrors, IProduct, IOrder, TypesOfEvents } from '../../types';
import { Model } from '../base/BaseModel';


export class Order extends Model<IOrder> {
	protected _payment: 'card' | 'cash';
	protected _address: string = '';
	protected _email: string = '';
	protected _phone: string = '';
	protected _items: IProduct[] = [];
	protected _formErrors: IFormErrors = {};

	validateOrder(): void {
		if (!this._payment) {
			this._formErrors.payment = 'Необходимо выбрать способ оплаты';
		} else {
			this._formErrors.payment = '';
		}
		this.emitChanges(TypesOfEvents.Validation, this._formErrors);
		if (!this.address) {
			this._formErrors.address = 'Необходимо указать адрес доставки';
		} else {
			this._formErrors.address = '';
		}
		this.emitChanges(TypesOfEvents.Validation, this._formErrors);
		if (!this._email) {
			this._formErrors.email = 'Необходимо указать почту';
		} else {
			this._formErrors.email = '';
		}
		this.emitChanges(TypesOfEvents.Validation, this._formErrors);
		if (!this._phone) {
			this._formErrors.phone = 'Необходимо указать телефон';
		} else {
			this._formErrors.phone = '';
		}
		this.emitChanges(TypesOfEvents.Validation, this._formErrors);
	}


	clearOrder(): void {
		this._payment = 'card';
		this._address = '';
		this._email = '';
		this._phone = '';
	}

	set payment(value) {
		this._payment = value;
		this.validateOrder();
	}

	get payment() {
		return this._payment;
	}

	set address(value: string) {
		this._address = value;
		this.validateOrder();
	}

	get address() {
		return this._address;
	}

	set email(value: string) {
		this._email = value.toLowerCase();
		this.validateOrder();
	}

	get email() {
		return this._email;
	}

	set phone(value: string) {
		this._phone = value;
		this.validateOrder();
	}

	get phone() {
		return this._phone;
	}

	set items(value: IProduct[]) {
		this._items = value;
	}

	get items() {
		return this._items;
	}

	postOrder(): void {
		this.clearOrder();
		this.emitChanges(TypesOfEvents.PostOrder);
	}
}
