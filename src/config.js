var config = {
	hostname: 'localhost',
	port: 1900,
	protocol: 'http',
	username: 'username',
	password: 'password',
	uploadPath: '/articles/images/',//This is the path that upload file to webdav server
	accessUrl: 'http://localhosst/articles/images/',//This is the url prefix that access webdav server uploaded file
};
//The upload url would be like 'http://localhosst:1900/articles/images/xxx.png'
//The access url would be like 'http://localhosst/articles/images/xxx.png'

//If your upload path and access path is same, use this code to mixing url path
config.accessUrl = config.protocol + '://' + config.hostname + ':' + config.port + config.uploadPath;