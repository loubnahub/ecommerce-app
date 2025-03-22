# Step 1: Use a lightweight node image to build the app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application source code
COPY . ./

# Build the React app for production
RUN npm run build

# Step 2: Use a new node image to serve the app (for production)
FROM node:18-alpine

WORKDIR /app

# Install Express (or any other dependency you need to serve the app)
RUN npm install express cors path

# Copy the built files from the build stage
COPY --from=build /app/build /app/build

# Copy package.json and package-lock.json (for frontend dependencies)
COPY --from=build /app/package*.json /app/

# Install frontend dependencies in the final image
RUN npm install --only=production

# Expose the port your app will run on
EXPOSE 8080

# Copy your Node.js server file (we'll define it next)
COPY server.js .

# CMD to run the Node.js server
CMD ["node", "server.js"]
