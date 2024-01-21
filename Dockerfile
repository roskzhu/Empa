FROM node:14

# Set the working directory in the container
WORKDIR /client/src

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install the application dependencies
RUN npm install

# Copy the a pplication code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]