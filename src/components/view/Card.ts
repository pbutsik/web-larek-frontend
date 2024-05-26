import { IProductCategory, ICard, IActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/BaseComponent';
import { IEvents } from '../base/BaseEvents';


export class Card extends Component<ICard> {
	private _category: HTMLElement;
	private _title: HTMLElement;
	private _image?: HTMLImageElement;
	private _description?: HTMLElement;
	private _button?: HTMLButtonElement;
	private _price?: HTMLElement;

	constructor(
		// protected blockName: string,
		container: HTMLElement,
		events: IEvents,
		actions?: IActions
	) {
		super(container, events);

		this._category = ensureElement<HTMLElement>(`.card__category`, container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
		this._button = container.querySelector(`.card__button`);
		this._description = container.querySelector(`.card__text`);
		this._price = container.querySelector(`.card__price`);

		// события кнопок карточки
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set category(value: IProductCategory) {
		this.setText(this._category, value);
		this._category.classList.add(`card__category_${super.cardCategory(value)}`);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number) {
		this.setText(this._price, super.modifyPrice(value));
		this.setDisabled(this._button, value == null);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}
