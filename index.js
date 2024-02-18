const express = require('express');
// const { Client } = require('cassandra-driver');
const cors = require('cors');
// const multer = require('multer');
const bodyParser = require('body-parser');
const axios = require('axios');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const axiosRetry = require('axios-retry');
const https = require('https'); 
// const { ApolloServer, gql } = require('apollo-server');

const app = express();
const port = 300;

app.use(cors());
app.use(bodyParser.json({limit: '1000mb'}));

// const neo4j = require("neo4j-driver");
const router = express.Router();
//Document Datastax
app.use('/api/products', async(req, res) => {
    try {
      const response = await axios.get('https://5473a948-897c-446a-a79c-d9f57e8071e0-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/products?page-size=3', {
        headers: {
          'X-Cassandra-Token': 'AstraCS:TjkSeDazlJEbcCMHPUXkKwPn:6454b234535e9d33153d4f70b86f5c5a8ff19331645ecf3453afd0eacdaea026'
        }
      });
      res.json(response.data);
    }catch(error) {
      console.error(error);
    }
  });

  app.use('/api/add-products', async(req, res) => {
    const requestData = req.body;
    try {
      const response = await axios.post('https://5473a948-897c-446a-a79c-d9f57e8071e0-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/products', 
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Cassandra-Token': 'AstraCS:TjkSeDazlJEbcCMHPUXkKwPn:6454b234535e9d33153d4f70b86f5c5a8ff19331645ecf3453afd0eacdaea026'
        }
      });
      res.json(response.data);
    }catch(error) {
      console.error(error);
    }
  });

  app.delete('/api/del-products', async (req, res) => {
    // const productId = req.params.productId;

    try {
        const response = await axios.delete(`https://5473a948-897c-446a-a79c-d9f57e8071e0-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/products`, {
            headers: {
                'X-Cassandra-Token': 'AstraCS:TjkSeDazlJEbcCMHPUXkKwPn:6454b234535e9d33153d4f70b86f5c5a8ff19331645ecf3453afd0eacdaea026'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  