/**
 * @class View
 *
 * Visual representation of model
 *
 */
export default class ContentView {
  constructor() {
    // Get references to page elements and display main header
    this.pageHeader = this.getElement('.page__header');
    this.navbarList = this.getElement('#navbar__list');
    this.main = this.getElement('.page__main');
    this.header = this.createElement('header', 'main__hero');
    this.heading = this.createElement('h1');
    this.heading.textContent = 'Landing Page';
    this.header.append(this.heading);
    this.main.append(this.header);
    this.sectionElements = [];
    this.visibleSection = null;
    this.activeLink = null;

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Scrolls to section selected on nav; event delegation used to handle event
    this.navbarList.addEventListener('click', evt => {
      evt.preventDefault();

      const newSectionId = `#${CSS.escape(
        evt.target.getAttribute('href').replace('#', '')
      )}`;
      const newSection = this.getElement(newSectionId);
      newSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  getDimensions(ele) {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom
    };
  }

  // Set visible section and nav menu item on scroll
  handleScroll() {
    const { height } = this.getDimensions(this.pageHeader);
    const scrollPosition = window.scrollY + height;
    this.sectionElements.forEach(section => {
      if (section !== this.visibleSection) {
        const sectionDimensions = this.getDimensions(section);
        if (
          scrollPosition >= sectionDimensions.offsetTop &&
          scrollPosition <= sectionDimensions.offsetBottom
        ) {
          const currentMenuItem = document.querySelector(
            `[href="#${this.visibleSection.id}"]`
          );
          currentMenuItem.classList.toggle('menu__link--active');
          const newMenuItem = document.querySelector(`[href="#${section.id}"]`);
          newMenuItem.classList.toggle('menu__link--active');
          this.visibleSection.classList.toggle('your-active-class');
          section.classList.toggle('your-active-class');
          this.visibleSection = section;
        }
      }
    });
  }

  displayContents(contents) {
    contents.forEach(content => {
      // Display content section
      const section = this.createElement('section');
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

    // Initialization
    this.sectionElements = [...document.querySelectorAll('section')];

    this.visibleSection = document.getElementById(this.sectionElements[0].id);
    this.visibleSection.classList.add('your-active-class');
    const menuItem = document.querySelector(
      `[href="#${this.visibleSection.id}"]`
    );
    menuItem.classList.add('menu__link--active');
  }
}
