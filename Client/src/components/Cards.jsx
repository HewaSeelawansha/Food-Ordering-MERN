import React, { useContext, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FaHeart} from 'react-icons/fa';
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2';
import useCart from '../hooks/useCart';
import axios from 'axios';

const Cards = ({item}) => {
  const [cart, refetch] = useCart();
  const {name, image, price, recipe, _id} = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const {user} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  //Add Cart
  const handleCart = item => {
    if (user && user?.email) {
      const cartItem = {menuItemId: _id, name, recipe, image, price, quantity: 1, email: user.email};
      console.log('Cart Item:', cartItem); // Add this line
      axios.post('http://localhost:3000/carts', cartItem)
      .then((response) => {
        console.log(response);
        if (response) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to the Cart!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          }) 
      });
    } else {
      Swal.fire({
        title: "Item Not Added to the Cart :(",
        text: "Please Login/Signup to Add Items to the Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login/Signup"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state: {from: location}});
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled)
  }
  return (
      <div className="card mr-5 bg-base-200 w-[300px] relative">
        <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}>
            <FaHeart className='h-5 w-5 cursor-pointer' onClick={handleHeartClick}/>
        </div>
        <Link to={`/menu/${item._id}`}>
            <figure>
                <img
                src={item.image}
                alt="Shoes" 
                className='hover:scale-105 transition-all duration-300 md:h-56'/>
            </figure>
        </Link>
        <div className="card-body">
            <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
            <p>Description of the item</p>
            <div className="card-actions justify-between items-center mt-2">
            <h5 className='font-semibold'><span className='text-blue-700'>$</span>{item.price}</h5>
            <button className="btn bg-green text-white" onClick={() => handleCart(item)}>Add to Cart</button>
            </div>
        </div>
      </div>
  )
}

export default Cards
