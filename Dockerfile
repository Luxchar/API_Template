# Use an official Node.js runtime as a parent image
FROM alpine

# Install Node.js and npm
RUN apk add --update nodejs npm
# Install the musl library for Alpine (required to not get an error when running the application)
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
