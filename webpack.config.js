const path = require('path');

module.exports = {
	entry: './src/uploader.js',
	output: {
		filename: 'webdav-uploader.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization:{
		// minimize: false, // <---- disable uglify.
	}
};