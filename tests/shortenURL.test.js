// const axios = require('axios');
const generateRandomChars = require('../src/utils/utils');


describe("shorten Url resolver", () => {
  test("gets short url",  () => {
    const response =  axios.post('http://localhost:4000/graphiql', {
      data: {
        query: `
          query {
            shortenURL(url: "https://github.com") {
              shortUrlString
              fullUrlString
            }
          }    
        `
      }
    });

    console.log(response);
    const { data } = response;
    // console.log(data)
    expect(data).toMatch({
      data: {
        shortenURL: {
          shortUrlString: `http://localhost:4000/${generateRandomChars(6)}`,
          fullUrlString: "https://github.com"
        }
      }
    });
  });
});

