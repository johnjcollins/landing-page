/**
 * @class Controller
 *
 * Links content model and content view
 *
 * @param model
 * @param view
 */

export default class ContentController {
  constructor(contentService, contentView) {
    this.contentService = contentService;
    this.contentView = contentView;
    this.contentView.bindToggleActiveSection(this.handleNavSelection);
    this.contentView.displayContents(this.contentService.getContents());
  }

  handleNavSelection = id => {
    return this.contentService.changeActiveContent(id);
  };
}
