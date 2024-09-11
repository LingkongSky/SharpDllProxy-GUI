# SharpDLLProxy-GUI V1.0.0
<p align="center">
    <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
    <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
    <a href="https://github.com/LingkongSky/SharpDllProxy-GUI/blob/master/LICENSE"><img src="https://img.shields.io/github/license/dotnetcore/WTM.svg" alt="GitHub license"></a>
</p>


 **- [English](#English)**
 - [Frame](###Frame)
 - [Environment Configuration](###Environment-Configuration)
 - [Installation](#Installation)
 - [Config Files](#Config-Files)
 - [Service](#Service)
 - [License](#License)

 **- [简体中文](#简体中文)**
 - [框架](#框架)
 - [环境配置](#环境配置)
 - [安装教程](#安装教程)
 - [配置文件](#配置文件)
 - [服务](#服务)
 - [协议](#协议)
 - [感谢](#感谢)


## English
![Imgur](https://i.imgur.com/eka7PJi.jpg)

This project is based on <https://github.com/Flangvik/SharpDllProxy>,
Modifications were made to the source program, and add a GUI to make it deployable as a web page.

If you don't know how to install dotnet on linux, please go to <https://learn.microsoft.com/en-us/dotnet/core/install/linux>

**Supports Windows, Linux, etc.**

### Frame
Web: <code>Vite+React+ts+express</code>

Core: <code>.netcore3.1</code>

### Environment Configuration
<code>NodeJs 18.x or later</code>

<code>netcore3.1</code> -> <https://dotnet.microsoft.com/en-us/download/dotnet/3.1>

### Start quickly

**Release**
- downlaod the release and install the environment.
- exec <code>node Server/app.js</code>

**Docker**
- docker pull kazeline/sharpdllproxy-gui:v1
- docker run -p 4156:4156 --name SharpDllProxy-GUI azeline/sharpdllproxy-gui:v1


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
### Config Files
Edit <code>default.json</code> if you want.
You need restart the service to make the modifys take effect.
```json
{
    "host": "0.0.0.0",
    "port": "4156",
    "input_path": "../files/input",
    "output_path": "../files/output",
    "sharp_dll_proxy": "../SharpDllProxy/bin/Debug/netcoreapp3.1/SharpDllProxy",
    "max_file_size": "209715200"
}
```

### Service
If you want to deploy it as a service, you can use pm2 to manage it.
```sh
npm install pm2 -g && pm2 install pm2-logrotate
pm2 start Server/app.js --name SharpDLLProxy-GUI
```
**The default host is <http://127.0.0.1:4156>**

### License
SharpDllProxy-GUI is released under the [MIT](LICENSE).

### Thanks
- <https://github.com/Flangvik/SharpDllProxy>
- <https://github.com/vitejs/vite>
- <https://github.com/facebook/react>
- <https://github.com/expressjs/express>

## 简体中文
![Imgur](https://i.imgur.com/Xk8RqJq.jpg)

本项目基于<https://github.com/Flangvik/SharpDllProxy>实现。
在源程序的基础上进行修补，同时添加了GUI以使其能以网页形式部署。

如果你不清楚如何在linux上安装dotnet，请前往<https://learn.microsoft.com/zh-cn/dotnet/core/install/linux>

**支持Windows,Linux等系统**

### 框架
Web: <code>Vite+React+ts+express</code>

Core: <code>.netcore3.1</code>

### 环境配置
<code>NodeJs 18.x or later</code>

<code>netcore3.1</code> -> <https://dotnet.microsoft.com/zh-cn/download/dotnet/3.1>

### 快速开始

**Release**
- 下载Release包以及必需的环境依赖。
- 运行<code>node Server/app.js</code>

**Docker**
- docker pull kazeline/sharpdllproxy-gui:v1
- docker run -p 4156:4156 --name SharpDllProxy-GUI azeline/sharpdllproxy-gui:v1


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
### 配置文件
如果有需要，请编辑<code>default.json</code>文件。
在修改之后重启服务使修改生效。
```json
{
    "host": "0.0.0.0",
    "port": "4156",
    "input_path": "../files/input",
    "output_path": "../files/output",
    "sharp_dll_proxy": "../SharpDllProxy/bin/Debug/netcoreapp3.1/SharpDllProxy",
    "max_file_size": "209715200"
}
```
### 服务
如果你想以服务的形式部署，那么你可以使用pm2来管理此项目。
```sh
npm install pm2 -g && pm2 install pm2-logrotate
pm2 start Server/app.js --name SharpDLLProxy-GUI
```
**默认主机路径为<http://127.0.0.1:4156>**

### 协议
SharpDllProxy-GUI遵守[MIT](LICENSE)协议.

### 感谢
- <https://github.com/Flangvik/SharpDllProxy>
- <https://github.com/vitejs/vite>
- <https://github.com/facebook/react>
- <https://github.com/expressjs/express>
