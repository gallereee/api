export default () => {
	const config = {
		globalPrefix: "v1",
		botAccessToken: process.env.BOT_ACCESS_TOKEN,
		telegramBaseUrl: "https://api.telegram.org/",
		telegramBotBaseUrl: "",
		telegramBotFilesBaseUrl: "",
		port: parseInt(process.env.PORT, 10),
	};

	config.telegramBotBaseUrl = `${config.telegramBaseUrl}bot${config.botAccessToken}/`;
	config.telegramBotFilesBaseUrl = `${config.telegramBaseUrl}file/bot${config.botAccessToken}/`;

	return config;
};
