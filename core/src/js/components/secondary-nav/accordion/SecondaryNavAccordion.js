import SecondaryNavAbstract from '../common/SecondaryNavAbstract';
import SecondaryNavItem from '../common/SecondaryNavItem';
import SecondarySubNavAccordion from './SecondarySubNavAccordion';

/**
 * A secondary menu with accordion buttons.
 */
export default class SecondaryNavAccordion extends SecondaryNavAbstract {

  /**
   * Initialize.
   *
   * @param {HTMLElement} elem  The outermost wrapper for the Navigation.
   * @param {Object} options    An object of metadata.
   */
  constructor(elem, options = {}) {
    // Let super do what super does.
    super(elem, options);

    // Ok do the creation.
    this.createSubNavItems();

    // Expand the active path.
    this.activePath.expandActivePath();
  }

  /**
   * Add the additional state handling after the abstract option has run.
   *
   * @param  {HTMLElement} item The HTMLElement being acted upon.
   */
  expandActivePathItem(item) {
    item.firstElementChild.setAttribute('aria-expanded', 'true');
  }

  /**
   * Function for creating a new nested navigation item.
   *
   * @param  {HTMLElement} item     The HTMLElement to attach a new subnav to.
   * @param  {Integer} depth        The level of nesting. (starts at 1)
   * @param  {Object|Mixed} parent  The parent subnav instance.
   *
   * @return {SecondarySubNavAccordion} A brand new instance.
   */
  newParentItem(item, depth, parent) {
    var opts = this.options;
    opts.depth = depth;

    var nav = new SecondarySubNavAccordion(
      item,
      this,
      parent,
      opts
    );
    this.subNavItems.push(nav);
    return nav;
  }

  /**
   * Function for creating a new single tier navigation item.
   *
   * @param  {HTMLElement} item     The HTMLElement to attach a new subnav to.
   * @param  {Integer} depth        The level of nesting. (starts at 1)
   * @param  {Object|Mixed} parent  The parent subnav instance.
   *
   * @return {SecondaryNavItem} A brand new instance.
   */
  newNavItem(item, depth, parent) {
    var opts = this.options;
    opts.depth = depth;

    var nav = new SecondaryNavItem(
      item,
      this,
      parent,
      opts
    );
    this.navItems.push(nav);
    return nav;
  }
}
