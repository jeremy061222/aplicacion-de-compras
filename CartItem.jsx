import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Navbar */}
      <nav>
        <a href="/">Inicio</a> | 
        <a href="/products">Plantas</a> | 
        <a href="/cart">Carrito</a>
      </nav>

      <h1>Carrito de Compras 🛒</h1>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map(item => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
            <img src={item.image} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>Precio unitario: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>

            <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>
              +
            </button>

            <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}>
              -
            </button>

            <button onClick={() => dispatch(removeItem(item.id))}>
              Eliminar
            </button>

            <p>
              Subtotal: ${item.price * item.quantity}
            </p>
          </div>
        ))
      )}

      <h2>Total: ${total}</h2>

      <button onClick={() => alert("Próximamente")}>
        Pagar
      </button>

      <br />

      <a href="/products">
        <button>Seguir comprando</button>
      </a>
    </div>
  );
}

export default CartItem;
