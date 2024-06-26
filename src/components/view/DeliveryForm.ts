import { IPaymentType, IOrderForm, TypesOfEvents } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/BaseEvents';
import { Form } from './Form';


export class DeliveryForm extends Form<IOrderForm> {
	protected _paymentContainer: HTMLDivElement;
	protected _paymentButtons: HTMLButtonElement[];
	protected _address: HTMLInputElement;


	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentContainer = ensureElement<HTMLDivElement>(
			'.order__buttons',
			this.container
		);
		this._paymentButtons = Array.from(
			this._paymentContainer.querySelectorAll('.button_alt')
		);

		// генерируем событие выпора оплаты
		this._paymentContainer.addEventListener('click', (evt: MouseEvent) => {
			const target = evt.target as HTMLButtonElement;
			this.setClassPaymentMethod(target.name);
			events.emit(TypesOfEvents.SelectPayment, { target: target.name });
		});
		this._address = this.container.elements.namedItem('address') as HTMLInputElement
	}

	
	setClassPaymentMethod(className: string): void {
		this._paymentButtons.forEach((btn) => {
            this.toggleClass(btn, 'button_alt-active', btn.name === className);
        });
	}

	set payment(value: string){
		this.setClassPaymentMethod(value);
	}

	set address(value: IPaymentType) {
		this._address.value = value;
	}

}

