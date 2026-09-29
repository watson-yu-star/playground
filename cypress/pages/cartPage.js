

export class CartPage{
    elements={
        breadCrumb: () => cy.get('li.bread-crumbs__crumb').eq(1),
        cartIcon: ()=> cy.get('a[href="/nz/cart"]'),
        btnCheckout: ()=>cy.contains('button','Proceed to Checkout'),
        checkBoxes: ()=>cy.get('div.ui-checkbox-box'),
        goodsDescritionTds: ()=>cy.get('td.goods-page-description').should("exist"),
        removeBtns: ()=>cy.get("td.goods-page-description i.tm-trash"),
        cartSpan:()=>cy.get('div.header-icon-nav__cart').find('span').eq(0),
        merchantName:()=>cy.get('div.cart-merchant-name'),
        productName:()=>cy.get('h3.blurred'),
        cartEmpty:()=>cy.contains('h1',"Your cart is empty")
    };
    
    getCartPage(){
        this.elements.cartIcon().click();
    }

    clickCheckoutBtb(){
        this.elements.btnCheckout().click();
    }
    clickCheckBox(index){
        this.elements.checkBoxes().eq(index).click();
    }
    removeAllProducts(){

        this.elements.goodsDescritionTds()
                     .then(($tds)=>{
                        $tds.each(($td)=>{
                            cy.intercept('post','api/cart/fe/item/remove').as('removelist')
                            this.elements.removeBtns().first().click({force:true});
                            cy.wait('@removelist')
                        })
                     })

        this.elements.cartEmpty().should('exist');
                    
    }

    getCartSpan(){
        return this.elements.cartSpan();
    }
    getMerchantName(){
        return this.elements.merchantName();
    }
    getProductName(){
        return this.elements.productName();
    }
    removeProduct(productname){
        cy.contains('td.goods-page-description',productname).find('i.tm-trash').click();
    }
}
export const cartPage = new CartPage()