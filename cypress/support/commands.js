// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.log('getIframeBody')
  
    return cy
    .get('iframe[id="cc-iframe"]', { log: true })
    .its('0.contentDocument.body', { log: true }).should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then((body) => cy.wrap(body, { log: false }));
  })

Cypress.Commands.add('getLocalStorage',(key)=>{ 
     cy.window().then((window)=>cy.log(window.localStorage.getItem(key)));

  })
Cypress.Commands.add('apiLogin',()=>{
  
   cy.request('POST','/api/auth/login',{
      Username: Cypress.env('username'),
      Password: Cypress.env('password'),});
   
})

Cypress.Commands.add('apiLogout',(accessToken)=>{
  
   cy.request({method:'POST',
               url:"/api/user/logout",
               headers:{"access-Token":accessToken}}).as('logout');
   cy.get('@logout').should((res)=>{expect(res.status).to.equal(200)})
   
})