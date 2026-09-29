describe("find text of an attribute in Cypress ", () => {
    it("Alias First Test - Using Invoke Command ", function () {
           cy.visit("https://www.linkedin.com/")
           cy.get('[data-test-id="hero__headline"]').invoke('text').as('textFunction');
   
       });
   
   
       it("Print Value - ALias => Invoke - Command ", function () {
           cy.log("===== Print Value Using Invoke Command ==== ", this.textFunction)
       })
       
 })
   