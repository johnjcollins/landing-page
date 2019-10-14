/**
 * @class View
 *
 * Visual representation of model
 *
 */
export default class ContentView {
  constructor() {
    // Get references to page elements and display main header
    this.navbarList = this.getElement('#navbar__list');
    this.main = this.getElement('.page__main');
    this.header = this.createElement('header', 'main__hero');
    this.heading = this.createElement('h1');
    this.heading.textContent = 'Landing Page';
    this.header.append(this.heading);
    this.main.append(this.header);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  displayContents(contents) {
    contents.forEach(content => {
      // Display content section
      const sectionStyle = content.active ? 'your-active-class' : '';
      const section = this.createElement('section', sectionStyle);
      section.id = content.id;
      const sectionDiv = this.createElement('div', 'landing__container');
      const sectionHeading = this.createElement('h2');
      sectionHeading.textContent = content.title;
      sectionDiv.append(sectionHeading);
      content.textContent.forEach(text => {
        const paragraph = this.createElement('p');
        paragraph.textContent = text;
        sectionDiv.append(paragraph);
      });
      section.append(sectionDiv);
      this.main.append(section);

      // Display nav menu item for content section
      const navBarList = document.getElementById('navbar__list');
      const navBarListItem = this.createElement('li');
      const navBarLink = this.createElement('a', 'menu__link');
      navBarLink.href = `#${content.id}`;
      navBarLink.textContent = content.title;
      navBarListItem.append(navBarLink);
      navBarList.append(navBarListItem);
    });
  }

  bindToggleActiveSection(handler) {
    // Sets active style for selected section and scrolls to that section; event delegation used to handle event
    this.navbarList.addEventListener('click', evt => {
      evt.preventDefault();

      const newId = evt.target.getAttribute('href').replace('#', '');
      const newSection = document.getElementById(newId);
      const oldId = handler(newId);
      const oldSection = document.getElementById(oldId);
      oldSection.classList.toggle('your-active-class');
      newSection.classList.toggle('your-active-class');
      newSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
