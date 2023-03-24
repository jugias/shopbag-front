import React from "react";
import "./Paginado.css"

export default function Paginado({prodPerPage, allProducts, paginado}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allProducts/prodPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return(
        <nav className="navTotal">
            <ul>
            {pageNumbers && 
                pageNumbers.map((number)=>{
                    return(
                        <button className="number" key={number} onClick={()=> paginado(number)}>{number}</button>
                    )
            })}
            </ul>
        </nav>
    )
}