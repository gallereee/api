export default () => {
	return {
		globalPrefix: "v1",
		port: parseInt(process.env.API_PORT, 10),
		botAccessToken: process.env.BOT_ACCESS_TOKEN,
		jwtSecret: process.env.JWT_SECRET,
		IAMService: {
			host: process.env.IAM_HOST,
			port: parseInt(process.env.IAM_PORT, 10),
		},
		PMSService: {
			host: process.env.PMS_HOST,
			port: parseInt(process.env.PMS_PORT, 10),
		},
	};
};
