
import{Given, When, Then, After,Before} from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../pages/loginPage.js";
import { accountPage} from "../../pages/accountPage.js";
import { pdpPage } from "../../pages/pdpPage.js"
import { cartPage } from "../../pages/cartPage.js";
import { checkoutPage, CheckoutPage } from "../../pages/checkoutPage.js";



const product ={
    productPrice:0,
    promotionPercent:0
};

Given('The user has added below products into cart',(table)=>{
    
    const userName = Cypress.env('username');
    const password =  Cypress.env('password');
    cy.visit('/nz')
    cy.log(userName);
    loginPage.submitLogin(userName,password);

    cy.wrap(table.hashes()).as('productlist');
    table.hashes().forEach(row => {
        cy.visit(row.link);
        pdpPage.setSize(row.size);
        pdpPage.addProductToCart();
        pdpPage.continueShopping();
        pdpPage.getProductRetailPrice().then((price)=>{product.productPrice=price});
        
    });


})
    
When('The user clicks the checkbox for first product', ()=>{
    
    cy.intercept('/api/promotion/fe/calculate').as('calculate');
    cartPage.getCartPage();

    cy.wait('@calculate').then(({response})=>{
        product.promotionPercent=response.body.Orders[0].OrderItems[0].PromotionPercent;
        cy.log(product.promotionPercent);

        //cy.log(interception.response.body.Orders.OrderItems[0].PromotionPercent);
    })
    cartPage.clickCheckBox(1);
    //cy.get('div.ui-checkbox-box').eq(1).click();
   
})

When('Click the Proceed to Checkout Button',()=>{
    cy.intercept("api/order/check/stock").as('stock')
    cartPage.clickCheckoutBtb();
   
    cy.wait("@stock").its('response.statusCode').should('eq',200);
    
    
    checkoutPage.checkPageCrumb('Checkout');
})

Then('The user should only see this product in the your order section',function(){
    productName = this.productlist[1].name;
    cy.contains('h3',productName).should('be.visible');
    checkoutPage.checkMerchantName('General Pants');
})

Then('Order summary only contains this product price',()=>{
   
    let productPrice = product.productPrice.trim();
    productPrice= productPrice.substring(1);

    let newPrice = parseFloat(productPrice)*(1-parseFloat(product.promotionPercent));
    cy.log(newPrice);

    let finalPrice = '$'+productPrice+'$'+newPrice;
    checkoutPage.getUnitPrice().then((price)=>{expect(price).to.contain(finalPrice)});

    cy.contains('strong',productPrice).invoke('attr','class').then((value)=>{expect(value).to.equal('text-line-through')});
    cy.contains('strong',productPrice).invoke('css','text-decoration').then((css)=>{expect(css).to.contain('line-through')});
})

Then('The user removes all of product from the cart page',()=>{
    cy.intercept("POST","api/promotion/fe/calculate").as("calculate")
    cartPage.getCartPage();
    cy.wait('@calculate').then((interception)=>{expect(interception.response.statusCode).to.be.equal(200)});
    cartPage.removeAllProducts();
})

When('The user select coupon {string} for the product',(couponName)=>{

   checkoutPage.openCouponModal();
   cy.intercept('api/order/check').as('checkReq')
   checkoutPage.selectCoupon(couponName);

   cy.contains('h2',couponName).should('exist');

   cy.wait('@checkReq').its('response.statusCode').should('eq',200);
   cy.get('@checkReq').then((interception)=>{
        //expect(interception.response.body.MMCouponAmount).to.be.equal(10);
        cy.wrap(interception.response.body.MMCouponAmount).as('couponSaving')
        let psaving = 0;
        interception.response.body.Orders.forEach(($order)=>{
            $order.OrderItems.forEach(($item)=>{
                psaving += $item.PromotionAmount;
            })
        })
        cy.wrap( interception.response.body.Orders[0].OrderItems[0].PromotionAmount).as('promoSaving')
   })
   //cy.get('div.custom-modal-body').find('i.close-modal').click()
})
Then("The user should see the Coupon Savings in Order summary", ()=> {
    checkoutPage.getCouponSaving().then(($savings)=>{
        let csaving = $savings.trim().substring(1).trim();
        csaving=csaving.substring(1);
        cy.log(csaving);
        cy.get('@couponSaving').should('equal',parseFloat(csaving));
        
    })
    
})

Then('The user should see the Promotion Savings in Order summary',()=>{
    checkoutPage.getPromoSaving().then(($savings)=>{
        let psaving = $savings.trim().substring(1).trim().substring(1);
        cy.get('@promoSaving').should('equal',parseFloat(psaving));
    })
})