const EmailLog  = require("../models/EmailLog");
const SaveEmailLog=async(MailModel)=>{
    try
    {
        let response={};
        const _emailObject = new EmailLog(MailModel);
         let res=await _emailObject.save().then((res)=>{
            console.log('success',res);
            response= { message: "1:Mail Added To queue" }; 
        },(err) => {
            console.log(err);
            response= { message: "0:"+err.message }; 
        }).catch((ex)=> 
        {console.log(ex);
            response=  { message: "0:"+ex.message }; 
        });

        console.log('response',response);
    
        return response;

    }
    catch(ex)
    {
        return {
            message: "0:"+ex.message
          }; 
    }

}

const GetEmailLogs=async()=>
{
    let EmailList=await EmailLog.aggregate([
        {
          $lookup: {
            from: 'users', // The collection name in MongoDB
            localField: 'UserId', // The field in the EmailLog collection
            foreignField: '_id', // The field in the User collection
            as: 'userDetails', // The alias for the joined documents
          },
        },
        {
            $unwind: {
                path: '$userDetails', // Flatten the array
                preserveNullAndEmptyArrays: false, // Only include documents where userDetails exists
              }
        },
        {
          $project: {
            _id: 1,
            Subject: 1,
            FromEmail: 1,
            ToEmail: 1,
            Body: 1,
            createdAt: 1,
            SentAt: 1,
            UserId: 1,
            'userDetails.name': 1, // Include user name
            'userDetails.email': 1, // Include user email
          },
        },
      ]);
    /*let EmailList=await EmailLog.aggregate([
        {
            $lookup:{
                from:"users",
                localField:"UserId",
                foreignField:"_id",
                as:"userslist"               
        },
    },
    {
        $unwind:"$userslist"
    }
    ])*/
//    EmailList.forEach(e=>{e.name=e?.userslist?.name});
    console.log('email list',EmailList)
    EmailList=EmailList.map(x=>({name:x.userDetails.name,FromEmail:x.FromEmail,ToEmail:x.ToEmail,Subject:x.Subject,Body:x.Body,createdAt:x.createdAt}))
    return EmailList;
}

module.exports= { SaveEmailLog,GetEmailLogs }
