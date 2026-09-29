export class HomePage{
    elements={
        ourPicks:()=>cy.get('div.top-products-home')
    }

    getNthOurPicksProduct(index){
        return this.elements.ourPicks().find('div.product-card').eq(index);
    }
    wishlistNthProduct(index){
        this.getNthOurPicksProduct(index).find('i.tm-heart-wish').click();
    }
}

export const homePage = new HomePage()