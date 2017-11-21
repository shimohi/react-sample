const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const mqpacker = require('css-mqpacker');

// input
const INDEX_HBS = "entry/entry_prod.hbs";
const ENTRY = "entry/loader_prod.js";

// output
const DIST_DIR = "dist";
const TITLE = "React sample";


module.exports = [
	{
		context: __dirname,
		entry: `./${ENTRY}`,
		output: {
			filename: `./${DIST_DIR}/app.js`
		},
		resolve: {
			extensions: ['.scss' , '.css' , ".ts" , ".tsx" , '.js' , '.json'],
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /(\.scss|\.css)$/,
					use: [
						{
							loader: 'style-loader',
							options: { sourceMap: false }
						}, {
							loader: 'css-loader',
							options: {
								localIdentName: '[sha512:hash:base32]-[name]-[local]',
								modules: true,
								sourceMap: false
							}
						}, {
							loader: 'postcss-loader',
							options: {
								postcss: [
									precss(),
									autoprefixer({
										browsers: [
											'last 3 version',
											'ie >= 10',
										],
									}),
									mqpacker(),
								],
								sourceMap: false
							},
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: false
							}
						}
					]
				},

				// Image
				{
					test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/, loader: 'url-loader?limit=8192'
				},

				// TypeScript
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					exclude: /(node_modules)/
				},

				// Html
				{
					test: /\.hbs$/,
					loader: "handlebars-loader"
				},
			],
		},

		plugins: [
			// mainCSS,
			new HtmlWebpackPlugin({
				title: TITLE,
				template: INDEX_HBS,
				filename: `./${DIST_DIR}/index.html`,
				xhtml: true,
				hash: true,
				cache: true,
				cacheBreak: new Date().getTime()
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify("production"),
				},
			}),
			// new webpack.optimize.UglifyJsPlugin({
			// 	compress: {
			// 		warnings: false,
			// 	},
			// }),
			// new webpack.optimize.OccurrenceOrderPlugin(),
		],
	},
];
