FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
