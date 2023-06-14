import { RecipeModel } from "../model/Recepie.js";
import { UserModel } from "../model/Users.js";

//all recipes
const getRecipes = async (req, res) => {
  try {
    const responce = await RecipeModel.find();

    return res.status(200).json(responce);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//create new Recipe
const createRecipe = async (req, res) => {
  try {
    const newRecipe = new RecipeModel(req.body);
    await newRecipe.save();

    return res
      .status(201)
      .json({ message: "created Successfully", data: newRecipe });
  } catch (err) {
    return res
      .status(422)
      .json({ message: err || "Unable to create new Recpie" });
  }
};

//Save recipe
const saveRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);

    user.savedRecipes.push(recipe);
    await user.save();
    return res
      .status(200)
      .json({ message: "success", savedRecipes: user.savedRecipes });
  } catch (err) {
    return req.status(500).json({ message: err.message });
  }
};

//getting all saved recipes ids
const getSavedRecipesIds = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);

    return res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    return res.status(500).json({ messsage: err.message });
  }
};

// getting all saved recipes
const getSavedRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    return res.status(200).json({ savedRecipes });
  } catch (err) {
    return res.status(500).json({ messsage: err.message });
  }
};

//getting single recipe by id
const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await RecipeModel.findById(id);
    if (!data) return res.status(500).json({ mesage: "Recipe Not Found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ messsage: err.message });
  }
};

export {
  createRecipe,
  getRecipes,
  saveRecipe,
  getSavedRecipesIds,
  getSavedRecipes,
  getSingleRecipe,
};
