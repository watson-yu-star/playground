import { Given,When,And,Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../pages/loginPage.js";
import { accountPage} from "../../pages/accountPage.js";
//const loginPage =require("../../pages/loginPage.js");

Given("The user open the themarket website", ()=>{
    cy.visit('/nz')
    cy.getCookies().then((cookies)=>cy.log(cookies.length))
});

When("The user clicks the Login button. And The user input correct {string} and {string}", (email,password)=>{
    //cy.wait(2000);
    cy.intercept('/api/auth/login').as('login');
    loginPage.submitLogin(email,password);
   
    
});


Then("The user should login his account successfully and show name {string}", (name)=>{
    
    cy.wait('@login').then((inteception)=>{
        expect(inteception.response.statusCode).to.eql(200)});
    cy.get('p.header-user-name').should('have.contain',name);
    //cy.wait(5000);
    cy.getCookies().then((cookies)=>cookies.forEach((cookie)=>{
        cy.log(cookie.name +' || '+ cy.value);
        }));
    cy.log("****getSessionStorage******");
    //cy.getLocalStorage("squid-twg-vue-member").should.not.null;
    expect(cy.getAllLocalStorage("squid-twg-vue-member")).to.not.be.null;
    cy.screenshot();
});


Given("The user has login successfully",()=>{
   cy.visit('/nz');
   
   username = Cypress.env('username');
   password = Cypress.env('password');
   loginPage.submitLogin(username,password);

   //loginPage.submitLogin(Cypress.env.username,Cypress.env.password);
    //cy.wait(2000);
})

When("The user click the logout button",()=>{
    
    cy.visit('/nz/account');

    cy.intercept('/api/user/logout').as('logout');
    
    accountPage.submitLogout();

})

Then("The user should logout his account",()=>{
    
    cy.wait('@logout').then((inteception)=>{
    expect(inteception.response.statusCode).to.eql(200)});
    cy.reload();
    cy.get('p.header-user-name').should('have.text','Login-Join');
    
});



When(`The user input the wrong {string} or {string} and click the login button`,(email,password)=>{
    
    loginPage.submitLogin(email,password);

    /*
    table.hashes().forEach((row)=>{
        cy.log(row.email);
        cy.log(row.password);
        loginPage.submitLogin(row.email, row.password)
    })
    */
})

Then("The user can not login successfully",()=>{
    loginPage.returnErrorMessage().should('contain.text','Failed to authenticate user');
    cy.screenshot();
    loginPage.closeLoginDialog();
})

