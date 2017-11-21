const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const mqpacker = require('css-mqpacker');

// input
const INDEX_HBS = "entry/entry_dev.hbs";
const ENTRY = "entry/loader_dev.js";

// output
const DIST_DIR = "artifact";
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
							options: { sourceMap: true }
						}, {
							loader: 'css-loader',
							options: {
								localIdentName: '[sha512:hash:base32]-[name]-[local]',
								modules: true,
								sourceMap: true
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
								sourceMap: true
							},
							// options: { sourceMap: true }
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
					// ])
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
				{
					enforce: "pre",
					test: /\.js$/,
					loader: "source-map-loader"
				},
			],
		},

		// postcss: [autoprefixer],
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
			})
		],
		externals: {
			"react": "React",
			"react-dom": "ReactDOM"
		},
		devServer: {
			contentBase: __dirname,
			// contentBase: path.resolve(__dirname, DIST_DIR),
			port: 3000,
		},
	},
];
