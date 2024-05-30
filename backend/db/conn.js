const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://viniciuslopesfrigo3:ywAphPAAVRmKNvWq@cluster0.zriphql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Conectado ao Banco.");
  } catch (error) {
    console.log(`Erro:${Error}`);
  }
}

module.exports = main;
