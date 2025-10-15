# Deploying Flowise to Render.com

This guide will help you deploy Flowise to Render.com using the provided configuration files.

## Prerequisites

1. A Render.com account
2. Your Flowise repository connected to Render
3. Node.js 18+ (Render will handle this automatically)

## Deployment Options

### Option 1: Docker Deployment (Recommended)

Use the `render.yaml` file for Docker-based deployment:

1. Connect your repository to Render
2. Render will automatically detect the `render.yaml` file
3. The deployment will use the existing Dockerfile

**Configuration:**
- **Build Command:** `pnpm install && pnpm build`
- **Start Command:** `pnpm start`
- **Health Check:** `/api/v1/ping`
- **Environment:** Node.js with Docker

### Option 2: Direct Node.js Deployment

Use the `render-simple.yaml` file for direct Node.js deployment:

1. Rename `render-simple.yaml` to `render.yaml`
2. Connect your repository to Render
3. Render will use the simplified configuration

**Configuration:**
- **Build Command:** `npm install --legacy-peer-deps && npm run build`
- **Start Command:** `npm start`
- **Health Check:** `/api/v1/ping`
- **Environment:** Node.js

## Environment Variables

Configure these environment variables in your Render dashboard:

### Required Variables
- `NODE_ENV`: `production`
- `NODE_OPTIONS`: `--max-old-space-size=8192`

### Core Configuration
- `PORT`: The HTTP port Flowise runs on (default: 3000)
- `CORS_ORIGINS`: Allowed origins for cross-origin HTTP calls
- `IFRAME_ORIGINS`: Allowed origins for iframe src embedding
- `FLOWISE_FILE_SIZE_LIMIT`: Upload file size limit (default: 50mb)
- `DEBUG`: Print logs from components (Boolean)
- `LOG_LEVEL`: Log level - `error`, `info`, `verbose`, `debug` (default: info)
- `LOG_PATH`: Location where log files are stored

### Database Configuration
**For SQLite (default):**
- `DATABASE_TYPE`: `sqlite`
- `DATABASE_PATH`: Location where database is saved

**For PostgreSQL/MySQL:**
- `DATABASE_TYPE`: `postgres` or `mysql`
- `DATABASE_HOST`: Database host URL or IP address
- `DATABASE_PORT`: Database port (default: 5432 for postgres, 3306 for mysql)
- `DATABASE_USER`: Database username
- `DATABASE_PASSWORD`: Database password
- `DATABASE_NAME`: Database name
- `DATABASE_SSL`: Enable SSL connection (Boolean, default: false)

### Security Configuration
- `SECRETKEY_PATH`: Location where encryption key is saved
- `APIKEY_PATH`: Location where API key is saved
- `FLOWISE_SECRETKEY_OVERWRITE`: Overwrite existing secret key (Boolean)

### Tool Configuration
- `TOOL_FUNCTION_BUILTIN_DEP`: NodeJS built-in modules for Custom Tool/Function
- `TOOL_FUNCTION_EXTERNAL_DEP`: External modules for Custom Tool/Function
- `ALLOW_BUILTIN_DEP`: Allow project dependencies for Custom Tool/Function (Boolean, default: false)

### Storage Configuration
- `STORAGE_TYPE`: Storage type for files
- `BLOB_STORAGE_PATH`: Path for blob storage

### LangChain Configuration
- `LANGCHAIN_TRACING_V2`: Enable LangChain tracing (Boolean)
- `LANGCHAIN_ENDPOINT`: LangChain endpoint URL
- `LANGCHAIN_API_KEY`: LangChain API key
- `LANGCHAIN_PROJECT`: LangChain project name

## Deployment Steps

1. **Fork/Clone Repository**
   ```bash
   git clone https://github.com/georgewhyte420-eng/Dibbs-opportunity
   cd Dibbs-opportunity
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name:** `flowise` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Health Check Path:** `/api/v1/ping`

4. **Set Environment Variables**
   - Add the required environment variables listed above
   - Set `NODE_ENV` to `production`

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

## Troubleshooting

### Build Failures
- Ensure all dependencies are properly installed
- Check that TypeScript compilation succeeds
- Verify that the build command completes without errors

### Runtime Issues
- Check the application logs in Render dashboard
- Verify environment variables are set correctly
- Ensure the health check endpoint is accessible

### Memory Issues
- The `NODE_OPTIONS` environment variable is set to increase memory limit
- Consider upgrading to a higher Render plan if needed

## Post-Deployment

1. **Access Your Application**
   - Your Flowise instance will be available at the provided Render URL
   - Default port is 3000 (handled by Render)

2. **Initial Setup**
   - Navigate to your deployed URL
   - Follow the Flowise setup wizard
   - Configure your first chatflow

3. **Monitoring**
   - Use Render's built-in monitoring
   - Check application logs regularly
   - Monitor health check endpoint

## Support

For issues specific to Flowise, check the [Flowise Documentation](https://docs.flowiseai.com/).

For Render deployment issues, check the [Render Documentation](https://render.com/docs).
