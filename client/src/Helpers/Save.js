export async function handleSave(id, userId) {
  const res = await fetch(" http://localhost:7000/api/recipes/save-recipe", {
    method: "PUT",
    body: JSON.stringify({ recipeId: id, userId: userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  alert(data.message);
}
