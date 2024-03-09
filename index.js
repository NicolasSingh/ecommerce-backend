const server = require("./app");
const mongoose = require("mongoose");

(async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://singhnicolasmauricio:JzwF5p0jL15d321W@eit-64910.244r1cq.mongodb.net/ecommerce"
    );
    console.log("\x1b[34m CONEXION A LA DB CORRECTA!! \x1b[34m");

    server.listen(3000, () => {
      console.log("\x1b[34m Server is running at port 3000 \x1b[35m");
    });
  } catch (error) {
    console.log(error);
  }
})();
