import React, { use, useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import { addToStorageCart, getStoreCart, removerFromCart } from "../../utilities/localstores";
import Cart from "../cart/Cart";

const Bottles = ({ bottlesPromise }) => {
    const [cart, setCart] = useState([]);

  const bottles = use(bottlesPromise);

  useEffect(() =>{
    const storageCartIds = getStoreCart();
    // console.log(storageCartIds,bottles);
    const storedCart = [];
    for(const id of storageCartIds){
      // console.log(id);
      const cartBottle = bottles.find(bottle => bottle.id === id);
      if(cartBottle){
        storedCart.push(cartBottle);
      }
    }
    setCart(storedCart);
  }, [bottles])

    const handleAddToCart = (bottle) => {
        // console.log("cart", bottle)
        const newCart = [...cart, bottle];
        setCart(newCart);

        addToStorageCart(bottle.id);
    }

    const handelRemoveFromCart = id =>{
      // console.log('remove',id)
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removerFromCart(id);
    }
//   console.log(bottles);

  return (
    <div>
      <h3>Bottles : {bottles.length}</h3>
      <h3>Add Cart : {cart.length}</h3>
      <Cart cart={cart} handelRemoveFromCart={handelRemoveFromCart}></Cart>

      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle key={bottle.id}
          handleAddToCart={handleAddToCart}
          bottle={bottle}></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;


echo "# watter_bottle" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Sohag-Ali/watter_bottle.git
git push -u origin main