const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }

  middlewares() {
    //Servidor estatico
    this.app.use(express.static("public"));
    //Cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/usuarios", require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Levantado en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
