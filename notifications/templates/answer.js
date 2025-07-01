exports.answerTemplate=(data)=>{
    return {
        notification: {
            title: `${data.senderName} answered on your question  `,
            body:data.body
                
        },
        data:{
            type:"answer"
        }
    };
}