const Clarifai=require('clarifai');
const app = new Clarifai.App({
    apiKey: 'e57fa4d5c3bb4a2597c888f2844d8bef'
   });
   const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with api'))
   }
   
const handleImage=(req,res,db)=>{
    const{id}=req.body;
    // let found=false;
    // database.users.forEach(users=>{
    //     if(users.id===id){
    //         found=true;
    //         users.entries++;
    //         return res.json(users.entries);
    //     }
    // })
    // if(!found)
    // {
    //     res.status(404).json('no such user');
    // }
    db('users').where('id','=',id).increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    }).catch(err=>res.status(400).json('unabe to get entries'))
}
module.exports={
    handleImage:handleImage,
    handleApiCall
}