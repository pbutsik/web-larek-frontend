import { ensureElement } from "../../utils/utils";
import { Component } from "../base/BaseComponent";
import { IEvents } from "../base/BaseEvents";
import { ISuccess, IActions } from '../../types';


export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, events: IEvents, actions: IActions) {
        super(container, events);

        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number){
        this._total.textContent = `Списано ${super.modifyPrice(value)}`;
    }
}

