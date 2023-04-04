import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import List from './List';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classnames from 'classnames'
import { ChatListDiv, ChatListHead, ChatMessages, ChatMessageText, ChatPersonDiv, ChatScreenDiv,
     HomeDiv, LoadMessage, MessageDiv, NavDiv, NavTitle, SendMsgDiv } from '../css/CustomCss';
import SearchBtn from './SearchBtn';
import { addChatMessage, getChatList, getChatMessages, sendChatMessage, TypingStatus } from '../utils/apis';

let socket;

const Home = () => {

    // use states
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatID, setChatID] = useState("");
    const [chatList, setChatList] = useState([]);
    const [status, setStatus] = useState("offline")
    const [showStatusBar, setShowStatusBar] = useState(false)
    const [chatTitle, setChatTitle] = useState("");
    const [activeChatIndex, setActiveChatIndex] = useState(-1);
    const [isTyping, setIsTyping] = useState(true)
    const [typingFlag, setTypingFlag] = useState(false);
    const [lastSeen, setLastSeen] = useState("");
    const [showList, setShowList] = useState(false);

    // getting username and password form session storage
    const projectID = "b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf";
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    // scroll to bottom function called through use effect
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {

        // chat list is loaded when the component renders
        getChatList(setChatList);

        // creating a web socket
        socket = new WebSocket(
            `wss://api.chatengine.io/person/?publicKey=${projectID}&username=${username}&secret=${password}`
        )

        // this function is triggered whenever a event is sent or received from the component
        socket.onmessage = (event) => {
            const cid = JSON.parse(event.data)?.data?.id
            const action = JSON.parse(event.data)?.action
            const person=JSON.parse(event.data)?.data?.person

            // if a new chat is created
            if(action === "new_chat"){
                getChatList(setChatList);
            }

            // if sender is typing
            else if(action === "is_typing"){
                if (person !== username){
                    setChatID(chatID => {
                        if(chatID === cid){
                            setTypingFlag(true);
                            setTimeout(() => {
                                setTypingFlag(false);
                            },3000)
                        }
                        return chatID
                    })
                }
            }

            // extracting sender, message and message id form the event
            const text = JSON.parse(event.data)?.data?.message?.text
            const user = JSON.parse(event.data)?.data?.message?.sender_username
            const mid = JSON.parse(event.data)?.data?.message?.id

            // if some text is passed to the api then add it to the chat messages
            if(text !== undefined){
               addChatMessage(user, text, cid, mid, setChatID, setMessages, setLastSeen);
            }

            // updating last seen
            else{
                setChatID(chatID => {
                    if(chatID === cid){
                        JSON.parse(event.data)?.data?.people?.map((x) => {
                            x.person.username !== username && setLastSeen(x.last_read);
                        })
                    }
                    return chatID
                })
            }
        }
    },[]) 

    // logout and redirect to the login page
    const navigate = useNavigate();

    const logout = () => {
        
        socket.close();
        sessionStorage.clear();
        navigate("/");
    }

    // sending message on enter key press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendChatMessage(chatID, setInputText, inputText);
            setInputText("")
        }
    };

  return (

    <HomeDiv>

        <ChatListDiv>

            <ChatListHead>
                <h2 style={{textAlign: "center"}}>Chat List</h2>
                <LogoutIcon sx={{cursor: "pointer"}} onClick={logout}>Logout</LogoutIcon>
            </ChatListHead>

            <SearchBtn label={"Search chats"} chatTitle={chatTitle} showStatusBar={showStatusBar} setChatList={setChatList}/>

            {chatList && chatList.map((chat, i ) => {
                return <ChatPersonDiv className={classnames({
                    'active': i == activeChatIndex
                    })} key={chat.id} onClick={() => {
                    getChatMessages(chat.id, setChatID, showStatusBar, setShowStatusBar, setShowList, setMessages, setLastSeen, setStatus)
                    setChatTitle(chat.title)
                    setActiveChatIndex(i)
                }}>{chat.title}
                </ChatPersonDiv>
            })}

            <AddCircleIcon sx={{position: "absolute", right: 20, bottom:20, height: 50, width: 50, cursor: "pointer"}} onClick={() => {
                setShowList(true)
                setShowStatusBar(false)
                }} >Add Chat
            </AddCircleIcon>

        </ChatListDiv>

        <ChatScreenDiv>

        {showList && <><h2 style={{textAlign: "center", margin: "4vh"}}>Select an option</h2>
        <List setChatList={setChatList} setChatTitle={setChatTitle} setShowList={setShowList} setShowStatusBar={setShowStatusBar}
        showStatusBar={showStatusBar} setChatID={setChatID} setMessages={setMessages} setLastSeen={setLastSeen} setStatus={setStatus}/></>}
            
        {!showStatusBar && !showList && <LoadMessage>
            <h1><h3>Chat Assistant</h3></h1>
            <h3>Please select a chat or create a new one!</h3>
            </LoadMessage> 
        }
        
       {showStatusBar && <NavDiv>
           <NavTitle>
                <AccountCircleIcon fontSize={"large"}/>
                <div>
                <h2 style={{margin: 0}}>{chatTitle}</h2>
                {typingFlag && <text>typing...</text>}
                </div>
                <p>{status}</p>
           </NavTitle>

           {/* <SearchBtn label={"Search messages"}/> */}

        </NavDiv>}


       {showStatusBar && <MessageDiv>
    
          {messages && messages.map((msg) => {
            if(msg.sender_username !== username){
                return <ChatMessages key={msg.id} style={{backgroundColor: "#F2F3F1", marginRight: "40vw"}}>
                    <b>{msg.sender_username}</b>
                    <ChatMessageText>
                        <text>{msg.text}</text>
                        <text>{new Date(msg.created).toString().slice(16,21)}</text>
                    </ChatMessageText>
                    </ChatMessages>
            }
            else{
                return <><ChatMessages key={msg.id} style={{backgroundColor: "#E8E8E8", marginLeft: "40vw"}}>
                    <b>{msg.sender_username}</b>
                    <ChatMessageText>
                        <text>{msg.text}</text>
                    </ChatMessageText>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <text>{new Date(msg.created).toString().slice(16,21)}</text>
                        {msg.id <= lastSeen && <DoneAllIcon color="primary">seen</DoneAllIcon>}
                        {msg.id > lastSeen && <DoneAllIcon >seen</DoneAllIcon>}
                    </div>
                    </ChatMessages>
                    </>
                }
          })}
          <div ref={messagesEndRef} />
          
       </MessageDiv>}

       {showStatusBar && <SendMsgDiv>
        <TextField id="outlined-basic" label="Type a message..." placeholder={"Type a message..."} variant="outlined"
            sx={{width: "60vw", backgroundColor: "white"}}
            onChange={(e) => {
                TypingStatus(isTyping, setIsTyping, chatID);
                setInputText(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            value={inputText}
            />
        <SendIcon fontSize={"large"} sx={{cursor: "pointer"}} onClick={() => sendChatMessage(chatID, setInputText, inputText)} >send</SendIcon>
       </SendMsgDiv>}
        
       </ChatScreenDiv>

    </HomeDiv>
  )
}

export default Home