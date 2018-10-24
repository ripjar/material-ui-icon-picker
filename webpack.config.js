const path = require("path");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = {
	entry: {
		"material-ui-icon-picker": path.resolve(
			__dirname,
			"src/MaterialUiIconPicker.js"
		)
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	plugins: [new webpack.NoEmitOnErrorsPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, "src")],
				exclude: [path.resolve(__dirname, "node_modules")],
				loader: "babel-loader"
			}
		]
	},
	resolve: {
		extensions: [".js"]
	},
	externals: /^(react|material-ui|prop-types)$/
};

if (process.env.NODE_ENV === "production") {
	config.plugins.push(new UglifyJsPlugin());
	config.output.filename = "[name].min.js";
} else {
	config.devtool = "source-map";
}

module.exports = config;
