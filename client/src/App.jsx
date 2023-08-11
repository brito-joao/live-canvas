import { useEffect, useState } from 'react'
import './App.css'

import {io} from "socket.io-client";
const socket = io.connect("http://192.168.1.115:3000");


function App() {
  const [count, setCount] = useState(0)

  const [current_color, setCurrentColor] = useState("black");

  const [main_array , setMainArray] = useState([[]]);
  
  useEffect(()=>{
    socket.on("get-array",(server_array)=>{
      
      setMainArray(server_array);
      
      
    })
  },[main_array])
  function colorClick(e){
    setCurrentColor(e.target.style.backgroundColor);
    
  }
  function boardClick(e,index){
    console.log(e.target.style.backgroundColor,index)
    
    const new_array = [...main_array[0]]
    
    new_array[index]=current_color;
    setMainArray([new_array]);
    socket.emit("receive-array",[[new_array]])
    

    
  }
  

  
  return (
    <>
    <div>Live Drawing game</div>
    <div className='board'>
      
      {main_array[0].map((pixel_color,index)=>{
      return <div className='pixel' onClick={(e)=>{boardClick(e,index)}} style={{backgroundColor:pixel_color}} key={index}></div>
    })}
    </div>

    <Colors handleClick={(e)=>{colorClick(e)}} />
    </>
  )
}

function Colors({handleClick}){
  const color_array = ["black","white","green","blue","red","orange","brown","purple","yellow","pink","#ADD8E6"];

  const colors_list = color_array.map((color,index)=>{
    return <button style={{backgroundColor:color}} onClick={handleClick} key={index}></button>
  }) 
  return (
    <>{colors_list}</>
    
  )
}

export default App
