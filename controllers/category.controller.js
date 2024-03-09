const Category = require("../models/category.model");

async function getCategories(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const categories = await Category.find();
      if (!categories) {
        return res.status(404).send({
          ok: false,
          mesage: "No se encontro categorias",
        });
      }

      return res.send(categories);
    }
    const categories = await Category.find();
    res.send({
      categories,
      ok: true,
      mesage: "Categorias obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mesage: "Error al obtener categoria",
    });
  }
}

async function postCategory(req, res) {
  try {
    const category = new Category(req.body);
    const categoryDB = await category.save();

    return res.status(201).send({
      ok: true,
      category: categoryDB,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ ok: false, message: "No se pudo crear la categoria" });
  }
}
module.exports = {
  getCategories,
  postCategory,
};
