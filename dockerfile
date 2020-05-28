FROM node:12.17.0-alpine3.11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# a wildcard is used to ensure both package.json nad package-lock are copied
COPY package*.json ./

RUN npm install
# if you're building your code for production
# RUN npm ci --only=production

# Buncle app source
COPY . .

EXPOSE 5000:5000

CMD [ "node", "app.js" ]