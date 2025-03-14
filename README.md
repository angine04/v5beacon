# v5Beacon

v5Beacon 是 v5++ 团队的服务门户，集成了团队所有服务的访问入口。该项目使用 Next.js 构建，并通过 Authentik OIDC 提供身份验证。

## 功能特性

- 集中访问团队所有服务
- 通过 Authentik 进行单点登录 (SSO)
- 响应式设计，适配各种设备
- 简洁直观的用户界面

## 开发环境设置

### 前提条件

- Node.js 18.0.0 或更高版本
- Yarn 或 npm
- 已配置的 Authentik 实例

### 安装步骤

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/v5beacon.git
cd v5beacon
```

2. 安装依赖：

```bash
yarn install
# 或
npm install
```

3. 配置环境变量：

复制 `.env.local.example` 文件为 `.env.local` 并填写必要的环境变量：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填写以下信息：

```bash
AUTHENTIK_ISSUER=https://authentik.yourdomain.com
AUTHENTIK_CLIENT_ID=your-client-id
AUTHENTIK_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

4. 启动开发服务器：

```bash
yarn dev
# 或
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## Authentik 配置

要在 Authentik 中设置 OIDC 提供者，请按照以下步骤操作：

1. 登录到您的 Authentik 管理界面
2. 导航到 "Applications" > "Providers"
3. 点击 "Create" 并选择 "OAuth2/OpenID Provider"
4. 填写以下信息：
   - 名称：v5Beacon
   - 客户端类型：Confidential
   - 重定向 URIs：`http://localhost:3000/api/auth/callback/authentik`（生产环境使用实际域名）
   - 作用域：openid email profile
5. 保存提供者配置
6. 创建一个新的应用程序，链接到此提供者
7. 记下生成的客户端 ID 和客户端密钥，并将它们添加到 `.env.local` 文件中

## 部署

### 生产环境部署

1. 构建应用：

```bash
yarn build
# 或
npm run build
```

2. 启动生产服务器：

```bash
yarn start
# 或
npm start
```

### 使用 Docker 部署

1. 构建 Docker 镜像：

```bash
docker build -t v5beacon .
```

2. 运行容器：

```bash
docker run -p 3000:3000 -e AUTHENTIK_ISSUER=https://authentik.yourdomain.com -e AUTHENTIK_CLIENT_ID=your-client-id -e AUTHENTIK_CLIENT_SECRET=your-client-secret -e NEXTAUTH_URL=https://beacon.yourdomain.com -e NEXTAUTH_SECRET=your-secret v5beacon
```

## 自定义服务

要添加或修改服务卡片，请编辑 `src/app/page.tsx` 文件中的 `services` 数组。

## 贡献

欢迎提交 Pull Requests 和 Issues。

## 许可证

[MIT](LICENSE)
