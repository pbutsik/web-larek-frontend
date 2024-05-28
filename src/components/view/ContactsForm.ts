import { IEvents } from '../base/BaseEvents';
import { Form } from './Form';
import { IOrderForm } from '../../types';


export class ContactsForm extends Form<IOrderForm> {
	protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this._email = this.container.elements.namedItem('email') as HTMLInputElement;
        this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
	}

	set phone(value: string) {
		this._phone.value = value;
	}

	set email(value: string) {
		this._email.value = value;
	}
}
