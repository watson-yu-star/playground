Feature: Product detail page
   User can increase Product Quantity and reduce Product Quantity
   Background:
    Given User land on the below product detail page
      | name             |color      |size    |  link                   |
      | Thats Gold Tee   | Black     | XL     |  /nz/p/thats-gold-tee/5110-8095166731?siq=70dea7c6-ff5c-420a-9082-f8eea74c713f&sii=51108095166731&mode=io&s=Thats+Gold+Tee|
   
   Scenario: Add product Quantity
      
      When User click the Plus button
      Then The Quantity should be increased 1
      

    Scenario: Reduce product Quantity
      
      When User click the Plus button
      When User clicks the Minus button
      Then The Quantity should be decreased 1
    
    Scenario: Set the product Quantity
    
      When User inputs "3" to prodct quantity editbox
      Then User should see the "3" inside the editbox

    Scenario: Change shipping location
    
      When User clicks the dropdown list of location and click "Christchurch"
      Then The shipping location should be changed to "Christchurch"
    
    Scenario: Check the coupon list
      When User clicks the coupon list 
      Then The coupon list modal should show up
      When User clicks the close button
      Then The modal should be closed