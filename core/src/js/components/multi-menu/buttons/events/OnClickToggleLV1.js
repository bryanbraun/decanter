import EventAbstract from '../../../secondary-nav/common/events/EventAbstract';

/**
 * OnArrowLeft
 *
 * Event action handler class.
 */
export default class OnClickToggleLV1 extends EventAbstract {

  /**
   * Execute the action to the event.
   */
  exec() {
    if (this.isDesktop()) {
      this.handleDesktop();
    }
    else {
      this.handleMobile();
    }
  }

  /**
   * Handle the events for desktop sized screens.
   */
  handleDesktop() {
    try {
      var node = this.elem.parentElement.querySelector(":scope > a");
      node.click();
    }
    catch (err) {
      this.handleMobile();
    }
  }

  /**
   * Handle the events for mobile sized screens.
   */
  handleMobile() {
    var expandEvent = new SubNavToggleSpace(this.item, this.event, this.target);
    expandEvent.init();
  }

}