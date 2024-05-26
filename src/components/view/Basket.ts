import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/BaseComponent';
import { EventEmitter } from '../base/BaseEvents';
import { IBasketView } from '../../types';


export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		// генерируем событие открытия формы заказа
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order_payment:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, super.modifyPrice(total));
	}

	set valid(value: boolean){
		this.setDisabled(this._button, !value);
	}
}
