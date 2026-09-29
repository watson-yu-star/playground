import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('The user access the redirect API',()=>{
    cy.request('api/search/redirect').as('redirect')
})
Then('He should see the id and URL of Category and Brand from response',()=>{
    cy.get('@redirect').should((response)=>{
        expect(response.body).to.have.property('categories');
       // expect(response.body.categories).to.have.length(2); just for staging
        expect(response.body.categories[1]).to.have.property('id');
        expect(response.body.categories[1]).to.have.property('url');
        expect(response.body).to.have.property('brands')
    })
}
)