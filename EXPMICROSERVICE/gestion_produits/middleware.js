const axios = require('axios'); 
const isLogged = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
        const response = await axios.post('http://auth:4002/home', {}, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            req.user = response.data.user
            next();
        } else {
       
            return res.status(401).json({ message: 'Invalid token ' });
        }
    
};

module.exports = isLogged;
