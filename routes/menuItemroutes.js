const express = require('express');
const router = express.Router();
const MenuItem = require('../modls/MenuItem');


//post route to add a menuitem

router.post('/',async (req,res) =>{
    try{
      const data = req.body
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
})


//get method to get the menuitem data 

router.get('/',async (req, res) =>{
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  //test url 
  
  router.get('/:testType', async(req ,res)=>{
    try{
      const testType = req.params.testType;
      if( testType == 'sweet' || testType == 'spicy' || testType == 'sour'){
        const response = await MenuItem.find({test: testType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'invalid work type'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

    
//update data

router.put('/:id',async (req, res)=>{
  try{
    const menuID = req.params.id;//estract the id from the ural paremeter
    const updatedmenuData = req.body;//updated data for the person

    const response = await MenuItem.findByIdAndUpdate(menuID, updatedmenuData,{
      new:true, //return the update document
      runValidators:true //run mongoose validation
    })
    if(!response){
      return res.status(404).json({error:'menu item not found'});
    }
    console.log('data updated');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})
//delete data 

router.delete('/:id',async (req,res)=>{
  try{
    const menuID = req.params.id;//estract the id from the ural paremeter
    //assuming you have a person model
    const response = await MenuItem.findByIdAndDelete(menuID);

    if(!response){
      return res.status(404).json({error:'menu item not found'});
    }
    console.log('data deleted');
    res.status(200).json({message: 'menu item  deleted successfully'});

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})
  

  module.exports = router;