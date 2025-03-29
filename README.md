# 淘宝优惠券推广应用

这是一个淘宝优惠券推广应用，原本是基于Cloudflare Worker开发的，现已修改为可在任何JavaScript环境下运行的版本。

## 功能特点

- 通过淘宝客API搜索商品
- 展示热门分类商品
- 提供商品优惠券信息
- 美观的前端界面

## 环境要求

- Node.js 14.0 或更高版本

## 安装步骤

1. 克隆仓库或下载源代码

2. 安装依赖
```bash
npm install
```

3. 配置环境变量（可选）
可以通过环境变量配置以下参数，也可以使用默认值：
- `APPKEY`: 淘宝联盟App Key
- `APPSECRET`: 淘宝联盟App Secret
- `API_URL`: 淘宝开放平台API地址
- `ADZONE_ID`: 推广位ID
- `PORT`: 服务器端口，默认3000

可以创建一个`.env`文件，或直接设置环境变量：
```bash
export APPKEY=your_appkey
export APPSECRET=your_appsecret
export ADZONE_ID=your_adzone_id
export PORT=3000
```

4. 启动应用
```bash
npm start
```

开发模式（自动重启）:
```bash
npm run dev
```

5. 访问应用
在浏览器中打开 `http://localhost:3000`

## API接口

- `/`: 首页，显示前端HTML页面
- `/popular`: 获取热门商品
- `/search?keyword=xxx&page=1`: 搜索商品，需提供关键词和页码
- `/categories`: 获取分类列表

## 技术栈

- Node.js
- 原生HTTP服务器
- 淘宝开放平台API
- HTML/CSS/JavaScript前端

## 文件结构

- `index.js`: 主要应用代码，HTTP服务器和API逻辑
- `topclient.js`: 淘宝开放平台API客户端
- `frontend.js`: 前端HTML内容
- `package.json`: 项目依赖和脚本

## 注意事项

- 本应用需要有效的淘宝联盟账号和相关API权限
- 默认使用的API Key和Secret可能已过期，请替换为自己的有效凭证
- 对于生产环境，请确保适当处理安全问题，如API密钥保护、请求限制等 