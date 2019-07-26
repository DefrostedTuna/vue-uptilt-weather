#!/bin/sh

cat > /usr/share/nginx/html/js/config.js <<EOF
window.appConfig = {
    corsProxy: "${VUE_APP_CORS_PROXY}",
    googleApiKey: "${VUE_APP_GOOGLE_API_KEY}",
    weatherApiKey: "${VUE_APP_WEATHER_API_KEY}"
}
EOF

exec "$@"