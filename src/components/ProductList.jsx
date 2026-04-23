import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

const plantsData = [
  // Interior
  { id: 1, name: "Monstera", price: 20, category: "Interior", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Ficus", price: 25, category: "Interior", image: "https://via.placeholder.com/100" },

  // Suculentas
  { id: 3, name: "Aloe Vera", price: 15, category: "Suculentas", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Cactus", price: 10, category: "Suculentas", image: "https://via.placeholder.com/100" },

  // Flores
  { id: 5, name: "Orquídea", price: 30, category: "Flores", image: "https://via.placeholder.com/100" },
  { id: 6, name: "Rosa", price: 18, category: "Flores", image: "https://via.placeholder.com/100" },
];

function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    // desactiva botón después de agregar
    if (!addedItems.includes(plant.id)) {
      setAddedItems([...addedItems, plant.id]);
    }
  };

  const categories = [...new Set(plantsData.map(p => p.category))];

  // contador dinámico del carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>

      {/* NAVBAR */}
      <nav style={{ marginBottom: "20px" }}>
        <a href="/">Inicio</a> |{" "}
        <a href="/products">Plantas</a> |{" "}
        <a href="/cart">Carrito 🛒 ({totalItems})</a>
      </nav>

      <h1>Lista de Plantas 🌿</h1>

      {/* CATEGORÍAS */}
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>

          {plantsData
            .filter(p => p.category === category)
            .map(plant => (
              <div
                key={plant.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px"
                }}
              >
                {/* Imagen */}
                <img src={plant.image} alt={plant.name} />

                {/* Nombre */}
                <h3>{plant.name}</h3>

                {/* Precio */}
                <p>${plant.price}</p>

                {/* Botón */}
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
