import ContentController from './controllers/content.controller.js';
import ContentService from './services/content.service.js';
import ContentView from './views/content.view.js';

const app = new ContentController(new ContentService(), new ContentView());
