# Cache Configuration Instructions

To implement efficient cache lifetimes for static assets and improve PageSpeed Insights scores, configure your web server with the following cache headers:

## Apache (.htaccess)

If using Apache server, add this to your `.htaccess` file:

```apache
# Enable Expires headers
ExpiresActive On

# Set default expiry
ExpiresDefault "access plus 1 month"

# Cache images for 1 year
<FilesMatch "\.(jpg|jpeg|png|gif|webp|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header append Cache-Control "public, immutable"
</FilesMatch>

# Cache CSS and JS for 1 year
<FilesMatch "\.(css|js)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header append Cache-Control "public, immutable"
</FilesMatch>

# Cache fonts for 1 year
<FilesMatch "\.(woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header append Cache-Control "public, immutable"
</FilesMatch>
```

## Nginx

If using Nginx, add this to your server configuration:

```nginx
location ~* \.(jpg|jpeg|png|gif|webp|ico|svg|css|js|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## GitHub Pages

For GitHub Pages, you can use a service like Cloudflare to add cache headers:

1. Sign up for Cloudflare
2. Add a Page Rule with the following settings:
   - URL pattern: `*learnfun.me/*`
   - Settings:
     - Browser Cache TTL: 1 year
     - Cache Level: Cache Everything
     - Edge Cache TTL: 1 month

## Netlify

For Netlify, add this to your `netlify.toml` file:

```toml
[[headers]]
  for = "/*.(jpg|jpeg|png|gif|webp|ico|svg|css|js|woff|woff2|ttf|eot)"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

These cache configurations will significantly improve your PageSpeed Insights score by reducing the need to re-download static assets on repeat visits.