exports.chatTemplate = (data) => {
	return {
		notification: {
			title: `You have a new message from ${data.senderName} `,
			body:
				data.type == "text"
					? data.content
					: data.type == "voice"
					? "This message contains a voice note"
					: "This message contains files",
		},
        data:{
            type:"chat"
        }
	};
};
