import { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getSavedRecipes,
  getSavedRecipesIds,
  saveRecipe,
  getSingleRecipe,
} from "../controller/recipes.js";

const router = Router();

router.get("/", getRecipes);
router.post("/create-new", createRecipe);
router.put("/save-recipe", saveRecipe);
router.get("/savedRecipes/:userId", getSavedRecipes);
router.get("/savedRecipes/ids", getSavedRecipesIds);
router.get("/recipe/:id", getSingleRecipe);

export default router;
