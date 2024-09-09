# SharpDLLProxy-GUI

## English
This project is based on <https://github.com/Flangvik/SharpDllProxy>,
Modifications were made to the source program, and add a GUI to make it deployable as a web page.



Supports Windows, Linux, etc.

### Frame
Web: Vite+React+ts+express

Core: .netcore

### Environment Configuration
NodeJs 18.x or later

netcore 3.0(3.1) -> <https://dotnet.microsoft.com/zh-cn/download/dotnet/3.1>



### Installation

Before you start it,you should install the <code>netcoreSDK 3.1</code>,<code>NodeJS</code>.
Then you need build the main program and the front-end part.
After that,you need edit the <code>default.json</code>.
And finally,you can start the server by <code>node Server/app.js</code>.


```sh
cd SharpDllProxy;dotnet build
```

```sh
cd Front;npm install;vite build
```

```sh
cd Server;npm install;node app.js
```

### Service
If you want to deploy it as a service, you can use pm2 to manage it.
```sh
npm install pm2 -g && pm2 install pm2-logrotate
pm2 start Server/app.js --name SharpDLLProxy-GUI
```
The default host is http:127.0.0.1:4156


### Thanks
- <https://github.com/Flangvik/SharpDllProxy>
- <https://github.com/vitejs/vite>
- <https://github.com/facebook/react>
- <https://github.com/expressjs/express>

## 简体中文
本项目基于<https://github.com/Flangvik/SharpDllProxy实现>。
在源程序的基础上进行修补，同时添加了GUI以使其能以网页形式部署。

支持Windows,Linux等系统。

### 框架
Web: Vite+React+ts+express

Core: .netcore

### 环境配置
NodeJs 18.x or later

netcore 3.0(3.1) -> <https://dotnet.microsoft.com/zh-cn/download/dotnet/3.1>

### 安装教程

在你开始之前，你需要先确保你已经安装了<code>netcoreSDK 3.1</code>及<code>NodeJS</code>。
之后，你需要编译源程序及前后端部分。
接着再编辑<code>default.json</code>文件。
最后通过执行<code>node Server/app.js</code>来启动服务。
```sh
cd SharpDllProxy;dotnet build
```

```sh
cd Front;npm install;vite build
```

```sh
cd Server;npm install;node app.js
```

### 服务
如果你想以服务的形式部署，那么你可以使用pm2来管理此项目。
```sh
npm install pm2 -g && pm2 install pm2-logrotate
pm2 start Server/app.js --name SharpDLLProxy-GUI
```
默认主机路径为http:127.0.0.1:4156

### 感谢
- <https://github.com/Flangvik/SharpDllProxy>
- <https://github.com/vitejs/vite>
- <https://github.com/facebook/react>
- <https://github.com/expressjs/express>
