import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../pages/loginPage.js";
import { accountPage} from "../../pages/accountPage.js";
import { pdpPage } from "../../pages/pdpPage.js"
import { cartPage } from "../../pages/cartPage.js";


Given('A user add the below products to Cart',(table)=>{
    cy.wrap(table.hashes()).as('productlist');
    cy.get('@productlist').each(function($el,index,$productlist){
        cy.log($el.name);
        cy.log($el.size);
    })
    table.hashes().forEach((row) => {
        cy.visit(row.link);
        pdpPage.setSize(row.size);
        pdpPage.addProductToCart();
        pdpPage.continueShopping();
       // cy.contains('span.ui-chip-inner',row.size).click();
       // cy.contains('button','Add to cart').click();
        //cy.contains('button','Continue Shopping').click();
      });

})

When('A user click the Cart from the header',()=>{
    cartPage.getCartPage();
    cy.get('li.bread-crumbs__crumb').last().should('contain.text','Cart')
})

Then('He should see the products on the cart page', ()=>{
    /*const userName = Cypress.env('username');
    const password =  Cypress.env('password');
    loginPage.submitLogin(userName,password);
    */
    cy.get('@productlist').each(function($el,index,$productlist){
        cy.get('td.goods-page-description').eq(index).find('h3>a').should('contain.text',$el.name);
    })
    //cy.wait(5000);
})

When ('A user check the summary of the cart',function (){
    
    cy.get('div.price').each(($price,index)=>{
        if(index ==0){
            cy.wrap($price).find('strong').invoke('text').then(function($text){cy.wrap($text.trim().substring(1)).as('price0')});
        }else if(index==2){
            cy.wrap($price).find('strong').invoke('text').then(function($text){cy.wrap($text.trim().substring(1)).as('price1')})
        }
    })
})
Then ('He should see the Order Summary correctly',function() {
    var total=0.00;
    let ssubTotal = parseFloat(this.price1)+parseFloat(this.price0);

    cy.contains('div','Order Summary').find('ul>li').each(function ($el,index){
        switch (index) {
            case 0:
                //cy.log($el.text())
                cy.wrap($el)
                .find('span')
                .invoke('text')
                .then((text)=>{
                                let result = text.replace('$','').trim();
                                total=parseFloat(result);
                                expect(Number(total)).to.equal(ssubTotal)
                            });
                cy.wrap($el).find('span').invoke('text').then(function(text){cy.wrap(text.trim().substring(1)).as('subTotal')});
                cy.get('@subTotal').should('eq',ssubTotal.toString());
               
                break;
            case 1:
                cy.log($el.text());
                cy.wrap($el).find('span').invoke('text').then((text)=>{cy.log(text)});
               
                break;
            case 2:
                cy.wrap($el).find('div.ui-select').click();
                cy.log('case=2')
                cy.wrap($el).find('li.ui-select-option a').each(($li,index)=>{
                    cy.log($li.text().trim())
                    if($li.text().trim()=='Wellington'){
                        cy.wrap($li).click();
                    }
                })
                cy.wrap($el).find("input").invoke('val').should('be.equal','2');
                cy.wrap($el)
                   .find('span.disp')
                   .invoke('text')
                   .then(function($text) {
                            let len = $text.trim().length;
                           cy.wrap($text.trim().substring(7,len-1)).as('deliveryFee');
                           cy.get('@deliveryFee').should('eq','15.00');
            
                           });

               ;
                break;
            case 3:
                break;
            case 4:
                cy.log($el.text());
                cy.get('@deliveryFee').then(function(fee){cy.wrap(parseFloat(fee)+ssubTotal).as('total')})
                cy.get('@total').should('eq',parseFloat($el.text().trim().substring(6)));
                //cy.wrap($el).find('span').invoke('text').should('be.equal',)
            default:
                break;
        }
    })
})



When( 'A user change the Quantity of first product to {string} from the cart page', (amount)=>{

    cartPage.getCartPage();
    cy.get('div.cart-quantity-list input').first().click({force:true});
    //cy.get('ul.ui-select-options-list').contains('li',amount).click();
    cy.get('ul.ui-select-options-list li').each((itemlist,index,$list)=>{
        const itemText = itemlist.text().trim();
        if(itemText===amount){
            cy.wrap(itemlist).click();
        }
    })
})

Then('He should see the number become {string} on the top of cart',(amount)=>{
    cy.get('a[href="/nz/cart"]').find('span').first().should('contain.text',amount)
})

When('A user click remove button of the product',()=>{
    cartPage.getCartPage();
    cy.get('@productlist').each(function($el,index,$productlist){
       cartPage.removeProduct($el.name);
    })
    /*
    cy.get('i.tm-trash').each(itemlist=>{
        cy.wrap(itemlist).click();
    })*/
})
Then('The product should be removed',()=>{
    cy.get('h1').should('contain.text','Your cart is empty');
    cy.screenshot();
})