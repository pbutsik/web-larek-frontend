import { ensureElement } from '../../utils/utils';
import { Component } from '../base/BaseComponent';
import { IEvents } from '../base/BaseEvents';
import { IModalData, TypesOfEvents } from '../../types';


export class Modal extends Component<IModalData> {
	private _closeButton: HTMLButtonElement;
	private _content: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);


		[this._closeButton, this.container].forEach((element) => {
			element.addEventListener('click', () => {
				this.close();
				this.events.emit(TypesOfEvents.CloseModal);
			});
		});
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open(): void {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit(TypesOfEvents.OpenModal);
	}

	close(): void {
		this.toggleClass(this.container, 'modal_active', false);
		this.content = null;
		this.events.emit(TypesOfEvents.CloseModal);
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
