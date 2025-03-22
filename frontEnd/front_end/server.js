const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');


app.use('/produits', createProxyMiddleware({
    target: 'http://products:4000', 
    changeOrigin: true,
   
}));

app.use('/commande', createProxyMiddleware({
  target: 'http://commands:4001', 
  changeOrigin: true,
 
}));

app.use('/auth', createProxyMiddleware({
    target: 'http://auth:4002', 
    changeOrigin: true,
    
}));
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
