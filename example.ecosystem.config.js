module.exports = {
    apps: [{
      name: 'beacon',
      script: '.next/standalone/server.js',
      env_production: {
        PORT: '5702',
        NODE_ENV: 'production',
        AUTHENTIK_ISSUER: 'https://your_auth/application/o/beacon',
        AUTHENTIK_CLIENT_ID: 'YOUR_AUTHENTIK_CLIENT_ID',
        AUTHENTIK_CLIENT_SECRET: 'YOUR_AUTHENTIK_CLIENT_SECRET',
        NEXTAUTH_URL: 'https://your_url',
        NEXTAUTH_SECRET: 'YOUR_NEXTAUTH_SECRET',
        NEXT_PUBLIC_SKIP_AUTH: 'false',
        NEXTAUTH_DEBUG: 'false'
      }
    }]
  }; 