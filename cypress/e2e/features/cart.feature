Feature: Cart
  Once the product is added to cart, user should see the product in cart page and order summary should have correct information.
  Background:
     Given A user add the below products to Cart
    | name                               | storename      |size     |  link                   |
    | Connor Dean Shoe Tan 12            |   Connor       |  12     |  /nz/p/connor-dean-shoe-tan-6/4345-C22FWD101?siq=79a51828-860c-4c4b-9f98-bdf2f17a0886&sii=4345C22FWD101 |
    | Lacoste Men's Tennis Sport Short   |   Lacoste      |  XL     |  /nz/p/lacoste-mens-tennis-sport-short/4853-GH7965258?siq=8ad1bfa9-8b25-49ab-9670-b83c53d13d88&sii=4853GH7965258 |
  Scenario: Add product into carts without login
   
    When A user click the Cart from the header 
    Then He should see the products on the cart page 
    When A user check the summary of the cart
    Then He should see the Order Summary correctly
  
  Scenario: Change the amount of products
    
    When A user change the Quantity of first product to "2" from the cart page
    Then He should see the number become "3" on the top of cart

  Scenario: Remove the products from cart
  
    When A user click remove button of the product
    Then The product should be removed

 
