import React, { useEffect, useState } from 'react'
import './ProductPage.css'
import product1 from '../assets/products2/p1.jpg'
import Navbar from '../components/Navbar'
import NavbarList from '../components/NavbarList'
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { RiDiscountPercentLine } from 'react-icons/ri'
import { FaArrowsRotate } from 'react-icons/fa6'
import { CiDeliveryTruck } from 'react-icons/ci'
import { GoShieldCheck } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaUserCircle } from "react-icons/fa";

const product = {
  name: "Product Name",
  description: "Product Description",
  price: 29.99,
  image: "image_url",
  reviews: [
    { user: "John", comment: "Great product!", rating: 5 },
    { user: "Jane", comment: "Decent quality.", rating: 3 },
    { user: "Alice", comment: "Not bad, but could be improved.", rating: 4 },
  ],
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { updateCartCount } = useCart();
  const [isExchange, setIsExchange] = useState(false);

  const products = {
    reviews: [
      { user: "Utsav", comment: "Great product!", rating: 5 },
      { user: "Shivam", comment: "Decent quality.", rating: 3 },
      { user: "Shashank", comment: "Could be improved.", rating: 4 },
      { user: "Sonu", comment: "Poor quality and performance.", rating: 1 },
    ],
  };

   useEffect(() => {
      fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => console.error('Error fetching categories: ', err));
  
    }, [])

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setActiveImage(data.thumbnail)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message);
        setLoading(false)

      })
  }, [id])

  const addToCart = (productId, quantity = 1, price = null) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (price !== null) existingProduct.price = price;
    } else {
      cart.push({ id: productId, quantity, price }); 
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    toast("Cart updated");
    updateCartCount();
  };
  
  const handleCategoryClick = (category) => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then(res => res.json())
      .then(
        (data)=>{
          navigate(`/searchproducts?query=${category}`, { state: { results: data.products } })
        }
      )
      .catch((err) => console.error('Error fetching categories: ', err));
  }

  if (loading) return <div className='loading'>Loading product details...</div>
  if (error) return <div className='error'>Error: {error}</div>

  return (
    <div className='fullpage'>
      <Navbar />
      <NavbarList />
      <div className='productCategories'>
        {
          categories.map((category, index) => (
            <p key={index} onClick={() => handleCategoryClick(category)}>{category}</p>
          ))
        }
      
      </div>

      <div className='productRow'>
        <div className='productImageList'>
          {
            product.images.slice(0, 4).map((imgpath, index) => (
              <img src={imgpath} key={index} alt={`Product ${index}`}
                onClick={() => setActiveImage(imgpath)}
              />
            )
            )
          }

        </div>
        <div className='productImage'>
          <img src={activeImage} alt={product.title} />
        </div>
        <div className='productInfo'>
          <h1>{product.title}</h1>
          <div className='rating'>
            <span className='stars'><IoStar /><IoStar /><IoStar /><IoStar /><IoStarHalf /></span>
            <span className='reviews'>({product.rating})</span>
          </div>
          <div className='price'>
            <span className='discount'>-{product.discountPercentage}%</span>
            <span className='finalAmount'>Rs. {(product.price*6).toFixed(2)}</span>
          </div>
          <span className='mrp'>M.R.P.: <span>{(product.price / (1 - product.discountPercentage / 100)*6).toFixed(2)}</span></span>
          <div className='hr'></div>
          <div className='offerstitle'>
            <RiDiscountPercentLine />
            <span>Offers</span>
          </div>
          <div className='offers'>
          <div className='offer'>
            <h3>Bank Offer</h3>
            <p>Get 10% Instant Discount up to ₹750 on HDFC Credit Cards</p>
            <span>View all offers &gt;</span>
          </div>

          <div className='offer'>
            <h3>Special Price</h3>
            <p>Save ₹2,000 with Limited-Time Deal — Hurry!</p>
            <span>Grab Deal &gt;</span>
          </div>

          <div className='offer'>
            <h3>Exchange Offer</h3>
            <p>Up to ₹500 off on exchange for your old device</p>
            <span>Check eligibility &gt;</span>
          </div>

          <div className='offer'>
            <h3>Partner Offer</h3>
            <p>Flat ₹200 cashback on Paytm Wallet & Postpaid</p>
            <span>Know More &gt;</span>
          </div>

          <div className='offer'>
            <h3>No Cost EMI</h3>
            <p>EMI starting from ₹299/month on select cards</p>
            <span>See Plans &gt;</span>
          </div>

          </div>
          <div className='hr'></div>
          <div className='extras'>

            <div className='extraItem'>
              <FaArrowsRotate />
              <span>7 days Replacement</span>
            </div>

            <div className='extraItem'>
              <CiDeliveryTruck />
              <span>Free Delivery</span>
            </div>

            <div className='extraItem'>
              <GoShieldCheck />
              <span>{product.warrantyInformation || "No warranty"}</span>
            </div>

          </div>
          <table>
            <tbody>

              <tr>
                <th>Brand</th>
                <td>{product.brand}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{product.category}</td>
              </tr>

            </tbody>
          </table>

          <div className='about'>
            <h3>About this item</h3>
            <ul>
              <li>{product.description}</li>
            </ul>
          </div>

          <div className="product-reviews">      
           <h2>Customer Reviews</h2>
              {products.reviews.length > 0 ? (
              products.reviews.map((review, index) => (

                <div key={index} className="review">
                  <div className="user-info">
                    <FaUserCircle className="user-icon" />
                    <p><strong>{review.user}</strong></p>
                  </div>
                <p>{review.comment}</p>

                <div className="star-rating">
                  {[...Array(5)].map((_, i) => {
                    if (i < review.rating) {
                    return <span key={i} className="star filled">★</span>;
                  }
                  return <span key={i} className="star">★</span>;
                    })}
                  </div>
          <span>{`Rating: ${review.rating} / 5`}</span>
          </div>
          ))
            ) : (
                <p>No reviews yet</p>
            )}
        </div> 
        </div>
        <div className='productPurchaseInfo'>

        <div className='exchange'>
          <p>With Exchange<br />
              <span className='span1'>Up to Rs. {((product.price - product.price / 10) * 6).toFixed(2)} off</span>
          </p>
          <input type='radio' name='exchange'checked={isExchange}onChange={() => setIsExchange(true)}/> 
        </div>

          <div className='exchange'>
            <p>Without Exchange<br />
            <span className='span2'>Rs. {(product.price*6).toFixed(2)}</span>
            <span className='span3'>Rs. {(product.price / (1 - product.discountPercentage / 100)*6).toFixed(2)}</span></p>
            <input type='radio' />
          </div>
          
          <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          <button onClick={(e) => {e.stopPropagation();
          addToCart(product.id);
          navigate('/cart');
          }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage