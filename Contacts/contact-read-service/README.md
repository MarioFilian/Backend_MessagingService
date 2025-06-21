# 🚀 Contact Read Service

Welcome to the **Contact Read Service**, your GraphQL microservice powered by **Node.js** and **Neo4j**! 🧩

---

## 🎯 What is this?

This service lets you **read contact data** stored in a Neo4j graph database through a **GraphQL API**. It supports fetching:

* 🎉 All contacts
* 🔍 Single contact by ID

All done with Apollo Server — clean, fast, and easy to use!

---

## 🛠️ Tech Stack

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| Node.js       | Server runtime                  |
| Apollo Server | GraphQL API server              |
| Neo4j         | Graph database                  |
| dotenv        | Environment variable management |

---

## ⚙️ Setup

1. Clone this repo:

   ```bash
   git clone https://github.com/MarioFilian/Backend_MessagingService.git
   cd Backend_MessagingService/contact-read-service
   ```

2. Create a `.env` file:

   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=example
   PORT=3026
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the server:

   ```bash
   npm start
   ```

---

## 🌐 Access the API

Open your browser and go to:

```
http://localhost:3026/graphql
```

Here you’ll find the **Apollo Sandbox** — an interactive playground where you can explore schemas, write queries, and test mutations effortlessly!

---

## ✨ Example Queries

### Fetch all contacts

```graphql
query {
  contacts {
    id
    name
    phone
  }
}
```

### Fetch a contact by ID

```graphql
query {
  contact(id: 1) {
    id
    name
    phone
  }
}
```

---

## 🐳 Docker

Build and run with Docker:

```bash
docker build -t contact-read-service .
docker run -p 3026:3026 --env-file .env contact-read-service
```

---

## 🚫 .gitignore

Make sure to add these to `.gitignore` to keep your project clean:

```
node_modules/
.env
```

---

## 📝 Notes

* Neo4j should be running locally or remotely.
* Make sure your `.env` variables match your Neo4j setup.
* Port `3026` is configurable via `.env`.

---

## 💡 License

MIT License © 2025

---

## 👨‍💻 Author

Mario Filian

