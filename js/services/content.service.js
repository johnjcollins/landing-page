/**
 * @class Content
 *
 * Manages the data of application
 *
 */
import Content from '../models/content.model.js';

export default class ContentService {
  constructor() {
    // Initial load of content data into localStorage - mimicks API call
    const sourceContent = [
      {
        title: 'Section 1',
        textContent: [
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, odit sint! Eligendi a et nemo blanditiis odio voluptatum, possimus ipsum non corrupti temporibus? Culpa cumque tempore, nostrum omnis dolores quos veritatis reprehenderit ad quidem voluptatem distinctio sint eos dicta explicabo? Ut eligendi ratione sapiente rem! Architecto, facere. Veritatis, nesciunt corporis!',
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi odio corrupti maiores, saepe doloremque provident, nostrum fugit accusantium expedita omnis commodi perferendis enim alias. Maiores incidunt accusamus obcaecati ad aut? Illo explicabo voluptates obcaecati? Quo!'
        ],
        active: false
      },
      {
        title: 'Section 2',
        textContent: [
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, odit sint! Eligendi a et nemo blanditiis odio voluptatum, possimus ipsum non corrupti temporibus? Culpa cumque tempore, nostrum omnis dolores quos veritatis reprehenderit ad quidem voluptatem distinctio sint eos dicta explicabo? Ut eligendi ratione sapiente rem! Architecto, facere. Veritatis, nesciunt corporis!',
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi odio corrupti maiores, saepe doloremque provident, nostrum fugit accusantium expedita omnis commodi perferendis enim alias. Maiores incidunt accusamus obcaecati ad aut? Illo explicabo voluptates obcaecati? Quo!'
        ],
        active: false
      },
      {
        title: 'Section 3',
        textContent: [
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, odit sint! Eligendi a et nemo blanditiis odio voluptatum, possimus ipsum non corrupti temporibus? Culpa cumque tempore, nostrum omnis dolores quos veritatis reprehenderit ad quidem voluptatem distinctio sint eos dicta explicabo? Ut eligendi ratione sapiente rem! Architecto, facere. Veritatis, nesciunt corporis!',
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi odio corrupti maiores, saepe doloremque provident, nostrum fugit accusantium expedita omnis commodi perferendis enim alias. Maiores incidunt accusamus obcaecati ad aut? Illo explicabo voluptates obcaecati? Quo!'
        ],
        active: false
      },
      {
        title: 'Section 4',
        textContent: [
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, odit sint! Eligendi a et nemo blanditiis odio voluptatum, possimus ipsum non corrupti temporibus? Culpa cumque tempore, nostrum omnis dolores quos veritatis reprehenderit ad quidem voluptatem distinctio sint eos dicta explicabo? Ut eligendi ratione sapiente rem! Architecto, facere. Veritatis, nesciunt corporis!',
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi odio corrupti maiores, saepe doloremque provident, nostrum fugit accusantium expedita omnis commodi perferendis enim alias. Maiores incidunt accusamus obcaecati ad aut? Illo explicabo voluptates obcaecati? Quo!'
        ],
        active: false
      }
    ];

    if (!localStorage.getItem('contents')) {
      const savedContents = JSON.stringify(sourceContent);
      localStorage.setItem('contents', savedContents);
    }

    // Initialization
    const contents = JSON.parse(localStorage.getItem('contents')) || [];
    this.contents = contents.map(content => new Content(content));
    this.setActiveContent(this.contents[0].id, true);
  }

  getActiveContent() {
    const idx = this.contents.findIndex(content => content.active === true);
    return this.contents[idx];
  }

  setActiveContent(id, value) {
    const idx = this.contents.findIndex(content => content.id === id);
    this.contents[idx].active = value;
  }

  getContent(id) {
    const contents = this.contents.filter(content => content.id === id);
    return contents[0];
  }

  getContents() {
    return this.contents;
  }

  changeActiveContent(newId) {
    // Called from nav menu item event handler
    const oldContent = this.getActiveContent();
    this.setActiveContent(oldContent.id, false);
    this.setActiveContent(newId, true);
    return oldContent.id;
  }
}