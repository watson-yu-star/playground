export class LoginPage {
    elements = {
      usernameInput: () => cy.get("#email"),
      passwordInput: () => cy.get("#email-password"),
      loginBtn: () => cy.get('button[data-test="login-btn"]'),
      errorMessage: () => cy.get('div.alert-warning'),
      loginDialog: ()=>cy.get('div.header-icon-nav__user'),
      //loginDialog: ()=>cy.get("a[href='/nz/login']"),
      closeBtn:()=>cy.get("i.close_modal"),
    };
    
    
    typeUsername(username) {
      this.elements.usernameInput().type(username);
    }
  
    typePassword(password) {
      this.elements.passwordInput().type(password);
    }
  
    clickLogin() {
      this.elements.loginBtn().click();
    }
  
    submitLogin(username,password){
      cy.intercept('api/auth/login').as('loginReq')
      this.elements.loginDialog().click();
      this.elements.usernameInput().type(username);
      this.elements.passwordInput().type(password);
      //cy.get('button[data-test="login-btn"]').click();
      this.elements.loginBtn().click();
      cy.wait('@loginReq').its('response.statusCode').should('eq',200);

    }

    returnErrorMessage(){
      return this.elements.errorMessage();
    }
    closeLoginDialog(){
      cy.get("i.close-modal").click();
    }
  }

export const loginPage = new LoginPage();

//module.exports = new LoginPage();