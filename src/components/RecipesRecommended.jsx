import React, { useEffect, useState } from "react";
import "./RecipesRecommended.css";

const API_KEY = "d1753507a774439188e91ec2f3caf368";

export default function RecipesRecommended() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}&language=it`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento delle ricette");
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="recipes-loading">Caricamento ricette...</p>;
  if (error) return <p className="recipes-error">{error}</p>;

  return (
    <section className="recipes-section">
      <h2>Ricette Consigliate</h2>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <a
            key={recipe.id}
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="recipe-card"
          >
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
