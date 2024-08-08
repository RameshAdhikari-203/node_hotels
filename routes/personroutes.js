const express = require('express');
const router = express.Router();
const person = require('./../modls/person');


//post route to add a person

router.post('/',async (req,res) =>{
    try{
      const data = req.body
  
      const newPerson = new person(data);
  
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  // get method to get the person 

router.get('/',async (req, res) =>{
    try{
      const data = await person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })

  //worktype url 

router.get('/:workType', async(req ,res)=>{
    try{
      const workType = req.params.workType;
      if( workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await person.find({work: workType});
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
    const personID = req.params.id;//estract the id from the ural paremeter
    const updatedPersonData = req.body;//updated data for the person

    const response = await person.findByIdAndUpdate(personID,updatedPersonData,{
      new:true, //return the update document
      runValidators:true //run mongoose validation
    })
    if(!response){
      return res.status(404).json({error:'person not found'});
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
    const personID = req.params.id;//estract the id from the ural paremeter
    //assuming you have a person model
    const response = await person.findByIdAndDelete(personID);

    if(!response){
      return res.status(404).json({error:'person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message: 'person deleted successfully'});

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})
  module.exports = router;