# 部署文档站点

## 本地 Docker

```bash
docker compose up -d --build
```

站点默认访问 `http://服务器地址:18765`。

## GitHub Actions + GHCR

`.github/workflows/docker-publish.yml` 会在推送 `main` 或 `v*.*.*` 标签时构建镜像并发布到：

```text
ghcr.io/组织名/仓库名:latest
```

工作流只需要 GitHub 内置的 `GITHUB_TOKEN`，无需额外配置发布凭据。首次发布后，在仓库 **Packages** 页面将镜像设为公开，或在服务器使用有 `read:packages` 权限的 Token 拉取。

## 服务器部署

服务器安装 Docker 后执行：

```bash
docker login ghcr.io
docker pull ghcr.io/组织名/仓库名:latest
docker rm -f nukejsdocs 2>/dev/null || true
docker run -d --name nukejsdocs --restart unless-stopped -p 18765:80 \
  ghcr.io/组织名/仓库名:latest
```

每次推送到 `main` 后，`Build and publish docs image` 会先发布 GHCR 镜像，再自动通过 SSH 更新服务器。也可以手动触发 `Deploy docs container` 工作流。需要在仓库 Secrets 中配置：

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_PORT`（可选）
- `DEPLOY_SSH_KEY`
- `GHCR_READ_TOKEN`

部署工作流会拉取指定标签并重建名为 `nukejsdocs` 的容器。

> 如果服务器上的 GHCR 镜像设为公开，可以将 `GHCR_READ_TOKEN` 留空，并删除部署脚本中的 `docker login` 命令。
