import './scss/styles.scss';
import { WebLarekAPI } from './components/model/WebLarekAPI';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/model/AppState';


const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

api.getProductList()
	.then((res) => {
        console.log(res)
		appData.catalog = res;
        console.log(appData.catalog)
	})
	.catch(err => {
        console.error(err);
    })