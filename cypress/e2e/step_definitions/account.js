import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import { loginPage } from "../../pages/loginPage.js"
import { accountPage} from "../../pages/accountPage.js"


Given ('The user login his account and land on the account page',()=>{
    cy.visit('/nz');
    //loginPage.clickLogin();
   // cy.wait(1000);
    const name = Cypress.env('username');
    const password = Cypress.env('password');
    loginPage.submitLogin(name,password);
    accountPage.gotoAccountpage();

})
When ('The user click the add card button',()=>{
    accountPage.addCardDialog();
})

Then ('He should see the Add Credit Card dialog and input his card information',()=>{
    accountPage.fillCardInfo();
    //cy.getIframeBody().find('input[name="CardNumber"]').clear()
    //switchToIframe().get('input[name="CardNumber"]').clear();
    //cy.get('input[name="CardNumber"]').clear();
    //cy.get('input[placeholder="Credit Card Number"]').clear();
})

When('The user click delete button from credit card section',()=>{
    accountPage.deleteCreditCard();
})

Then('The card should be deleted from the account page',()=>{
    cy.contains('No saved credit card.').should('have.contain','No saved credit card.');
})

When('The user click change button from birthday section to set {string}',(birthdayDate)=>{
    accountPage.changeBirthday(birthdayDate);
})

Then('The user should be able to change the birthday to {string}',(birthdayDate)=>{
    accountPage.getBirthday(birthdayDate);
})