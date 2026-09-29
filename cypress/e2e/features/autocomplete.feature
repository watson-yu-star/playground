Feature: autocomplete request
   When the user search the keyword from the searchbar, it call the autocomplete API to get the suggestions.

    Scenario: Has bestsuggestions keyword
    Given The user land on the homepage of the market
    When  The user input "shoe" into the searchbar
    Then In the response, the user should see the bestsuggestions.
    