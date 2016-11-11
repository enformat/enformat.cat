FROM node:argon

MAINTAINER Enric Forn enric.forn@enformat.cat

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 80

# Bundle app source
COPY . /usr/src/app

EXPOSE  3000

CMD [ "npm", "start" ]