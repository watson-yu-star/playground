

export class PdpPage{
    elements={
        addToCartBtn: () => cy.contains('button','Add to cart'),
        continueShoppingBtn: ()=> cy.contains('button','Continue Shopping'),
        minusBtn: ()=>cy.get('button.qty-btn').first(),
        plusBtn:()=>cy.get('button.qty-btn').last(),
        inputQuantity:()=>cy.get('#product-quantity'),
        getSkuName:()=>cy.get('h1.pdp-sku-name'),
        cityDiv:()=>cy.get('div.ui-select'),
        priceDiv:()=>cy.get('div.price').find('strong'),
        mclubcouponList:()=>cy.get('div.exclusive-coupon-chip-list'),
        couponModal:()=>cy.get('div.custom-modal-body'),
        wishlistBtn:()=>cy.get("div.pdp-box-row").find('button.wishlist-btn')
    };

    setSize(size){
        cy.contains('span.ui-chip-inner',size).click();
    }
    addProductToCart(){

        let baseURL = Cypress.config('baseUrl').trim()
        baseURL= baseURL.substring(0,baseURL.length-1);
        cy.log(baseURL);
        cy.getAllLocalStorage().then((items)=>{
            
          if(items[baseURL]['squid-twg-vue-member']){
            cy.intercept('api/cart/fe/item/add').as('addproduct');
          }
          else{
            cy.intercept('api/cart/fe/item/add/guest').as('addproduct');
         }
        })
        
        
        this.elements.addToCartBtn().click();

        cy.wait('@addproduct',{timeout:10000}).its('response.statusCode').should('eq',200);
    }
    continueShopping(){
        this.elements.continueShoppingBtn().click();
    }
    plusQuantity(){
        this.elements.plusBtn().click();
    }
    minusQuanyity(){
        this.elements.minusBtn().click();
    }
    selectColor(color){
        cy.contains('a.ui-chip',color).click();
    }
    getQuantity(){
        return this.elements.inputQuantity();
    }
    setQuantity(qty){
        this.elements.inputQuantity().clear().type(qty);
    }
    getProductName(){
        return this.elements.getSkuName();
    }
    clickCityDroplist(){
        this.elements.cityDiv().click();
    }
    selectCity(city){
        cy.contains('li.ui-select-option',city).click();
    }
    getProductRetailPrice(){
        return this.elements.priceDiv().invoke('text');
    }
    clickMClubCoupon(){
        this.elements.mclubcouponList().click();
    }
    closeCouponList(){
        this.elements.couponModal().find('i.close-modal').click();
    }
    getPrice(){
        this.elements.priceDiv().invoke('text').then(((text)=>{
            let result = text.replace('$','').trim(),
            total=parseFloat(result);
            return total;
    }))  
    }

    clickWishlistBtn(){
        this.elements.wishlistBtn().should('be.visible');
        this.elements.wishlistBtn().click();
    }
}

export const pdpPage = new PdpPage()