import {isEsc} from '../../utilities/keyboard';
import NavAbstract from './NavAbstract';
import NavToggle from './NavToggle';

/**
 * Represent a navigation menu. May be the top nav or a subnav.
 */
export default class Nav extends NavAbstract {

  /**
   * Create a nav container istance.
   * @param {[type]} elem    [description]
   * @param {[type]} options [description]
   */
  constructor(elem, options) {
    super(elem, options);
    // Create navItems.
    this.createNavItems();
    // Initialize the event listeners.
    this.createEventListeners();
    // Gobble gobble toggle toggle.
    if (options.toggleSelector) {
      this.createNavToggle();
    }
    // Add an active class to the children.
    if (options.activePath) {
      this.setActivePath();
    }
    // Expand to the active path.
    if (options.expandActivePath) {
      this.expandActivePath();
    }
  }

  /**
   * [createEventListeners description]
   */
  createEventListeners() {
    // What do when key down?
    this.elem.addEventListener('keydown', this);

    // Listen to the close so we can act on it.
    this.elem.addEventListener('preOpenSubnav', this);
  }

  // -------------------------------------------------------------------------
  // Event Handlers.
  // -------------------------------------------------------------------------

  /**
   * [preOpenSubnav description]
   * @param  {[type]} event     [description]
   * @param  {[type]} parentNav [description]
   */
  onPreOpenSubnav(event) {
    // Somebody clicked a subnav trigger. Check to see if it is one of my
    // subnavitems. If it is one of my subnav items, close all of the subnav
    // items so that everything on the same level are shut.
    let triggerId = event.detail.nav.id || null;
    if (triggerId === this.id) {
      this.closeAllSubNavs();
    }
  }

  /**
   * [onKeydown description]
   * @param  {[type]} event  [description]
   * @param  {[type]} target [description]
   */
  onKeydown(event, target) {
    const theKey = event.key || event.keyCode;

    if (isEsc(theKey)) {
      this.closeAllSubNavs();
    }
  }

  /**
   * Create the toggle element.
   */
  createNavToggle() {
    // Find the element.
    let toggleElement = this.elem.querySelector(this.elem.tagName + this.options.toggleSelector);

    // If we cannot find a toggle element return null.
    if (!toggleElement) {
      return;
    }

    // Attach the behaviour.
    let toggleOptions = {
      navElement: this.elem,
      nav: this
    };
    this.toggle =
    this.options.toggle = new NavToggle(toggleElement, toggleOptions);
  }

}
