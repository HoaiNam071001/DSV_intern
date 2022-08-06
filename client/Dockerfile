FROM node:16-alpine AS builder

WORKDIR /app
ENV PORT=80
#ENV REACT_APP_SERVER="http://localhost:5000"
ENV REACT_APP_SERVER="https://namnh.api.internship.designveloper.com"

COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.22.0-alpine
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]