import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  Home,
  Layout,
  SignIn,
  Register,
  CreateRecepie,
  SavedRecepiesPage,
  RecipePage,
} from "./PagesImports";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="/create-new-Recepie" element={<CreateRecepie />} />
      <Route path="/saved-recepies" element={<SavedRecepiesPage />} />

      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/register" element={<Register />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
