import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LuShoppingCart } from 'react-icons/lu';
import axios from 'axios';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { RiWallet3Line } from 'react-icons/ri';

const Checkout = () => {
    const { clearCart } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cartItems, setCartItems] = useState([]);
    const [paymentType, setPaymentType] = useState('card');
    const [userLocation, setUserLocation] = useState("Detecting...");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const fetchedProducts = [];

            for (const item of cart) {
                try {
                    const res = await fetch(`https://dummyjson.com/products/${item.id}`);
                    const data = await res.json();
                    fetchedProducts.push({ ...data, quantity: item.quantity });
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            setCartItems(fetchedProducts);
        };

        fetchCartData();
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            setUserLocation("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const { data } = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
                        params: {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            localityLanguage: 'en',
                        },
                    });

                    const locationString = `${data.city || data.principalSubdivision}, ${data.countryName}`;
                    setUserLocation(locationString);
                } catch (err) {
                    console.error("Error fetching location:", err);
                    setUserLocation("Location unavailable");
                }
            },
            (error) => {
                console.error("Geolocation error:", error.message);
                setUserLocation("Permission denied");
            }
        );
    }, []);

    const onSubmit = (data) => {
        toast.success("🎉 Order Placed Successfully! 🎉");
        clearCart();
        navigate('/');
    };

    const calculateSubtotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <div className='checkout'>
            <div className='checkouttopbar'>
                <img src={logo} alt='Logo' onClick={() => navigate('/')} />
                <h1>Secure Checkout</h1>
                <button>
                    <LuShoppingCart size={24} />
                    <span>Cart</span>
                </button>
            </div>

            <div className='checkoutContainer'>
                <div className='left'>
                    <div className='addressSection'>
                        <h3 className='section-title'>Delivering to <span className='user-name'>Satyam Mishra</span></h3>
                        <div className='location-box'>
                            {userLocation === "Detecting..." ? "Kamla Nagar, Bhopal" : userLocation}
                        </div>
                        <div className="date-display">
                            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                    </div>

                    <div className='paymentMethod'>
                        <h3 className='section-title'>Payment Method</h3>
                        <div className='paymentOptions'>
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value="card"
                                    checked={paymentType === 'card'}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                />
                                <AiOutlineCreditCard className="payment-icon" />Card
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value="upi"
                                    checked={paymentType === 'upi'}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                /> 
                                <RiWallet3Line className="payment-icon" />UPI (PhonePe / GPay)
                            </label>
                        </div>

                        <div className='paymentForm'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {paymentType === 'card' && (
                                    <>
                                        <label>Card Number</label>
                                        <input
                                            type='text'
                                            placeholder='XXXX XXXX XXXX XXXX'
                                            {...register("cardNumber", {
                                                required: "Card Number is required",
                                                pattern: {
                                                    value: /^[0-9]{16}$/,
                                                    message: "Card must be 16 digits"
                                                }
                                            })}
                                            maxLength={16}
                                        />
                                        {errors.cardNumber && <span className='error'>{errors.cardNumber.message}</span>}

                                        <label>Card Holder Name</label>
                                        <input
                                            type='text'
                                            placeholder='Your Name'
                                            {...register("cardHolder", { required: "Card Holder Name is required" })}
                                        />
                                        {errors.cardHolder && <span className='error'>{errors.cardHolder.message}</span>}

                                        <div className='cardDetails'>
                                            <div className='subdiv'>
                                                <label>Expiry Date</label>
                                                <input
                                                    type='month'
                                                    {...register("expiry", { required: "Expiry Date is required" })}
                                                />
                                                {errors.expiry && <span className='error'>{errors.expiry.message}</span>}
                                            </div>

                                            <div className='subdiv'>
                                                <label>CVV</label>
                                                <input
                                                    type='password'
                                                    {...register("cvv", {
                                                        required: "CVV is required",
                                                        pattern: {
                                                            value: /^[0-9]{3}$/,
                                                            message: "CVV must be 3 digits"
                                                        }
                                                    })}
                                                />
                                                {errors.cvv && <span className='error'>{errors.cvv.message}</span>}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {paymentType === 'upi' && (
                                    <>
                                        <label>UPI ID</label>
                                        <input
                                            type='text'
                                            placeholder='yourname@bank'
                                            {...register("upi", {
                                                required: "UPI ID is required",
                                                pattern: {
                                                    value: /^[\w.-]+@[\w]+$/,
                                                    message: "Invalid UPI ID format"
                                                }
                                            })}
                                        />
                                        {errors.upi && <span className='error'>{errors.upi.message}</span>}
                                        <p className='upiInfo'>Supported: PhonePe, Google Pay, Paytm UPI</p>
                                    </>
                                )}

                                <button type='submit' className='orderBtn'>Place Order</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='right'>
                    <div className='orderSummary'>
                        <h2>Order Summary</h2>
                        <table>
                            <tbody>
                                <tr><td>Items:</td><td>{cartItems.length}</td></tr>
                                <tr><td>Delivery:</td><td>Free</td></tr>
                                <tr className="normal"><td>Delivery by</td><td>
                                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>  
                                </tr>
                                <tr><th>Total:</th><th>Rs. {(calculateSubtotal() * 6).toFixed(2)}</th></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;