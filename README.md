### HTTP2 与 HTTP1.1 
1. http 和 http2 图片加载速度对比
2. 请求页面，推送页面相关资源

打开chrome开发者工具，查看资源获取状况

### 创建Https 私钥和证书
```bash
＃生成私钥key文件
openssl genrsa 1024 > private.pem

＃通过私钥文件生成CSR证书签名
openssl req -new -key private.pem -out csr.pem

＃通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out server.crt

# private.pem: 私钥
# csr.pem: CSR证书签名
# server.crt: 证书文件
```

### 安装：
```bash

npm install

npm start
```

### License

The MIT License (MIT)
