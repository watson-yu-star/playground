Feature: searchbar
  User type keyword to search the product from the website
  
  Background:
   Given A user open the themarket home page
  
  @searchbar
  Scenario: without typing anything 
    
    When  A user clicks the searchbar without typing anything
    Then The dropdown list should be shown and has POPULAR keyword list
  
  @searchbar
  Scenario: type keyword with 2 letters for suggestions
    When A user type "sh" into searchbar
    Then The dropdown list should show the suggestions
  
  @searchbar
  Scenario: search dyson
    When A user type "dyson" into searchbar and press the search button
    Then The browser should navigate to search result page
    Then A user click next arrow button. It should land on the next page
    When A user clear the searchbar and focus on the searchbar
    Then Recent keyword "dyson" should be listed in the dropdown list
  