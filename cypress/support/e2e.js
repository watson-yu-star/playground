// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { cartPage } from '../pages/cartPage';
import { loginPage } from '../pages/loginPage';
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(()=>{
    cy.log('set localStorage to disable popup windows');
    const  today= new Date();
    localStorage.setItem('squid-twg-vue-l-epu-d',today.getTime())
   
    
})

before(()=>{

  Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // returning false here prevents Cypress from
    // failing the test
    if (promise){
      return false
    }
  
  })

  let accessToken,userKey;
  const  today= new Date();
  cy.log('Reset the account status by API')
  cy.apiLogin().as('apiLogin')
  cy.get('@apiLogin')
    .should((res=>{expect(res.status).to.eq(200)}))
    .its('body')
    .then((body)=>{
        accessToken=body.Token;
        userKey= body.UserKey;

        //check cart is empty and remove all of product from cart
        cy.log("*** check the cart and empty it****");
        cy.request({method:"GET",
                     url:'api/cart/fe/view?cc=EN&UserKey='+userKey,
                     headers:{"access-token":accessToken}}).as('cartview');

        cy.get("@cartview")
           .should((res)=>expect(res.status).to.eq(200))
           .its('body')
           .then((body)=>{
                if(body.ItemList.length==0)
                 return;
                body.ItemList.forEach((item)=>{
                      cy.request({method:"POST",
                            url: "api/cart/fe/item/remove",
                            body:{
                              CartItemId:item.CartItemId,
                              CartKey:null,
                              CultureCode:"EN",
                              UserKey:userKey
                            },
                            headers:{"access-token":accessToken}})
              })
           })
          
           //check wishlist is empty and remove all of product from wishlist cart
          cy.log("*** check the wishlist and empty it****");
          cy.request({method:"GET",
                      url:"api/wishlist/fe/view?cc=EN&UserKey="+userKey,
                      headers:{"access-token":accessToken}}).as('wishlistCartview')
          cy.get('@wishlistCartview')
            .should((res)=>{expect(res.status).to.eq(200)})
            .its('body')
            .then((body)=>{
                  if(body.CartItems.length == 0)
                   return;
                  body.CartItems.forEach((item)=>{
                    cy.request({method:"POST",
                                url:"api/wishlist/fe/item/remove",
                                body:{
                                  CartItemId:item.CartItemId,
                                  CartKey:null,
                                  CultureCode:"EN",
                                  UserKey:userKey},
                                headers:{"access-token":accessToken}
                              })
                  })
                 

            })

          cy.log('*** check the credit card*****')
          cy.request({method:"GET",
                  url:"api/userpaymentcard/fe/list?UserKey="+userKey,
                  headers:{"access-token":accessToken}}).as('cardlist');
          cy.get('@cardlist')
          .should((res)=>{expect(res.status).to.eq(200)})
          .its('body')
          .then((body)=>{
            if(body.HitsTotal===0){
              return;
            }
            else{
              body.PageData.forEach((item)=>{
                cy.request({method:"POST",
                            url:"api/userpaymentcard/fe/inactivate",
                            body:{
                              UserKey:userKey,
                              UserPaymentCardKey:item.UserPaymentCardKey},
                            headers:{"access-token":accessToken}
                          }).as('removeCard');
                cy.get("@removeCard")
                  .should((res)=>{expect((res.status).to.eq(200))});
              })
            }
          })
           cy.apiLogout(accessToken);
        })

  
 
})
/*

afterEach(() => {
    cy.log('The test case is finished')
    
  })

before(()=>{
    cy.log('run only once before all of test)
  })

after(()=>{
    cy.log('run only once after all of test)
  })
  */