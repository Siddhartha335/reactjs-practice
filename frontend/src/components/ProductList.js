import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProductList = ()=> {
    const [product, setProduct] = useState([])
    useEffect(()=> {
        getProducts();
    },[])

    const getProducts =async ()=> {
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setProduct(result);
    }
    
    const deleteProduct =async (id)=> {
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"delete",
            headers:{
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if(result) {
            getProducts();
        }

    }

    const searchHandle = async (event)=> {
        let key = event.target.value;
        if(key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            result = await result.json();
            if(result) {
                setProduct(result);
            }
        } else {
            getProducts();
        }
        
    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input 
            onChange={searchHandle}
            className="searchProduct" type="text" placeholder="Search your product" />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                product.length>0 ? product.map((item,index)=> 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={()=> deleteProduct(item._id)}>Delete</button>
                            <Link className="linkUpdate" to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ) :
                <h2>No result found!</h2>
            }
        </div>
    )
}

export default ProductList;