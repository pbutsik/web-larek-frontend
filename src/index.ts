import './scss/styles.scss';
import { WebLarekAPI } from './components/WebLarekAPI';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/BaseEvents';
import { IProduct, IPaymentType, IFormErrors, TypesOfEvents } from './types';
import { AppState } from './components/model/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/view/Page';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { DeliveryForm } from './components/view/DeliveryForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const contentElement = document.querySelector('.page') as HTMLElement
const modalElement = document.querySelector('.modal') as HTMLElement

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(contentElement, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const deliveryForm = new DeliveryForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events, {
	onClick: () => {
		modal.close();
	},
});

// // Чтобы мониторить все события, для отладки
// events.onAll(({ eventName, data }) => {
//     console.log(eventName, data);
// })

// Получение данных карточек продуктов
api.getProductList()
	.then((res) => {
        // console.log(res)
		appData.catalog = res;
        // console.log(appData.catalog)
	})
	.catch(err => {
        console.error(err);
    })

// Отображение карточек
events.on(TypesOfEvents.DownloadProducts, () => {
	page.galery = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => events.emit(TypesOfEvents.OpenProduct, item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

// Блокируем прокрутку страницы при открытии модалки
events.on(TypesOfEvents.OpenModal, () => {
	page.locked = true;
});

// Разблокируем прокрутку страницы при закрытии модалки
events.on(TypesOfEvents.CloseModal, () => {
	page.locked = false;
});

// Открытие корзины
events.on(TypesOfEvents.OpenBasket, () => {
	modal.render({
		content: basket.render({
			valid: appData.getBasketLength() > 0
		}),
	});
});

// Открытие модального окна карточки
events.on(TypesOfEvents.OpenProduct, (item: IProduct) => {
	// Отображаем результат
	const card = new Card(cloneTemplate(cardPreviewTemplate), events, {
		onClick: () => {
			if (appData.checkProductBasket(item)) {
				item.deleteFromBasket();
			} else {
				item.addToBasket();
			}
			events.emit(TypesOfEvents.OpenProduct, item);
		},
	});

	modal.render({
		content: card.render({
			category: item.category,
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			button: item.ordered ? 'Удалить' : 'Купить',
		}),
	});
});

// Изменение состояния карточек
events.on(TypesOfEvents.ChangeInBasketPtoducts, () => {
	page.counter = appData.getBasketLength();

	basket.items = appData.basket.map((item, index) => {
		const card = new BasketItem(cloneTemplate(cardBasketTemplate), events, {
			onClick: (event) => {
				item.deleteFromBasket();
				events.emit(TypesOfEvents.OpenBasket);
			},
		});
		return card.render({
			index: index,
			title: item.title,
			price: item.price,
		});
	});

	basket.total = appData.getTotalAmount();
});

// Открытие формы доставки
events.on(TypesOfEvents.OpenPayment, () => {
	const order = appData.initOrder();
	modal.render({
		content: deliveryForm.render({
			payment: order.payment,
			address: order.address,
			valid: false,
			errors: [],
		}),
	});
});

// Изменение способа оплаты
events.on(TypesOfEvents.SelectPayment, (data: { target: string }) => {
	appData.order.payment = data.target as IPaymentType;
});

// Изменение адреса
events.on(TypesOfEvents.ChangeInputAddress, (data: { value: string }) => {
	appData.order.address = data.value;
});

// Изменение почты
events.on(TypesOfEvents.ChangeInputEmail, (data: { value: string }) => {
	appData.order.email = data.value;
});

// Изменение телефона
events.on(TypesOfEvents.ChangeInputPhone, (data: { value: string }) => {
	appData.order.phone = data.value;
});

// Изменение состояния валидации
events.on(TypesOfEvents.Validation, (errors: Partial<IFormErrors>) => {
	const { payment, address, email, phone } = errors;
	deliveryForm.valid = !payment && !address;
	contactsForm.valid = !email && !phone;
	deliveryForm.errors = Object.values({ payment, address })
		.filter((i) => !!i).join('; ');
	contactsForm.errors = Object.values({ email, phone })
		.filter((i) => !!i).join('; ');
});

events.on(TypesOfEvents.SubmitPaymentAdressForm, () => {
	events.emit(TypesOfEvents.OpenUserContacts);
});

// Открытие формы с контактами
events.on(TypesOfEvents.OpenUserContacts, () => {
	const order = appData.order;
	modal.render({
		content: contactsForm.render({
			email: order.email,
			phone: order.phone,
			valid: false,
			errors: [],
		}),
	});
});

events.on(TypesOfEvents.SubmitUserContactsForm, () => {
	const order = appData.order;
	api.postOrderProducts(
			{
				payment: order.payment,
				address: order.address,
				email: order.email,
				phone: order.phone,
				total: appData.getTotalAmount(),
				items: appData.getBasketIds(),
			}
		)
		.then((result) => {
			modal.render({
				content: success.render({
					total: result.total,
				}),
			});
			appData.clearBasket();
		})
		.catch((err) => {
			console.error(err);
		});
});