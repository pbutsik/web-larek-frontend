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
			});
		});
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// создаем метод для переключения модального окна, чтобы не передавать селектор и контейнер каждый раз
   // сразу по умолчанию указываем `true`, чтобы лишний раз не передавать при открытии
   _toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}
	// Обработчик в виде стрелочного метода, чтобы не терять контекст `this`
	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	open() {
		this._toggleModal(); // открываем
		// навешиваем обработчик при открытии
		document.addEventListener('keydown', this._handleEscape);
		this.events.emit(TypesOfEvents.OpenModal);
	}

	close() {
		this._toggleModal(false); // закрываем
		// правильно удаляем обработчик при закрытии
		document.removeEventListener('keydown', this._handleEscape);
		this.content = null;
		this.events.emit(TypesOfEvents.CloseModal);
	}

	// open(): void {
	// 	this.toggleClass(this.container, 'modal_active', true);
	// 	this.events.emit(TypesOfEvents.OpenModal);
	// }

	// close(): void {
	// 	this.toggleClass(this.container, 'modal_active', false);
	// 	this.content = null;
	// 	this.events.emit(TypesOfEvents.CloseModal);
	// }

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
