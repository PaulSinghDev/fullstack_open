describe('Blog app', function () {
  beforeEach(function () {
    // Reset database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Create a user
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'cypress',
      name: 'Cypress Testing',
      password: 'pass',
    })

    cy.visit('http://localhost:3000')
  })

  it('can open front page', function () {
    cy.contains('Login')
    cy.contains('Register')
    cy.contains('Blog Posts')
  })

  it('has no blogs at start', function () {
    cy.contains('No blogs to display.')
  })

  it('displays login form', function () {
    cy.contains('Login').click()
    cy.get('.login-form')
      .get('#form-login-username')
      .get('#form-login-password')
      .get('#login-submit')
  })

  it('has blogs ordered by likes, descending', function () {
    cy.login({ username: 'cypress', password: 'pass' })
    cy.createBlog({ title: 'One', author: 'Cypress', url: 'https://hey.com' })
    cy.createBlog({ title: 'Two', author: 'Cypress', url: 'https://hey.com' })
    cy.createBlog({ title: 'Three', author: 'Cypress', url: 'https://hey.com' })

    cy.contains('One')
      .parent('.blog-list-item')
      .within((blog) => {
        cy.get('.show-more').click()
        cy.get('.like-button').click()
      })
    cy.contains('Two')
      .parent('.blog-list-item')
      .within((blog) => {
        cy.get('.show-more').click()
        cy.get('.like-button').click()
        cy.get('.like-button').click()
      })
    cy.contains('Three')
      .parent('.blog-list-item')
      .within((blog) => {
        cy.get('.show-more').click()
        cy.get('.like-button').click()
        cy.get('.like-button').click()
        cy.get('.like-button').click()
      })

    cy.visit('http://localhost:3000')
    cy.get('.blog-list-item .show-more').click({ multiple: true })
    cy.get('.blog-details').then((blogs) => {
      cy.wrap(blogs[0]).contains('Likes: 3')
      cy.wrap(blogs[1]).contains('Likes: 2')
      cy.wrap(blogs[2]).contains('Likes: 1')
    })
  })

  describe('login tests', function () {
    it('has correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#form-login-username').type('cypress')
      cy.get('#form-login-password').type('pass')
      cy.get('#login-submit').click()
      cy.contains("You have logged in as 'cypress'")
      cy.get('.notification-modal')
        .should('have.css', 'border', '1px solid rgb(0, 128, 0)')
        .and('contain', "You have logged in as 'cypress'")
    })

    it('has wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#form-login-username').type('cypress')
      cy.get('#form-login-password').type('wrong')
      cy.get('#login-submit').click()
      cy.get('.notification-modal')
        .should('have.css', 'border', '1px solid rgb(255, 0, 0)')
        .and('contain', 'Failed to log you in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'pass' })
    })

    it('can create a new blog', function () {
      cy.contains('Create Blog').click()
      cy.get('#new-blog-title').type('A Post from Cypress')
      cy.get('#new-blog-author').type('Cypress')
      cy.get('#new-blog-url').type('https://cypress.com')
      cy.get('#submit-blog').click()

      cy.get('.notification-modal')
        .should('contain', "You successfully posted 'A Post from Cypress'")
        .and('have.css', 'border', '1px solid rgb(0, 128, 0)')
    })

    it('can like a blog', function () {
      cy.createBlog({
        title: 'To Be Liked',
        author: 'Cypress',
        url: 'https://hey.com',
      })

      cy.createBlog({
        title: 'Not To Be Liked',
        author: 'Cypress',
        url: 'https://hey.com',
      })

      cy.contains('To Be Liked')
        .parent('.blog-list-item')
        .within(($blog) => {
          cy.get('.show-more').click()
          cy.contains('Likes: 0')
          cy.get('.like-button').click()
          cy.contains('Likes: 1')
        })

      cy.contains('Not To Be Liked')
        .parent('.blog-list-item')
        .within(($blog) => {
          cy.get('.show-more').click()
          cy.contains('Likes: 0')
        })
    })

    it('can delete own blog', function () {
      cy.createBlog({
        title: 'To Be Deleted',
        author: 'Cypress',
        url: 'https://hey.com',
      })

      cy.contains('To Be Deleted')
        .parent('.blog-list-item')
        .within(($blog) => {
          cy.get('.show-more').click()
          cy.get('.delete-blog').click()
        })

      cy.contains('To Be Deleted').should('not.exist')
    })

    it.only('cannot delete blog of others', function () {
      cy.createBlog({
        title: "Can't Delete",
        author: 'undeleteable',
        url: 'http://nodelete.com',
      })
      cy.contains('Logout').click()
      cy.registerUser({
        username: 'newuser',
        password: 'pass',
        name: 'New Guy',
      })
      cy.login({ username: 'newuser', password: 'pass' })
      cy.contains("Can't Delete")
        .parent('.blog-list-item')
        .within(($blog) => {
          cy.get('.show-more').click()
          cy.get('.delete-blog').click()
        })
      cy.contains('You do not have the permission to delete this post')
    })
  })
})
