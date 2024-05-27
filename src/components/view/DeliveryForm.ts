import { IPaymentType, IOrderForm, TypesOfEvents } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/BaseEvents';
import { Form } from './Form';


export class DeliveryForm extends Form<IOrderForm> {
	protected _paymentContainer: HTMLDivElement;
	protected _paymentButtons: HTMLButtonElement[];


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
	}

	setClassPaymentMethod(className: string): void {
		this._paymentButtons.forEach((btn) => {
			if (btn.name === className) {
				this.toggleClass(btn, 'button_alt-active', true);
			} else {
				this.toggleClass(btn, 'button_alt-active', false);
			}
		});
	}

	set payment(value: string){
		this.setClassPaymentMethod(value);
	}

	set address(value: IPaymentType) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

}

