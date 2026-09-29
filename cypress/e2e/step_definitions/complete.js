
import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"

import popKeyword from "../../fixtures/popular.json"

When ("The user clicks the searchbar and donesn't input anything.",()=>{
    
    /* Method 1. using the fixture in intercept function
    cy.intercept(
        {
          method: 'GET',
          path: '/api/search/complete*',
        },
        {
          fixture: 'popular.json',
        },
      ).as('complete')
      */
    
    /*Method 2. using the continue and res.send function 
    cy.intercept("GET","/api/search/complete*",(req)=>{
        req.continue((res)=>{
            res.send({fixture:'popular.json'});
        });
    }).as('complete');
    */

    /*Method 3. using the reply function */
    cy.intercept({method:"GET",url:"/api/search/complete*"},(req)=>{
        req.reply({fixture:'popular.json'})
    }).as('complete')
    
    cy.get('div.header-search-box').click();
    
    

})

Then("In the complete response, the user should see the popular keywords.",()=>{
    /*
    cy.intercept("GET","/api/search/complete*",(req)=>{
        req.continue((res)=>{
            res.send({ fixture: 'popular.json' });
        })
        
    })
    */
    cy.wait('@complete');

    /*print the fixure content*/ 
    cy.fixture('popular.json').then((popWord)=>{
        popWord.forEach(element => {
            cy.log(element.SearchTerm)
        });
    });
    

    cy.get("li[role=option]").should('have.length',6)
   

    cy.get("li[role=option]")
        .each(($liItem,index,$list)=>{
            //cy.log(cy.wrap($liItem).find('a').getValue())
            cy.wrap($liItem).find('a').should('contain.text',popKeyword[index].SearchTerm);
        });

    /*
    cy.wait('@complete').should((inteception)=>{
        cy.log(inteception.response.boby);
        expect(inteception.response.body[0].SearchTerm).to.eql("Samsung");
    })
    */
})