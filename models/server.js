const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Conectar DB
    this.conectarDB();
    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }
  async conectarDB(){
    await dbConnection();
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
