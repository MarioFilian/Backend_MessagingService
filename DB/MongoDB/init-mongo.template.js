// init-mongo.template.js

db = connect("mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/");

// Crear base de datos `presence-connect-service`
db = db.getSiblingDB("presence-connect-service");
db.createCollection("initCollection");

// Crear base de datos `presence-connect-service-test`
db = db.getSiblingDB("presence-connect-service-test");
db.createCollection("initCollection");
