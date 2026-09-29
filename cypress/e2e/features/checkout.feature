Feature: checkout
 
  Background:

    Given The user has added below products into cart
    | name                            |size    |  link                   |
    | Ksubi - Homeslice Hoodie Shark  |  L     |  /nz/p/ksubi-homeslice-hoodie-shark/22-5000001772?siq=4a01acab-0814-49da-b684-1275f9ee9de9&sii=225000001772 |
    | Subtitled State Fleece Off White | XL-14 |  /nz/p/subtitled-state-fleece-off-white/22-1000082960?siq=4a01acab-0814-49da-b684-1275f9ee9de9&sii=221000082960 |
     
    When  The user clicks the checkbox for first product
    When  Click the Proceed to Checkout Button

  Scenario: Checkout products from cart
   
    Then The user should only see this product in the your order section
    Then Order summary only contains this product price

    Then The user removes all of product from the cart page
  
  Scenario: Check coupon & Promotion work well
    When The user select coupon "GCoupon1" for the product
    Then The user should see the Coupon Savings in Order summary
    Then The user should see the Promotion Savings in Order summary
  