Feature: complete request
    When the user click the searchbar and doesn't input anything, it call the complete API to get the popluar keywords.

    Scenario: Popular keywords
     Given The user land on the homepage of the market
     When  The user clicks the searchbar and donesn't input anything.
     Then In the complete response, the user should see the popular keywords.
    