// Import Express
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const request  = require('http').request();
const { response } = require('express');
const generateRandomChars = require('./utils/utils');
const PORT = process.env.PORT || 4000;
const path = require('path');

// Express server and GraphQL endpoint
const app = express();

// Data state
const urlDatas = [
  {
    id: 1,
    fullUrlString: "",
    shortUrlString: ""
  }
]

const shortenUrlFunc = ({ url }) => {
  try {
    urlDatas.map((urlData) => {
      if (urlData.fullUrlString !== url) {
      
        const locationString = generateRandomChars(6);

        // set shortUrlString Header
        response.writeHead(301, { 'Content-Location': url })
        // response.redirect(url)

        app.get(`/${locationString}`, (_, res) => {
          res.redirect(url);
        })

        // GraphQl data
        urlData.fullUrlString = url;
        urlData.shortUrlString = process.env.NODE_ENV != 'production' ? 
        `${request.protocol}//${request.host}:${PORT}/${locationString}` 
          : `${request.protocol}//${request.host}/${locationString}`;
    
        return urlData;
      }
    })
  
    // Return URL data
    return urlDatas.find(urlData => urlData.id == 1);
  } catch (err) {
    console.log(err)
  }

  return url;
}

// Resolvers
const root = {
  shortenURL: shortenUrlFunc
}


app.use("/graphiql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));



// Start the server
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}/graphiql`))

