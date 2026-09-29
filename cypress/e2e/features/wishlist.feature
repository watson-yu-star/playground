Feature: user can add item to wishlist from ListPage/PDP/HomePage

  Background:
    # Given Alice starts to browser "TM" site with title "Shop Online for Fashion, Electronics, Sports & More | TheMarket NZ"
@wishlist
  Scenario: user as guest can add item to wishlist from PDP
    Given she goes to PDP with this link 'p/annasui-cup:-testing-only-11.04.2022/5467-TestVJMerchant1'
    When she click wishlist icon in PDP for product with name 'Annasui Cup: Testing Only 11.04.2022'
    Then she should see the number in wishlist icon is 1
    Then she should see product with name 'Annasui Cup: Testing Only 11.04.2022' after navigating to wishlist page
    When she click the wishlist icon in PDP again
    Then she should not see the product in wishlist page and wishlist is empty
@wishlist
  Scenario: user as guest can add item to wishlist from PLP
    Given she browsers to "searchio" version PLP for "macbook" in order "Best Match"
    # And she wants to the product at 1 position to wishlist
    When she click wishlist icon in PLP for the product at position 1
    Then she should see the number in wishlist icon is 1
    Then she should see product in wishlist page
    When she click the wishlist icon in PLP again
    Then she should not see the product in wishlist page and wishlist is empty
@wishlist
  Scenario: user as guest can add item to wishlist from homepage
    Given she lands on the homepage 
    When she click wishlist icon at the first postion in our picks section
    Then she should see the number in wishlist icon is 1
    When she click wishlist icon in homepage again
    Then she should not see the product in wishlist page and wishlist is empty

@wishlist
  Scenario: login user should see his wishlist 
    Given The user already add the below products to his wishlist cart

     | merchant              | name                                 |  skuid | 
     | Test Vicki's Merchant | Annasui Cup: Testing Only 11.04.2022 |  7422125 |
     |  TEST MERCHANT       | All Dok PF Test-04                   |   6481519 |        
    When The user login his account successfully
    Then The user should see the products in wishlist cart
    When The user remove all of prodct from wishlist cart
    Then she should not see the product in wishlist page and wishlist is empty
    
    