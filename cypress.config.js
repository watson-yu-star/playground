const { defineConfig } = require('cypress');
const createBundler =require("@bahmutov/cypress-esbuild-preprocessor");
//const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
//const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;


module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  video:true,
  chromeWebSecurity: false,

  env:{
    username:"TmAutoTest1@gmail.com",
    password:"Welcome2019",
    omitFiltered: true,
    filterSpecs: true
  },
  /*
  reporter: "mochawesome",
  reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: false,
      json: true
    },
  */
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
      configFile: 'cypress/reporter-config.json'
    },
  
  
   
  e2e: {
    
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins:[createEsbuildPlugin(config)],
      });
      
      on("file:preprocessor",bundler);
      await addCucumberPreprocessorPlugin(on,config);

      return config;

    },
    
    baseUrl:'https://test.themarket.co.nz/',
    specPattern:"cypress/e2e/features/*.feature",
 

    //baseUrl:'https://example.cypress.io',
    //specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    //excludeSpecPattern:['**/1-getting-started/*','**/2-advanced-examples/*'],
    
  },
});
