export class WishlistPage{
    elements={
        wishlistSection:()=>cy.get('section.wishlist__product-list'),
        breadCrumb:()=>cy.get('li.bread-crumbs_crumb'),
        emptyBox:()=>cy.get('div.alert-box-container'),
        addToCartPanel:()=>cy.get('div.pdp-panel'),
        addToCartBtn:()=> cy.get('div.pdp-panel').find('button[type="submit"]'),
        successSpan:()=>cy.get('div.pdp-panel').find('div.pdp-alert').find('span'),
        viewCartBtn:()=>this.elements.addToCartPanel().find('button[type="submit"]'),
        staywishlistBtn:()=>this.elements.addToCartPanel().find('button.button__underline'),
        colorVariantDiv:()=>cy.get('div#prod-color'),
        sizeVariantDiv:()=>cy.get('div#prod-size')
    }
    getBreadCrumb(){
        return this.elements.breadCrumb().eq(2);
    }
    getNthProduct(index){
        this.elements.wishlistSection().find('div.product-card').eq(index);
    }
    getAmountOfProducts(){
        return this.elements.wishlistSection().find('div.product-card').its('length');
    }
    getEmptyText(){
       return cy.get('div.alert-box-container');
    }
    clickNthProductToCart(index){
        //this.getNthProduct().find('button[type="submit"]').eq(index).click();
         cy.get('section.wishlist__product-list').find('div.product-card').eq(index).find('button[type="submit"]').click();
    }
    addProductToCart(){
        this.elements.addToCartBtn().click();
        //cy.get('div.pdp-panel').find('button[type="submit"]').click()
    }
    getSuccssSpan(){
       return this.elements.successSpan();
    
    }
    getViewCartBtn(){
        return this.elements.viewCartBtn();
    }
    getStayWishlistBtn(){
        return this.elements.staywishlistBtn();
    }
    getColorChip(color){
        return this.elements.colorVariantDiv().contains('a.ui-chip',color);
    }

    getSizeChip(size){
        return this.elements.sizeVariantDiv().contains('a.ui-chip',size);
    }
    gotoWishlistPage(){
        cy.get('a[href="/nz/wishlist"]').click();
    }
    removeProduct(name){
        cy.intercept('POST','api/wishlist/fe/item/remove').as('removewishlist')
        this.elements.wishlistSection().contains('div.product-card',name).find('button.wishlist-btn').click();
        cy.wait('@removewishlist').then((interception)=>expect(interception.response.statusCode).to.equal(200));
        //cy.wait('@removewishlist').should('have.property', 'response.statusCode', 200);
    }
}

export const wishlistPage = new WishlistPage()