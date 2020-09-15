# specifiy base image
FROM node:alpine

# copy from your machine relative to build context into the container
# DO NOT COPY IN ROOT FOLDER
# any following instructions container-side will be executed  relative to this path
WORKDIR /home/app 
COPY ./package.json ./ 
# install dependencies
RUN npm install

# copy all folders after running npm install
# this way only changes into package.json will trigger reinstalling dependencies when rebuilding the image after a code change
COPY ./ ./
CMD ["npm", "start"]