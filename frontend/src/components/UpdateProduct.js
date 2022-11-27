import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = ()=> {

    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        getProductDetail();
    },[])

    const getProductDetail = async()=> {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct =async ()=> {
        console.warn(name,price,category,company);
        let result = await fetch (`http://localhost:5000/product/${params.id}`,{
            method:"Put", 
            body: JSON.stringify({name,price,category,company}),
            headers:{
                "Content-Type": "application/json",
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
                
            }
        })
        result = await result.json();
        console.warn(result);
        if(result) {
            navigate("/")
        }
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input 
            onChange={(e)=> {
                setName(e.target.value)
            }}
            value={name}
            type="text" placeholder="Enter your product name" 
            className="inputBox"/>
            

            <input 
            onChange={(e)=> {
                setPrice(e.target.value)
            }}
            value={price}
            type="text" placeholder="Enter your product price" 
            className="inputBox"/>
            

            <input 
            onChange={(e)=> {
                setCategory(e.target.value)
            }}
            value={category}
            type="text" placeholder="Enter your product category" 
            className="inputBox"/>
            

            <input 
            onChange={(e)=> {
                setCompany(e.target.value)
            }}
            value={company}
            type="text" placeholder="Enter your product company" 
            className="inputBox"/>
            

            <button 
            onClick={updateProduct}
            className="appButton" type="button">Update product</button>
        </div>
    )
}

export default UpdateProduct;