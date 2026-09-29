export class AccountPage{
    elements = {
        //loginDialog:()=>cy.get('div.header-icon-nav__user'),
        logoutBtn:()=>cy.get("a[href='/nz/logout']"),
        addCardBtn:()=>cy.get('button[data-test="add-card-btn"]'),
        cardInput:()=>cy.getIframeBody().find('input[name="CardNumber"]'),
        expireInput:()=>cy.getIframeBody().find('input[name="cc-exp"]'),
        cvcInput:()=>cy.getIframeBody().find('input[name="Cvc2"]'),
        challengeFrame:()=>cy.getIframeBody().find('iframe').its('0.contentDocument.body',{ log: false }).should('not.be.empty').then((body)=>cy.wrap(body)),
        
        addBtn:()=>cy.getIframeBody().find('#Submit'),
        doneBtn:()=>cy.getIframeBody().contains('button','Done'),
        deleteCreditCardBtn:()=>cy.contains('div','Credit Card').find('.tm-trash'),
        birthDaySection:()=>cy.contains('div','Date of Birth')
      };
    
    submitLogout(){
       
        this.elements.logoutBtn().click();
       
    }

    gotoAccountpage(){
        cy.get('a[href="/nz/account"]').click()
    }

    addCardDialog(){
        this.elements.addCardBtn().click();
    }
    fillCardInfo(){

        
        cy.intercept('https://safekeyacs-qa.americanexpress.com/payments/digital/gravity/v1/3ds/v2x/3dsmethod/capture').as('capture');

        /*  Winthin command is good choice for iframe
        cy.getIframeBody().within(($iframe)=>{
            //cy.get('#change-cc-details').within(($modalbody)=>{
                cy.get('input[name="CardNumber"]').clear().type('3712 4609 0811 019');
                
            //})
        })
        */
        

        this.elements.cardInput().clear().type('3712 4609 0811 019');
        this.elements.expireInput().clear().type('12/25');
        this.elements.cvcInput().clear().type('123');
        this.elements.addBtn().click();
        //cy.wait(1000);
        
        //cy.getIframeBody().find('#ThreeDSChallengeDiv').should('not.be.empty').as('challengeDiv');
        //cy.get('@chllengeDiv').get('iframe[name="ThreeDSChallengeIFrame"]').find('#code').clear().type('123');
        //this.elements.challengeFrame().find('#code').clear().type('123');
        //this.elements.challengeFrame().find('.btn-info').click();
      
        
        cy.wait('@capture',{timeout:10000}).then((interception)=>expect(interception.response.statusCode).to.equal(200));

        cy.get('#cc-iframe')
          .its('0.contentDocument')
          .its('body')
          .find('iframe')
          .its('0.contentDocument')
          .its('body')
          .find('#code')
          .clear().
          type('123');

        cy.get('#cc-iframe')
          .its('0.contentDocument')
          .its('body')
          .find('iframe')
          .its('0.contentDocument')
          .its('body')
          .find('.btn-info')
          .click();
        
        cy.wait(1000);
        cy.getIframeBody().contains('success').should('have.contain','success');

        cy.get('.close-modal').click();

        cy.get('div[data-test="primary-card-number"]').should('contain.text','****1019');

        

        //this.elements.doneBtn().click();
        //cy.getIframeBody().get('.close-modal').click()
    }

    deleteCreditCard(){
        this.elements.deleteCreditCardBtn().click();
        cy.log('deleting card');
    }

    changeBirthday(birthdayDate){
        this.elements.birthDaySection().find('a').click();
        cy.get('#change-profile-pop-up').find('input').clear().type(birthdayDate);
        cy.get('#change-profile-pop-up').find('button').click();
        cy.get('#change-profile-pop-up').find('.close-modal').click();
    }
    getBirthday(birthdayDate){
        return this.elements.birthDaySection().find('.view-only').should('contain.text',birthdayDate);
    }
}

export const accountPage=  new AccountPage();