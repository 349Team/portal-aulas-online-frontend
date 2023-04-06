import React from "react";

function ComponenteUm({teste}) {
    return (
        <div className="componente">
           <img src={teste.thumbnail}/>
            <p>Título: {teste.title}</p>
        </div>
    )
}

export default ComponenteUm