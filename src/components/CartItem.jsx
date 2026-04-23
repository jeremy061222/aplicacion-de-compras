import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  // TOTAL DE ITEMS (BIEN HECHO)
  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // TOTAL DEL CARRITO (DINÁMICO)
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>

      {/* NAVBAR */}
      <nav style={{ marginBottom: "20px" }}>
        <a href="/">Inicio</a> |{" "}
        <a href="/products">Plantas</a> |{" "}
        <a href="/cart">Carrito 🛒 ({totalItems})</a>
      </nav>

      <h1>Carrito de Compras 🛒</h1>

      {/* CARRITO VACÍO */}
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map(item => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px"
            }}
          >
            {/* Imagen */}
            <img src={item.image} alt={item.name} width="100" />

            {/* Nombre */}
            <h3>{item.name}</h3>

            {/* Precio */}
            <p>Precio unitario: ${item.price}</p>

            {/* Cantidad */}
            <p>Cantidad: {item.quantity}</p>

            {/* BOTONES DE CANTIDAD */}
            <button
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, amount: 1 }))
              }
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch(updateQuantity({ id: item.id, amount: -1 }))
              }
            >
              -
            </button>

            {/* ELIMINAR */}
            <button
              onClick={() => dispatch(removeItem(item.id))}
            >
              Eliminar
            </button>

            {/* SUBTOTAL */}
            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>
        ))
      )}

      {/* TOTAL GENERAL */}
      <h2>Total del carrito: ${totalPrice}</h2>

      {/* BOTÓN DE PAGO */}
      <button onClick={() => alert("Próximamente")}>
        Pagar
      </button>

      <br /><br />

      {/* SEGUIR COMPRANDO */}
      <a href="/products">
        <button>Seguir comprando</button>
      </a>

    </div>
  );
}

export default CartItem;
