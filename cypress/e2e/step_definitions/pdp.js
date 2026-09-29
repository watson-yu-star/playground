import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
import { pdpPage } from "../../pages/pdpPage.js";

Given('User land on the below product detail page',(datatable)=>{
    /*
    const item={
        name: 'Long Sleeve Crew Neck T-Shirt men',
        color: 'Black',
        size: 'XL',
        link: '/p/boody-2-pack-mens-long-sleeve-crew-neck-t-shirt-men/5621-ID44026988?siq=f6bfae06-0642-491f-9e98-4ee2cd97a42e&sii=5621ID44026988&mode=io'
    }
    cy.wrap(item).as('product');
   
   cy.visit(item.link);
    pdpPage.selectColor(item.color);
    pdpPage.setSize(item.size);
    pdpPage.getProductName().should('contain',item.name)
    */
   datatable.hashes().forEach(item => {
    cy.visit(item.link);
    pdpPage.selectColor(item.color);
    pdpPage.setSize(item.size);
    pdpPage.getProductName().should('contain',item.name)
    pdpPage.getProductRetailPrice().then((price)=>{
        cy.log(price);
        let result = price.replace('$','').trim();
        cy.log(result);
    });
   });

})
      
When('User click the Plus button',()=>{
    pdpPage.plusQuantity();
})

Then('The Quantity should be increased 1', ()=>{
   // pdpPage.getQuantity().should('have.value',2);
   cy.get('#product-quantity').should('have.value','2');

})

When('User clicks the Minus button',()=>{
    pdpPage.minusQuanyity();
})

Then('The Quantity should be decreased 1',()=>{
    pdpPage.getQuantity().should('have.value','1');
    cy.get('#product-quantity').should('have.value','1');

})

When('User inputs {string} to prodct quantity editbox',(qty)=>{
    pdpPage.setQuantity(qty);
});

Then ('User should see the {string} inside the editbox',(qty)=>{
    pdpPage.getQuantity().should('have.value',qty);
    
});

When('User clicks the dropdown list of location and click {string}',(city)=>{
    pdpPage.clickCityDroplist();
    pdpPage.selectCity(city);
    
})

Then('The shipping location should be changed to {string}',(city)=>{
    cy.get('a.ui-select-value').should('contain.text',city);
    cy.screenshot();
})

When('User clicks the coupon list',()=>{
    pdpPage.clickMClubCoupon();
})
Then('The coupon list modal should show up',()=>{
    cy.get('div.modal-header').should(($div)=>{expect($div).to.contain.text('Coupons')});
    cy.get('div.custom-modal-body').should('exist');
})
When('User clicks the close button',()=>{
    pdpPage.closeCouponList();
})
Then('The modal should be closed',()=>{
    cy.get('div.custom-modal-body').should('not.exist')
})

beforeEach(()=>{
    cy.log('beforeEach again');
})