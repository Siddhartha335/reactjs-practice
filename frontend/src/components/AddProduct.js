import React, { useState } from "react";

const AddProduct = ()=> {

    const [name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")
    const [error, setError] = useState(false)

    const submitProduct = async ()=> {   

        console.warn(!name);
        if(!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/addproduct",{
            method:"Post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers: {
                "Content-Type" : "application/json",
                authorization :`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        console.log(result);
        if(result) {
            name=""
            price=""
            category=""
            company=""
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
            {error && !name && <span className="invalid">Enter valid name!</span>
            }

            <input 
            onChange={(e)=> {
                setPrice(e.target.value)
            }}
            value={price}
            type="text" placeholder="Enter your product price" 
            className="inputBox"/>
            {error && !price && <span className="invalid">Enter valid price!</span>
            }

            <input 
            onChange={(e)=> {
                setCategory(e.target.value)
            }}
            value={category}
            type="text" placeholder="Enter your product category" 
            className="inputBox"/>
            {error && !category && <span className="invalid">Enter valid category!</span>
            }

            <input 
            onChange={(e)=> {
                setCompany(e.target.value)
            }}
            value={company}
            type="text" placeholder="Enter your product company" 
            className="inputBox"/>
            {error && !company && <span className="invalid">Enter valid company!</span>
            }

            <button 
            onClick={submitProduct}
            className="appButton" type="button">Add product</button>
        </div>
    )
}

export default AddProduct;