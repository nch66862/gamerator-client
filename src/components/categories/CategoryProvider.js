import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [ categories, setCategories ] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getCategoryById = (CategoryId) => {
        return fetch(`http://localhost:8000/categories/${CategoryId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const createCategory = (Category) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Category)
        })
            .then(getCategories)
    }

    const modifyCategory = (Category) => {
        return fetch(`http://localhost:8000/categories/${Category.id}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Category)
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{ categories, getCategories, createCategory, getCategoryById, modifyCategory }} >
            { props.children }
        </CategoryContext.Provider>
    )
}