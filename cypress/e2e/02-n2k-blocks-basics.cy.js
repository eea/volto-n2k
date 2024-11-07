import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Explore Habitats block', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');

    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.getSlate().click().type('/Explore{enter}');

    cy.get('.explore-habitats-wrapper.full-width').should('exist');
    cy.get('.explore-habitats canvas').should('exist');

    const exploreHabitatsNoteTop =
      'The designations employed and the presentation of material on this map do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries.';
    const exploreHabitatsNoteBottom =
      ' When you perform a search we will highlight only the results available on the active page of the results table.';

    cy.get(
      '.explore-habitats-wrapper.full-width .ui.container .ui.message.map-info-notice',
    ).contains(exploreHabitatsNoteTop);

    cy.get(
      '.explore-habitats-wrapper.full-width .ui.container .ui.message.map-info-notice',
    ).contains(exploreHabitatsNoteBottom);

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('My Add-on Page');
  });
});
