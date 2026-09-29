import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"


Given("The user land on the homepage of the market",()=>{
    cy.visit("/nz");
})

When('The user input {string} into the searchbar',(name)=>{

    cy.intercept('GET','/api/search/autocomplete*').as('autocomplete');

    cy.get('div.header-search-box').type(name);
    //cy.wait(2000);
/*
    cy.wait('@autocomplete').should((inteception)=>{
        cy.log(inteception.response.body.bestSuggestion);
        expect(inteception.response.body.bestSuggestion).to.eql('shoes');
    })
    */
})
Then('In the response, the user should see the bestsuggestions.',()=>{
   // cy.get('div.header-search-box').find('button[aria-label="Search icon"]').click();
  
    cy.wait('@autocomplete').then((inteception)=>{
    cy.log(inteception.response.body.bestSuggestion);
    expect(inteception.response.body.bestSuggestion).to.eql('shoes');
})
   
   /*
    cy.intercept('/api/search/autocomplete',(req)=>{

        req.on('response',(res)=>{
            cy.log(res.body.bestSuggestion);
        })ß

        req.continue((res)=>{

        });

    });
    */
})