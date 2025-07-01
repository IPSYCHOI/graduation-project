exports.announTemplate = (data) => {
	return {
		notification: {
			title: `New announcement added by ${data.senderName} `,
			body:data.body
		},
        data:{
            type:"announ"
        }
	};
};
