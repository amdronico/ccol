const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.njk');
});

router.get('/dashboard',(req,res)=>{
  res.render('dashboard.njk');
})

module.exports = router;