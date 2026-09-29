Feature: Login
   Login feature neeed user input correct email and password.

    Background:
       Given The user open the themarket website

     Scenario Outline:: Login correctly
       # Given The user open the themarket website
        When The user clicks the Login button. And The user input correct "<email>" and "<password>"
        Then The user should login his account successfully and show name "<name>"
       Examples:
          |email                            |  password    |   name       |
          |watson.yu@themarket.nz          |  Welcome%2019    |   MTester     |
          |0284167393                       |  Welcome%2019    |   MTester     |
   
    Scenario: Logout correctly
       Given The user has login successfully
       When The user click the logout button
       Then The user should logout his account 

    Scenario Outline: Login unsuccessfully
       #Given The user open the themarket website
      When The user input the wrong "<email>" or "<password>" and click the login button
      Then The user can not login successfully
      Examples:
          |email                  |  password    | 
          |abc@gmail.com          |  Welcome2019 |
          |0281847393             |  asdgg122    |