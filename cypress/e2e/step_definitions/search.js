import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import { recurse } from "cypress-recurse"
import {searchPage} from "../../pages/searchPage.js"

Given("A user open the themarket home page",()=>{
    cy.visit('/')
})
When('A user clicks the searchbar without typing anything',()=>{
    searchPage.clickSearchBar();

})
Then('The dropdown list should be shown and has POPULAR keyword list',()=>{
    //cy.get('ul[role="listbox"]').find('li[role="presentation"]').should('contain.text','POPULAR')
    searchPage.showDropdownList().find('li[role="presentation"]').should('contain.text','POPULAR')
})

When("A user type {string} into searchbar", (name)=>{
     //cy.get('div.header-search-box').find('input').clear().type(name);
     searchPage.typeKeywordInSearchBar(name);
    
})
Then("The dropdown list should show the suggestions",()=>{
    cy.get('ul[role="listbox"]').find('li[role="option"]').each(function($el, index, $list){
        cy.log($el.text(),index,$list);
    })
    
    cy.get('ul[role="listbox"]').find('li[role="presentation"]').eq(0).should('contain.text','SUGGESTIONS')
    cy.get('ul[role="listbox"]').find('li[role="option"]').its('length').should('be.lessThan',17);

})

When('A user type {string} into searchbar and press the search button', (keyword)=>{
    //cy.get('div.header-search-box').find('input').clear().type(keyword);
    //cy.get('div.header-search-box').find('button[aria-label="Search icon"]').click();
    searchPage.searchItem(keyword)
})

Then('The browser should navigate to search result page',()=>{
    
    cy.url().should('include','search?s=dyson&sc=s&mode=io') 
    cy.get('h1.product-listing--search>span').then(($span)=>{cy.log($span.text().match(/[1-9][0-9]*/g))})
    cy.get('ul.pagination--list li').filter('.pagination--item').find('a').should('have.length.at.most',12);
   
})
Then('A user click next arrow button. It should land on the next page',()=>{
    //cy.get('ul.pagination--list').find('li[class="pagination--item pagination--arrow"]').eq(1).click();
    //cy.location('href').should('include','page=2')
    let i=1;
    recurse(
        () => cy.get('ul.pagination--list').find('li[class="pagination--item pagination--arrow"]').last(),
        ($next) => Cypress.dom.isHidden($next),
        {
          timeout: 30000,
          //delay: 200, // just to make it clear what is going on
          post () {
            cy.get('ul.pagination--list').find('li[class="pagination--item pagination--arrow"]').last().click()
          },
        }
      )
})

When ("A user clear the searchbar and focus on the searchbar",()=>{
    searchPage.clearSearchBar();
})
Then ('Recent keyword {string} should be listed in the dropdown list',(recentKeyword)=>{
    searchPage.showDropdownList().find('li[role="presentation"]').first().should('contain.text','RECENT');
    searchPage.showDropdownList().find('li[role="presentation"]').first().next().should('contain.text',recentKeyword);
})