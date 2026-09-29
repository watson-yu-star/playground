export class CheckoutPage{
    elements={
        breadCrumb: () => cy.get('li.bread-crumbs__crumb').eq(1),
        merchantName:()=>cy.get('div.cart-merchant-name'),
        productItem:()=>cy.get('h3'),
        productUnitPrice:()=>cy.get('td.goods-page-price'),
        couponModal:()=>cy.contains('span','Select a Coupon'),
        couponRadio:(name)=>cy.contains('div.radio-select',name),
        couponSaving:()=>cy.contains('li','Coupon Savings'),
        promoSaving:()=>cy.contains('li','Promo Savings')
    }

    checkMerchantName(name){
        this.elements.merchantName().should('contain.text',name)
    }
    checkPageCrumb(crumb){
        this.elements.breadCrumb().should('have.text',crumb)
    }
    getUnitPrice(){
       return this.elements.productUnitPrice().eq(0).invoke('text');
    }
    openCouponModal(){
        this.elements.couponModal().should('exist')
        this.elements.couponModal().click();
        cy.contains('h2','Select Coupon').should('exist');
    }
    selectCoupon(couponName){
        this.elements.couponRadio(couponName).click();
    }
    getCouponSaving(){
        return this.elements.couponSaving().find('strong').invoke('text');
    }
    getPromoSaving(){
        return this.elements.promoSaving().find('strong').invoke('text');
    }
}

export const checkoutPage =  new CheckoutPage();