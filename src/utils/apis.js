import axios from 'axios';

// getting username and password form session storage
const projectID = "b7fe8748-3f5f-4f7f-9c54-70037f2b0fcf";
const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");

// header in json format to be passed in axios requests
const header = {
    "Project-ID": projectID,
    "User-Name": username,
    "User-Secret": password
}

// function to get the chat list
export  const getChatList = (setChatList) => {
    axios.get("https://api.chatengine.io/chats/", {headers: header})
    .then((res) => setChatList(res.data))
}

// function to add a message to a chat received from sender
export  const addChatMessage = (user, msg, cid, mid, setChatID, setMessages, setLastSeen) => {

    let temp = ""
    setChatID(chatID => {
        temp=chatID
        if(temp === cid){

            // updating the message list by adding a new message
            const date = new Date();
            setMessages(messages => [...messages, {"sender_username": user, "text": msg, "created": date.toString(),"id":mid}])
        
            // updating sender's last read
            axios.patch(`https://api.chatengine.io/chats/${cid}/people/`, {"last_read" : mid}, {headers: header})
            .then((res) => {
                res.data.people.map((x) => {
                    if(x.person.username !== username)
                        setLastSeen(x.last_read);
                    return ""
                })
            })
        }
        return temp
    })
    
}

// // function to create a new chat
export const createChat = (setChatList, setChatTitle, setShowList, setShowStatusBar, showStatusBar, setChatID, setMessages, setLastSeen, setStatus) => {

    axios.put("https://api.chatengine.io/chats/", {"usernames": ["agent"], "title": `Sample Chat ${Math.floor(Math.random() * 1000)}`, "is_direct_chat": false}, {headers: header})
    .then((res) => {
        setChatList(chatList => [...chatList, {"id": res.data.id, "title": res.data.title, "access_key": res.data.access_key}]);
        getChatMessages(res.data.id, setChatID, showStatusBar, setShowStatusBar, setShowList, setMessages, setLastSeen, setStatus);
        setChatTitle(res.data.title);
    })
    setShowStatusBar(true);
    setShowList(false);
}

// function to send chat message from our side
export const sendChatMessage = (id, setInputText, inputText) => {

    // can not send empty message
    if(inputText !== "")
        axios.post(`https://api.chatengine.io/chats/${id}/messages/`, {text: inputText}, {headers: header})
        .then((res) => setInputText(""))
}

// checking whether the sender is online or offline
const LineStatus = (setChatID, setStatus, username) => {
    setChatID((chatID) => {
        axios.get(`https://api.chatengine.io/chats/${chatID}/people/`, {headers: header})
        .then((res) => {
        res.data.map((x) => {
            if(x.person.username !== username)
                setStatus(x.person.is_online? "online" : "offline");
        })
    })
    return chatID
})}

// get the chat messages whenever a chat is clicked
export const getChatMessages = (id, setChatID, showStatusBar, setShowStatusBar, setShowList, setMessages, setLastSeen, setStatus) => {
        
    // checking online status after regular interval
    setChatID(id);
    if(showStatusBar === false){
        setInterval(() => {
            LineStatus(setChatID, setStatus, username);
        }, 4000)
    }
    setShowStatusBar(true)
    setShowList(false)

    // get messages and updating our last read
    axios.get(`https://api.chatengine.io/chats/${id}/messages/`, {headers: header})
    .then((res) => {
        setMessages(res.data)

        if(res.data.length > 0){
        const mid = res.data[res.data.length-1].id;
        axios.patch(`https://api.chatengine.io/chats/${id}/people/` ,{"last_read" : mid}, {headers: header})
        .then((res) => {
            res.data.people.map((x) => {
                if(x.person.username !== username)
                    setLastSeen(x.last_read);
                return ""
            })
        })}
    })
}

// checking the typing status of sender
export const TypingStatus = (isTyping, setIsTyping, chatID) => {
    if(isTyping){
        setIsTyping(false);
        axios.post(`https://api.chatengine.io/chats/${chatID}/typing/`, {}, {headers: header})
        setTimeout(() => {
            setIsTyping(true);
        },3000)
    }
}