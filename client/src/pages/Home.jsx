import { useFetch } from "../hooks/useFetcher";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const [data, loading] = useFetch("http://localhost:7000/api/recipes");

  return (
    <>
      {loading ? (
        <img className="text-center" src="/Assets/loader.svg" alt="" />
      ) : (
        <div
          className="max-w-[1240px] mx-auto
 bg-gray-300 flex  p-3 flex-col items-center gap-3  px-2 "
        >
          <h1 className="text-3xl sm:text-4xl md:5xl font-bold">Recipes</h1>
          {data.map((res) => (
            <div
              className="bg-white flex flex-col gap-2 shadow-lg rounded-lg object-center hover:scale-[1.01] transition-all cursor-pointer overflow-hidden my-2 "
              key={res._id}
              onClick={() => navigate(`/recipe/${res._id}`)}
            >
              <img
                className="w-[20rem] h-[20rem] md:w-96 md:h-96 contain bg-slate-50 "
                src={res.imgUrl}
                alt=""
              />
              <h2 className="text-xl font-medium  px-1 hover:underline under">
                {res.name}
              </h2>

              <p className="mb-4 px-1 font-medium text-gray-900">
                Cooking Time:
                <span className="text-[19px]">{res.cookingTime} minutes</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;

/*
https://plus.unsplash.com/premium_photo-1670895801186-588af8aeef1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVjaXBlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60

*/

// h-[calc(100vh-5rem);]
