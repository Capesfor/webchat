import { Head } from "next/document";
import { useState } from "react";
import { Socket } from "socket.io-client";
import userInput from "./userinput";
import UserInput from "./userinput";
 // create a template components

 export default function Chat ({socket,message,setMessage, input, setInput}: {socket: Socket,message: any,setMessage: any, input : any, setInput : any}) {

  socket?.on("create",(data: any) => {
    setMessage([...message,{user : "SERVER", msg : {post: data}}]);
    console.log(data);
  });

  socket?.on("leave",(data: any) => {
    setMessage([...message,{user : "SERVER", msg : {post: data}}]);
    console.log(data);
  });

  socket?.on("delete",(data: any) => {
    setMessage([...message,{user : "SERVER", msg : {post: data}}]);
    console.log(data);
  });

  socket?.on("join",(data: any) => {
    setMessage([...message,{user : "SERVER", msg : {post: data}}]);
  });

  socket?.on("list",(data: any) => {
    let tmp = "here is the list of rooms : ";
    console.log(data);
      if (data.length == 1) {
        tmp = `there is only ${data[0]} server`;
      } else {
      for (let i = 0; i < data.length; i++) {
        tmp += data[i] + ", ";
    }
  }
    setMessage([...message,{user : "server", msg : {post: tmp}}]);
    console.log(data);
  });

  socket?.on("users",(data: any) => {
    let tmp = "";
    if (data.length == 1) {
      
      console.log("data received " , data);
        tmp = `there is only you in this room`;
      } else {
      for (let i = 0; i < data.length; i++) {
        tmp += data[i] + ", ";
    }
    
  }
    setMessage([...message,{user : "SERVER", msg : {post: tmp}}]);
    console.log(data);
  });


  socket?.on("message",(data: any) => {
    //console.log(data);
    setMessage([...message,data]);
    socket?.emit("received");
  });
    socket?.on("create",(data: any) => {
        setMessage([...message,{user : "SERVER", msg : {post: data}}]);
        console.log(data);
      });
    
    return (
      <div className='chat'>
        <div className='user-chat'>
          <div className="user-chat-header">USER</div>
          <div className='messages text-black'>
          {message.map((p : any,index : number)=>(
        <li key={index}>from {p.user} : {p.msg.post}</li>
      ))}
          </div>
          <div className='input-area'>
          <UserInput socket={socket} message={message} setMessage={setMessage} input={input} setInput={setInput}/>
            {/* <input type="text" className='message-input text-black w-full'/>
            <button className='send bg-black' type='button'>send</button> */}
          </div>
        </div>
      </div>
    ) 
  };