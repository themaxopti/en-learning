describe('Auth test e2e', () => {
  it('Should display password or email do not exist error', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click()
    cy.get('span[data-testid="errorMessage"]')
      .should('exist')
  })

  it('Should redirect to main page', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('input[name="email"]').type('themaxopti@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/');
  })
})