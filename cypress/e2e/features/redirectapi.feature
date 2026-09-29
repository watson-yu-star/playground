@service
Feature: Redirect API

Scenario: User read the response
   When  The user access the redirect API
   Then  He should see the id and URL of Category and Brand from response
   