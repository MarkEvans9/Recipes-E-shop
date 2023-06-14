import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetcher";
import { handleSave } from "../Helpers/Save";


function RecipePage() {
  const params = useParams();
  const id = params.id;
  const userId = window.localStorage.getItem("userId");

  const [data, loading] = useFetch(
    `http://localhost:7000/api/recipes/recipe/${id}`
  );

  return (
    <>
      {loading ? (
        <img className="text-center" src="/Assets/loader.svg" alt="" />
      ) : (
        <div
          className="max-w-[1240px] mx-auto
bg-gray-300 flex  py-2 flex-col items-center  lg:p-15 md:p-10 p-5"
        >
          <img
            src={data.imgUrl}
            alt=""
            className="w-[70%] h-[70%] md:w-[50%] md:h-[40%] lg:w-[40%] lg:h-[50%] object-contain"
          />
          <div className="flex gap-5">
            <div className=" mt-5  flex flex-col items-center gap-3 shadow-lg p-10">
              <h3 className="sm:text-2xl md:5xl font-semibold ">Name</h3>
              <span className="font-medium text-lg">{data.name}</span>
            </div>
            <div className=" mt-5  flex flex-col items-center gap-3 shadow-lg p-10">
              <h3 className="sm:text-2xl md:5xl font-semibold ">
                Cooking Time:
              </h3>
              <span className="font-medium text-lg">
                {data.cookingTime} minutes
              </span>
            </div>
          </div>
          <button
            className="bg-white p-2 px-10 rounded-lg   text-lg  font-medium mt-3"
            onClick={async () => await handleSave(id, userId)}
          >
            Save
          </button>
          <h2 className=" mt-5 py-5 text-3xl sm:text-4xl md:5xl font-bold self-start">
            Ingredients:
          </h2>
          <ul className=" w-full ">
            {data.ingredients.map((ing, i) => (
              <li className=" sm:text-lg p-[2px] font-medium" key={i}>
                {" "}
                {ing}.
              </li>
            ))}
          </ul>
          <h2 className=" mt-5 py-5 text-3xl sm:text-4xl md:5xl font-bold self-start">
            Instructions:
          </h2>

          <p className="  sm:text-lg p-[2px] "> {data.instructions}.</p>
        </div>
      )}
    </>
  );
}

export default RecipePage;
