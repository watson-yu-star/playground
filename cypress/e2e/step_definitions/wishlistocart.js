import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor"; 
import { pdpPage } from "../../pages/pdpPage";
import { searchPage } from "../../pages/searchPage";
import { plpPage } from "../../pages/plpPage";
import { wishlistPage } from "../../pages/wishlistPage";
import { homePage } from "../../pages/homePage";
import { cartPage } from "../../pages/cartPage";

When('she click wishlist icon in menu',()=>{
    cy.get('a[href="/nz/wishlist"]').click();
})
Then('she should see the wishlist page as empty',()=>{
    
   wishlistPage.getEmptyText().should('contain.text','Your wishlist is empty');
})

When('she click add-to-cart for product {string}',(productName)=>{
    wishlistPage.clickNthProductToCart(0);
    //cy.get('section.wishlist__product-list').find('div.product-card').eq(0).find('button[type="submit"]').click();
   
})
Then('she add product to cart without choosing option',()=>{
    wishlistPage.addProductToCart();
    //cy.get('div.pdp-panel').find('button[type="submit"]').click();
})

Then('she should see successful message shown',()=>{
    wishlistPage.getSuccssSpan().should('contain.text','You have successfully added an item in your cart');
   //cy.get('div.pdp-panel').find('div.pdp-alert').find('span').should('contain.text','You have successfully added an item in your cart')
})

Then('she should see two optional actions shown',()=>{
    wishlistPage.getViewCartBtn().should('contain.text','View Cart & Checkout').should('be.enabled');
    wishlistPage.getStayWishlistBtn().should('contain.text',' Stay on wishlist').should('be.enabled');
})

When('she choose view cart & checkout button', ()=>{
    wishlistPage.getViewCartBtn().click();
    cy.wait(200);
})
Then('she should see the item number becomes 1 in cart icon',()=>{
    cartPage.getCartSpan().should('contain.text','1')
})
Then('she should see the following product in cart',(productTable)=>{
    productTable.hashes().forEach((row) => {
        //cy.log("merchantname"+cartPage.getMerchantName().invoke('text'));
        //cy.log(row.merchant);
       cartPage.getMerchantName().should('contain.text',row.merchant);
        cartPage.getProductName().should('contain.text',row.name);
    });
})
When('she add product to cart with choosing color option {string}',(color)=>{
    wishlistPage.getColorChip(color).click();
    wishlistPage.addProductToCart();

})

When('she add product to cart with choosing color option {string} and size option {string}', (color,size)=>{
    wishlistPage.getColorChip(color).click();
    wishlistPage.getSizeChip(size).click();
    wishlistPage.addProductToCart();

})