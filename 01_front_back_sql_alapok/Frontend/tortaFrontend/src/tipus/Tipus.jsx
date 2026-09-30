import { useState,useEffect } from "react"
const Tipus=()=>{

    const [adatok,setAdatok]=useState([])

    const letoltes=async ()=>{
        let response=await fetch("http://localhost:3000/tipus")
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
            <select>
            {
                adatok.map((elem)=>(
                    <option key={elem.tipus_id}>{elem.tipus_nev}</option>
                ))
            }
            </select>
        </div>
    )
}
export default Tipus
