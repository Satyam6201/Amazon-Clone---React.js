import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoStar, IoStarHalf } from "react-icons/io5"
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'
import '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const { updateCartCount } = useCart();

    const [today, setToday] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        fetch('https://worldtimeapi.org/api/ip') 
            .then(res => res.json())
            .then(data => {
                const date = new Date(data.datetime);
                const options = { weekday: 'short', day: 'numeric', month: 'short' };
                const formattedToday = date.toLocaleDateString('en-US', options);
                
                const delivery = new Date(date);
                delivery.setDate(delivery.getDate() + 5);
                const formattedDelivery = delivery.toLocaleDateString('en-US', options);

                setToday(formattedToday);
                setDeliveryDate(formattedDelivery);
            })
            .catch(err => {
                console.error("Date API Error:", err);
                const fallbackDate = new Date();
                const options = { weekday: 'short', day: 'numeric', month: 'short' };
                const formattedToday = fallbackDate.toLocaleDateString('en-US', options);

                const delivery = new Date(fallbackDate);
                delivery.setDate(delivery.getDate() + 5);
                const formattedDelivery = delivery.toLocaleDateString('en-US', options);

                setToday(formattedToday);
                setDeliveryDate(formattedDelivery);
            });
    }, []);

    const addToCart = (productId, quantity = 1) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        toast("Cart updated")
        updateCartCount();
    }

    return (
        <div className='card' onClick={() => navigate(`/products/${product.id}`)}>
            <div className='product-image-container'>
                <img src={product.thumbnail} alt={product.title} className='product-image' />
            </div>
            <div className='product-details'>
                <h3 className='product-title'>{product.title}</h3>
                <div className='rating'>
                    <span className='stars'><IoStar /><IoStar /><IoStar /><IoStar /><IoStarHalf /></span>
                    <span className='reviews'>({product.rating})</span>
                </div>
                <p className='bought-info'>{product.stock} left in stock</p>
                <div className='price-section'>
                <span className='current-price'>Rs. {(product.price * 6).toFixed(2)}</span>
                <span className='original-price'>
                    Rs. {((product.price / (1 - product.discountPercentage / 100)) * 6).toFixed(2)}
                </span>

                    <span className='discount'>({product.discountPercentage}% off)</span>
                </div>

                <p className='delivery-info'>
                    FREE delivery <strong>{deliveryDate || "..."}</strong><br />
                    Or fastest delivery <strong>{today || "..."}</strong>
                </p>
                <p className='service'>Service: {product.warrantyInformation || "No warranty"}</p>
                <button className='add-to-cart' onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id)
                }}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard;
