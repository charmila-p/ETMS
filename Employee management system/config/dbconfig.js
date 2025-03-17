const mongoose = require('mongoose');


const dbConnect = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://ParvathareddyCharmila:Charu275@training-cluster.b0lkz.mongodb.net/jobportal_trainingdbetms?retryWrites=true&w=majority&appName=Training-Cluster')
        console.log('database connection established...') 
    }
    catch(err){
        console.log('Error in connection ' + err)
    }
    // finally{
    //     mongoose.connection.close();
    //to close connection
    // }
}

module.exports = dbConnect;
//mongoose help us to connect to connect programetically and let us perform db ops 