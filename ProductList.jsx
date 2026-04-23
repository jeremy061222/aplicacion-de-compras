import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plantsData = [
  { id: 1, name: "Monstera", price: 20, category: "Interior", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Ficus", price: 25, category: "Interior", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Aloe Vera", price: 15, category: "Suculentas", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Cactus", price: 10, category: "Suculentas", image: "https://via.placeholder.com/100" },
  { id: 5, name: "Orquídea", price: 30, category: "Flores", image: "https://via.placeholder.com/100" },
  { id: 6, name: "Rosa", price: 18, category: "Flores", image: "https://via.placeholder.com/100" },
];

function ProductList() {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems([...addedItems, plant.id]);
  };

  const categories = [...new Set(plantsData.map(p => p.category))];

  return (
    <div>
      {/* Navbar */}
      <nav>
        <a href="/">Inicio</a> | 
        <a href="/products">Plantas</a> | 
        <a href="/cart">Carrito</a>
      </nav>

      <h1>Lista de Plantas 🌿</h1>

      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>

          {plantsData
            .filter(p => p.category === category)
            .map(plant => (
              <div key={plant.id}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems.includes(plant.id)}
                >
                  {addedItems.includes(plant.id)
                    ? "Agregado"
                    : "Agregar al carrito"}
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
