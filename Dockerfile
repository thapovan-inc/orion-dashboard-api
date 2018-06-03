FROM node

ADD . orion_dashboard_server/

WORKDIR orion_dashboard_server/

#RUN npm install

CMD ["npm", "start"]

EXPOSE 8080 5000