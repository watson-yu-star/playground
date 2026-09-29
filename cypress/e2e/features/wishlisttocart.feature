Feature: user can add item to cart from wishlist page
  
  @wishlist
  Scenario: empty wishlist showing correctly
    Given she lands on the homepage 
    When she click wishlist icon in menu
    Then she should see the wishlist page as empty
  @wishlist
  Scenario: guest can add non-color/non-size product into cart in wishlist
    Given she goes to PDP with this link 'p/korean-dictionary/5467-TMM-241.020:22I'
    When she click wishlist icon in PDP for product with name 'Korean Dictionary'
    Then she should see the number in wishlist icon is 1
    When she click add-to-cart for product 'Korean Dictionary'
    When she add product to cart without choosing option
    Then she should see successful message shown
    Then she should see two optional actions shown
    When she choose view cart & checkout button
    Then she should see the item number becomes 1 in cart icon 
    Then she should see the following product in cart
    | merchant              | name              | quantity | unitprice| totalprice | brandname |
    | Test Vicki's Merchant | Korean Dictionary | 1        | 50.00    | 50.00      | 1.7       |    
  
  @wishlist
  Scenario: guest can add color options with no-size product into cart in wishlist
    Given she goes to PDP with this link 'p/annasui-cup:-testing-only-11.04.2022/5467-TestVJMerchant1'
    When she click wishlist icon in PDP for product with name 'Annasui Cup: Testing Only 11.04.2022'
    Then she should see the number in wishlist icon is 1
    When she click add-to-cart for product 'Annasui Cup: Testing Only 11.04.2022'
    When she add product to cart with choosing color option 'RoseGold'
    Then she should see successful message shown
    Then she should see two optional actions shown
    When she choose view cart & checkout button
    Then she should see the item number becomes 1 in cart icon
    Then she should see the following product in cart

    | merchant              | name                                 | quantity | unitprice| totalprice | brandname | color    | 
    | Test Vicki's Merchant | Annasui Cup: Testing Only 11.04.2022 | 1        | 15.00    | 15.00      | ANNA SUI  | RoseGold | 

  @wishlist
  Scenario: guest can add color/size options product into cart in wishlist
    Given she goes to PDP with this link 'p/mens-black-jacket-test/5467-TMMerchantOne270923'
    When she click wishlist icon in PDP for product with name 'Mens black Jacket test'
    Then she should see the number in wishlist icon is 1
    And she click add-to-cart for product 'Mens black Jacket test'
    And she add product to cart with choosing color option 'RED' and size option 'L'
    Then she should see successful message shown
    And she should see two optional actions shown
    When she choose view cart & checkout button
    And she should see the item number becomes 1 in cart icon
    And she should see the following product in cart

    | merchant              | name                   | quantity | unitprice | totalprice | brandname | color | size | 
    | Test Vicki's Merchant | Mens black Jacket test | 1        | 150.00    | 150.00     | 1.7       | RED   | L    |