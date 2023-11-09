const router = require("express").Router();
const { Category, Product } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!allCategories) {
      res.status(404).json({ message: "No categories were found." });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryById = await Category.findOne({
      include: [{ model: Product }],
      where: { id: req.params.id },
    });
    if (!categoryById) {
      res.status(404).json({ message: "No category with the id was found." });
      return;
    }
    res.status(200).json(categoryById);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      {
        where: { id: req.params.id },
      }
    );
    if (!updateCategory[0]) {
      res.status(404).json({ message: "No category with this id found." });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No category with the id." });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;