const Product = require("../models/product.model");

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const product = await Product.findById(id).populate("category", "name");

      if (!product) {
        return res.status(404).send({
          ok: false,
          message: "No se encontro el producto",
        });
      }

      return res.status(200).send({
        ok: true,
        product,
        message: "Producto encontraro",
      });
    }

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;

    const products = await Product.find()
      .populate("category", "name")
      .limit(limit)
      .skip(page * limit)
      .collation({ locale: "es" })
      .sort({ name: 1 });

    return res.status(200).send({
      ok: true,
      message: "Productos obtenenidos Correctamente",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error al obtener los productos",
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);

    if (req.file?.filename) {
      product.image = req.file.filename;
    }

    const productDB = await product.save();

    return res.status(200).send({
      ok: true,
      message: "Producto creado Correctamente",
      product: productDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "Error al crear los productos",
    });
  }
}

async function updateProduct(req, res) {
  try {
    if (req.user.role !== "ADMIN_ROLE") {
      return res.status(403).send({
        ok: false,
        message: "No tienes permisos para actualizar usuarios",
      });
    }

    const id = req.params.id;

    const body = req.body;

    if (req.file?.filename) {
      update.image = req.file.filename;
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).send({
      ok: true,
      message: "Productos actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      message: "No se puedo actualizar el producto",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    if (req.user.role !== "ADMIN_ROLE") {
      return res.status(401).send({
        ok: false,
        message: "No tienes permisos para realizar esta accion",
      });
    }

    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({
        ok: false,
        message: "Producto no encontrado",
      });
    }
    return res.status(200).send({
      ok: true,
      message: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    consle.log(error);
    return res.status(500).send({
      ok: false,
      message: "Error al eliminar el producto",
    });
  }
}

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
