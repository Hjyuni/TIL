const express = require('express');
const app = express();
const elasticsearch = require('@elastic/elasticsearch');


const PORT = 3000;

// elasticsearch
const client = new elasticsearch.Client({
  node: ['Your Elastic IP'],
  auth: {
    username: '',
    password: ''
  }
})

app.get('/search', (req,res)=>{
  async function run() {
    const result=await client.search({
      index: 'fish',
      query: {
        // localhost:3000/search?q=
        match: {"어종": req.query['q']}
    }
  })
  res.send(result.hits.hits)
  console.log(result.hits.hits)
}
run().catch(console.log)
})

app.listen(PORT, function() {
    console.log('Your port is:',PORT);
});