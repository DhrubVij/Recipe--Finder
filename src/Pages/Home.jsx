import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Components/RecipeCard";
import useLoading from "../Hook/useLoading";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchquery, setsearchquery] = useState("");
  const{Loading,startLoading,stopLoading}=useLoading();
  async function fetchRecipes(skipCount, query,showLoading=true) {
    if (showLoading) startLoading();
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount == 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {}
    finally{
      if(showLoading)
    stopLoading();
    }
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleShowAll() {
    setsearchquery("");
    fetchRecipes(0, "",false);
  }
  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let query = form.get("query").trim();
    setsearchquery(query);
    if (query) {
      fetchRecipes(0, query);
    }
  }
  if (Loading) {
    return <p className="text-center py-6 text-muted">Loading.....</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 max-w-md mx-auto mb-8"
      >
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>
      {recipes.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted mb-4">No recipe for '{searchquery}'</p>

          <button
            onClick={handleShowAll}
            className="text-accent hover:underline"
          >
            Show All Recipes
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchquery)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;
