/**
 * @class Content
 *
 * Manages the data of application
 *
 */

export default class Content {
  constructor({ title, textContent, active } = { active: false }) {
    this.id = this.uuidv4();
    this.title = title;
    this.textContent = textContent;
    this._active = active;
  }

  get active() {
    return this._active;
  }

  set active(newActive) {
    this._active = newActive;
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
