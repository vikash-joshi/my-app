const bcrypt = require('bcrypt');

const GeneratePassword = async function GeneratePassword(PassObject){
    try{
    let Salt=await bcrypt.genSalt(5);
    let HashPassword=await bcrypt.hash(PassObject.Password,Salt);
    PassObject={ Password:HashPassword,Message:'1:' }
    }
    catch(ex){
        PassObject={ Password:'',Message:'0:'+ex.message }
    }
    return PassObject

}


const RandomPassword=async function RandomPassword(length){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = {GeneratePassword ,RandomPassword };
