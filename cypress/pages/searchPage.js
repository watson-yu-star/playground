export class Searchpage{
    elements={
        searchBar:()=> cy.get('div.header-search-box'),
        dropdownList: ()=>cy.get('ul[role="listbox"]'),
    }
    clickSearchBar(){
        this.elements.searchBar().click();
    }
    showDropdownList(){
        return this.elements.dropdownList();
    }
    typeKeywordInSearchBar(keyword){
        this.elements.searchBar().find('input').clear().type(keyword);
    }
    clearSearchBar(){
        this.elements.searchBar().find('input').clear().focus();
    }
    searchItem(keyword){
        this.elements.searchBar().find('input').clear().type(keyword+'{enter}');
    }

}
export const searchPage = new Searchpage()