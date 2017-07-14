var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
	// entry打包文件的三个方式
	//  entry:'./src/script/main.js', //string 打包一个文件
	// entry: ['./src/script/main.js','./src/script/a.js'], //数组 打包互相依赖的平级文件
	entry:{
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/b.js',
		c:'./src/script/c.js'
	},//对象 常应用于多页面应用程序 打包多个文件的入口
		//  输出的文件
	 output:{
		 path: __dirname+'/dist',  //输出的文件地址
		  //  filename: '[bundle].js'
			// 打包 1个或者多个平行文件的时候
		 //  filename: '[name].js'
		//  对象的情况下 各个都打包到里面
		//  filename: '[name]-[hash].js'
		//  每次打包的hash值都一样 不管有没有更改
 	 	 filename: 'js/[name]-[chunkhash].js',
		// 更改的话打包的hash值是不一样的
		publicPath:'http://cdn.com.cn/' //传上线的时候的网络地址前缀
	},
	plugins:[
		// 要多生成几个页面就写几个 new htmlWebpackPlugin
		new htmlWebpackPlugin({
			filename:'a.html',  //写对应生成的文件名
			template:'index.html',
			inject:false,
			title:'this is a.html',
			// chunks:['main','a']  //会引入main.js  a.js
			excludeChunks:['b','c'] //不会引入b.js c.js
			//模板里的循环会循环出来所有的 这边做控制 最后显示到对应的页面的对应js
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			template:'index.html',
			inject:false,
			title:'this is b.html',
			// chunks:['b']  //会引入b.js
			excludeChunks:['a','c'] //不会引入a.js c.js
		}),
		new htmlWebpackPlugin({
			filename:'c.html',
			template:'index.html',
			inject:false,
			title:'this is c.html',
			// chunks:['c']  //会引入c.js
			excludeChunks:['a','b'] //不会引入a.js b.js
		}),
	]

}
