const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	entry: "./source/main.tsx",
	//watch: true,
	//watchOptions: {
	//	aggregateTimeout: 50,
	//	poll: 50
	//},
	output: {
		path: path.join(__dirname, "./release/esm"),
		//publicPath: "/",
		filename: "index.js"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.([cm]?ts|tsx)$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							//transpileOnly: true
						}
					}
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ "style-loader", "css-loader", "sass-loader" ]
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js', '.scss' ],
		alias: {
			"@assets": path.resolve( __dirname, "assets" ),
			"@styles": path.resolve( __dirname, "assets", "styles" ),
			"@components": path.resolve( __dirname, "source", "components" ),
			"@modules": path.resolve( __dirname, "source", "modules" ),
			"@utility": path.resolve( __dirname, "source", "utility" )
		}
	},
	devServer: {
		hot: false,
		liveReload: false,
		port: 8090,
		devMiddleware: {
			writeToDisk: true,
		},
		static: {
			directory: path.resolve(__dirname, "")
		},
		historyApiFallback: {
			index: 'index.html'
		}
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	plugins: [
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(require("./package.json").version),
		}),
	]
};
