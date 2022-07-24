FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If production build:
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Map port
EXPOSE 8080

# Start server
CMD [ "node", "server.js" ]
