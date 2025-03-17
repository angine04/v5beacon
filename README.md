<div align="center">
  <img src="https://raw.githubusercontent.com/angine04/v5beacon/refs/heads/main/public/service-logos/beacon.png" width="128" height="128" alt="v5Beacon Logo" style="display:inline; margin:12px;"> <h1>v5Beacon</h1>
</div>

v5Beacon 是 Team v5++ 的服务门户，集成了团队所有服务的访问入口。该项目使用 Next.js 构建，并通过 Authentik OIDC 提供身份验证。

<div align="center">
  <img src="https://github.com/user-attachments/assets/66020fb6-3bba-47ee-80ba-3b910972b70f"  alt="v5Beacon Demo" style="margin:12px;width:80%;">
</div>


## 功能特性

- 集中访问团队所有服务
- 通过 Authentik 进行单点登录 (SSO)
- 响应式设计，适配各种设备
- 简洁直观的用户界面
- 深色/浅色主题支持

## 技术栈

- **框架**: Next.js 15.2.2 (App Router)
- **开发工具**: Turbopack
- **UI 框架**: TailwindCSS
- **组件库**: Radix UI
- **认证**: NextAuth.js
- **语言**: TypeScript
- **部署**: Docker + PM2

## 项目结构

```
src/
├── app/                # Next.js App Router 目录
│   ├── api/           # API 路由
│   ├── auth/          # 认证相关页面
│   ├── components/    # 页面级组件
│   └── data/          # 数据配置
├── components/        # 全局共享组件
└── lib/              # 工具函数和配置

```

## 开发环境设置

### 前提条件

- Node.js >= 20.0.0
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
```

3. 配置环境变量：

复制 `example.env` 文件为 `.env.local` 并填写必要的环境变量：

```bash
cp example.env .env.local
```

需要配置的主要环境变量：

```bash
# Authentik 配置
AUTHENTIK_ISSUER=           # Authentik 实例地址
AUTHENTIK_CLIENT_ID=        # OIDC 客户端 ID
AUTHENTIK_CLIENT_SECRET=    # OIDC 客户端密钥

# NextAuth 配置
NEXTAUTH_URL=              # 应用 URL（开发环境为 http://localhost:3000）
NEXTAUTH_SECRET=           # NextAuth 密钥

# 应用配置
NEXT_PUBLIC_APP_NAME=      # 应用名称
NEXT_PUBLIC_APP_LOGO=      # 应用 Logo URL
```

4. 启动开发服务器：

```bash
yarn dev
```

应用将使用 Turbopack 启动，访问 [http://localhost:3000](http://localhost:3000) 查看。

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
7. 记下生成的客户端 ID 和客户端密钥，并将它们添加到环境变量中

## 部署

### 使用 Docker 部署

1. 构建 Docker 镜像：

```bash
docker build -t v5beacon .
```

2. 运行容器：

```bash
docker run -p 3000:3000 \
  -e AUTHENTIK_ISSUER=https://authentik.yourdomain.com \
  -e AUTHENTIK_CLIENT_ID=your-client-id \
  -e AUTHENTIK_CLIENT_SECRET=your-client-secret \
  -e NEXTAUTH_URL=https://beacon.yourdomain.com \
  -e NEXTAUTH_SECRET=your-secret \
  v5beacon
```

### 使用 PM2 部署

项目包含了 PM2 配置文件 `ecosystem.config.js`，可以直接使用：

```bash
# 构建项目
yarn build

# 启动服务
pm2 start ecosystem.config.js
```

## 自定义服务

要添加或修改服务卡片，编辑 `src/app/data/services.ts` 文件。每个服务需要包含以下信息：

```typescript
{
  id: string;          // 服务唯一标识
  name: string;        // 服务名称
  description: string; // 服务描述
  url: string;         // 服务访问地址
  icon: string;        // 服务图标
  category: string;    // 服务分类
}
```

## 贡献

欢迎提交 Pull Requests 和 Issues。在提交 PR 前，请确保：

1. 代码通过 ESLint 检查 (`yarn lint`)
2. 所有新功能都有适当的文档说明
3. 遵循现有的代码风格

## 许可证

[MIT](LICENSE)
