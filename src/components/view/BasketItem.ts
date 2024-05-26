import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/BaseEvents';
import { IBasketCard, ICardActions} from '../../types';
import { Component } from '../base/BaseComponent';


export class BasketItem extends Component<IBasketCard> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteBtn: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
		super(container, events);

		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._deleteBtn = container.querySelector('.card__button');

		// событие удаления из корзины
		this._deleteBtn.addEventListener('click', (event: MouseEvent) => {
			actions.onClick?.(event);
		});
	}

	set index(value: number) {
		this.setText(this._index, value + 1);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, super.modifyPrice(value));
	}
}
