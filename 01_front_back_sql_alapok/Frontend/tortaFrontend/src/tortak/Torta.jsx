import { useState,useEffect } from "react"
const Torta=()=>{

    const [adatok,setAdatok]=useState([])

    const letoltes=async ()=>{
        let response=await fetch("http://localhost:3000/torta")
        let data=await response.json()
        //alert(JSON.stringify(data))
        setAdatok(data)
    }

    useEffect(()=>{
        letoltes()
    },[])

    return (
        <div className="keret">
            <p>Témák:</p>
            <div>
            {
                adatok.map((elem)=>(
                    <div key={elem.torta_id} className="piroska">
                        <p>{elem.torta_nev}</p>
                        <p>{elem.torta_szelet_ar} Ft</p>
                        <p>{elem.torta_szelet_db} Szeletes</p>
                        <p>{elem.tipus_nev} </p>

                        
                    </div>
                ))
            }
            </div>
        </div>
    )
}
export default Torta
