import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));

  }, []);

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <h1>Activity Categories</h1>

        <p className="subtitle">
          Explore the different categories of
          activities that contribute to your points.
        </p>

        <div className="category-grid">

          {categories.map((category) => (

            <div
              className="category-card"
              key={category.name}
            >

              <h2>{category.name}</h2>

              <p>
                {category.description}
              </p>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Categories;