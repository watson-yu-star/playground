
import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor"; 
import { pdpPage } from "../../pages/pdpPage";
import { searchPage } from "../../pages/searchPage";
import { plpPage } from "../../pages/plpPage";
import { wishlistPage } from "../../pages/wishlistPage";
import { homePage } from "../../pages/homePage";
import { loginPage } from "../../pages/loginPage";
import { v4 as uuidv4 } from "uuid";

Given("she goes to PDP with this link {string}",(path)=>{
    cy.visit('nz/'+path);
})
When("she click wishlist icon in PDP for product with name {string}",(productName)=>{
    pdpPage.clickWishlistBtn();
    
    cy.wrap(productName).as('wishProduct');
})

Then("she should see the number in wishlist icon is 1",()=>{
    wishlistPage.gotoWishlistPage();
    cy.get('i.tm-heart-wish').find('span').should('contain.text',1);
    cy.get('div.product-card').its('length').should('eq',1);
    //cy.wait(200);
})

Then("she should see product with name {string} after navigating to wishlist page",(name)=>{

    cy.get('div.product-card').should('contain.text',name);

})

Given("she browsers to {string} version PLP for {string} in order {string}",(searchVersion,searchItem,orderBy)=>{
    cy.visit('/nz');
    searchPage.searchItem(searchItem);
    cy.url().should('contain','mode='+searchVersion.slice(6))
})
Then('she click wishlist icon in PLP for the product at position 1', ()=>{
    plpPage.locateNthCard(0).find('button.wishlist-btn').click();
})

Then('she should see product in wishlist page',()=>{
    cy.get('div.product-card').its('length').should('equal',1);
})

When('she click the wishlist icon in PDP again',()=>{
    cy.go('back');
    //cy.get("div.pdp-box-row").find('button.wishlist-btn').should('be.visible');
    pdpPage.clickWishlistBtn();
    
})
Then('she should not see the product in wishlist page and wishlist is empty',()=>{
   // wishlistPage.getAmountOfProducts().should('eq',0);
   cy.go('forward');
   cy.get('div.alert-box-container').should('contain.text','Your wishlist is empty');
})

When('she click the wishlist icon in PLP again', ()=>{
    cy.go('back');
    plpPage.locateNthCard(0).find('button.wishlist-btn').click();
})

Given('she lands on the homepage',()=>{
    cy.visit('nz');
})

When('she click wishlist icon at the first postion in our picks section',()=>{
    homePage.wishlistNthProduct(0);
    //cy.get('div.top-products-home').find('div.product-card').eq(0).find('i.tm-heart-wish').click();
    cy.get('div.top-products-home').find('div.product-card').eq(0).find('i.tm-heart-wish').should('have.class',"tms tm-heart-wish active");
  
})

When('she click wishlist icon in homepage again',()=>{
    cy.go('back');
   //homePage.wishlistNthProduct(0).click();
    cy.get('div.top-products-home').find('div.product-card').eq(0).find('i.tm-heart-wish').click();
    cy.get('div.top-products-home').find('div.product-card').eq(0).find('i.tm-heart-wish').should('have.class',"tms tm-heart-wish");
})

Given("The user already add the below products to his wishlist cart", function(tableData) {
    
    let accessToken,userKey;
    cy.wrap(tableData.hashes()).as('productList')
    cy.request('POST','/api/auth/login',{
        Username: Cypress.env('username'),
        Password: Cypress.env('password'),}).as('login')
    cy.get('@login')
       .should((res)=>{expect(res.status).to.eq(200)})
       .its('body')
       .then((body)=>{
             accessToken=body.Token;
             userKey= body.UserKey;
             let sessionKey = uuidv4();
             cy.get('@productList').each((row)=>{
                cy.request({method:"POST",
                            url:"/api/wishlist/fe/item/add",
                            headers:{"access-token":accessToken},
                            body:{
                            "CartKey": null,
                            "CultureCode": "EN",
                            "SessionKey": sessionKey,
                            "SkuId": row.skuid,
                            "UserKey": userKey,
                            "ViewIndex": 2}})
                    .then((resp)=>{expect(resp.status).to.eq(200)})
                });
            })
    
})

When("The user login his account successfully",()=>{
    cy.visit('/nz');
    //loginPage.clickLogin();
    cy.wait(2000);
    const name = Cypress.env('username');
    const password = Cypress.env('password');
    loginPage.submitLogin(name,password);

})
Then("The user should see the products in wishlist cart",()=>{
    wishlistPage.gotoWishlistPage();
   
    cy.get('@productList').then((list)=>{
        wishlistPage.getAmountOfProducts().should('equal',list.length);
    })
    
})

When("The user remove all of prodct from wishlist cart",()=>{
    cy.get('@productList').each((row)=>{
        wishlistPage.removeProduct(row.name);
    })
})
    
