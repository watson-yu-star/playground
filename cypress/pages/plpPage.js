export class PlpPage{
    elements={
        prodcardList: ()=>cy.get('div.product-item-card')
    };

    locateNthCard(index){
        return this.elements.prodcardList().eq(index);
    }
}
export const plpPage = new PlpPage()