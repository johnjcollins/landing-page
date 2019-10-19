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
    this.contentView.displayContents(this.contentService.getContents());
  }
}
