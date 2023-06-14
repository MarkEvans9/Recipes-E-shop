import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";
import { useNavigate } from "react-router-dom";

function CreateRecepies() {
  const userId = useGetUserId();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });
  const navigate = useNavigate();

  //input change handler
  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  //adding ingredients
  function handleAdd() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  //removing ingredients
  function handleRemove(e, i) {
    const ingredients = recipe.ingredients.filter((ing, ind) => ind !== i);

    setRecipe({ ...recipe, ingredients });
  }

  //ingredients inputs change
  function handleIng(e, i) {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[i] = value;
    setRecipe({ ...recipe, ingredients });
  }

  //form submittion
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading((prev) => !prev);
      const responce = await fetch(
        "http://localhost:7000/api/recipes/create-new",
        {
          method: "POST",
          body: JSON.stringify(recipe),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok)
        alert(
          "Unable to create recipe.please fill all inputs and make sure to add ingrediets"
        );
      const data = await responce.json();
      navigate("/");
    } catch (err) {
      alert(err.message);
      // console.log(err);
    } finally {
      setLoading((prev) => !prev);
    }
  }

  return (
    <div className="flex flex-col items-center p-5 bg-slate-300 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold ">
        Create Recipe
      </h1>

      <form
        className="shadow-lg p-10 w-[300px] sm:w-[400px] flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1  w-full">
          <label
            className="text-lg block font-medium text-gray-700"
            htmlFor="name"
          >
            Title:
          </label>

          <input
            type="text"
            autoComplete="true"
            id="name"
            name="name"
            required
            onChange={handleChange}
            className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
          />
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label
            className="text-lg block font-medium text-gray-700"
            htmlFor="name"
          >
            Ingredients:
          </label>
          <button
            className="bg-slate-200 mb-3"
            onClick={handleAdd}
            type="button"
          >
            Add ingredients
          </button>
          {recipe.ingredients.map((ing, i) => (
            <div className="w-full " key={i}>
              <input
                type="text"
                autoComplete="true"
                id="ingredients"
                name="ingredients"
                value={ing}
                onChange={(e) => handleIng(e, i)}
                required
                className=" border-b-2 focus:outline-none p-2 px-2 focus:bg-gray-100  rounded w-[100%]"
              />
              <button onClick={(e) => handleRemove(e, i)}>x</button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label
            className="text-lg block font-medium text-gray-700"
            htmlFor="instructions"
          >
            Instruction:
          </label>

          <textarea
            type="text"
            autoComplete="true"
            id="instructions"
            name="instructions"
            required
            onChange={handleChange}
            className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
          />
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label
            className="text-lg block font-medium text-gray-700"
            htmlFor="imgUrl"
          >
            Img Url:
          </label>

          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            required
            onChange={handleChange}
            className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
          />
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label
            className="text-lg block font-medium text-gray-700"
            htmlFor="cookingTime"
          >
            Cooking Time:
          </label>

          <input
            type="number"
            autoComplete="true"
            id="cookingTime"
            name="cookingTime"
            required
            onChange={handleChange}
            className=" border-b-2 focus:outline-none  px-2 focus:bg-gray-100 p-1 rounded"
          />
        </div>
        <button
          className="bg-black text-[#00df9a] p-2 rounded-lg w-full font-m,edium text-xl mt-2"
          type="submit"
        >
          Submit
        </button>
        <div className="flex  justify-center ">
          {loading && <img src="/Assets/loader.svg" alt="" />}
        </div>
      </form>
    </div>
  );
}

export default CreateRecepies;
