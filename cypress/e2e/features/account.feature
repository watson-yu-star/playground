Feature: Account
   You can change the setting of account by visiting account page
    Background:
      Given The user login his account and land on the account page
    @account
    Scenario: Add credit card into account
    
      When  The user click the add card button
      Then He should see the Add Credit Card dialog and input his card information
     @account
    Scenario: Delete credit card for the account
     
      When  The user click delete button from credit card section
      Then The card should be deleted from the account page
     @account
    Scenario Outline: Change the birthday
      
      When  The user click change button from birthday section to set "<birthdaydate>"
      Then The user should be able to change the birthday to "<birthdaydate>"

      Examples:
      | birthdaydate |  
      | 2001-08-12  |
      | 1997-07-01  |