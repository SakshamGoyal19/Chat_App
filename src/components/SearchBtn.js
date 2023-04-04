import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBtn = (props) => {

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

  const [list, setList] = useState([]);

  useEffect(() => {
      axios.get("https://api.chatengine.io/chats/", {headers: header})
      .then((res) => setList(res.data))
  },[props.showStatusBar])

  const searchChatList = (key) => {
      props.setChatList(chatList => {
        return list.filter((x) => x.title.toLowerCase().includes(key.toLowerCase()))
    })
  }

  return (
    <div>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "21w", height: "4vh", margin: "0px 4px 10px 4px"}}>
            <InputBase onChange = {(e) => searchChatList(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.label}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    </div>
  )
}

export default SearchBtn