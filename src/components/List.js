import React, { useState } from 'react'
import { questions } from "../constants/questions"
import { Button } from '@mui/material'
import { QuestionList, SelectedText, SolutionSteps } from '../css/CustomCss'
import { createChat } from "../utils/apis"

const List = (props) => {

  const {setChatList, setChatTitle, setShowList, setShowStatusBar, showStatusBar, setChatID, setMessages, setLastSeen, setStatus} = props;

    const [premsg, setPremsg] = useState([
      
      questions.map((ques)=>{
          return <QuestionList onClick={() => showList(ques)}>{ques[0]}</QuestionList>
      })])

    const showList = (ques) => {

      const selectedMsg = <SelectedText>{ques[0]}</SelectedText>
      const addedMsg = addList(ques)
      setPremsg(premsg => [...premsg, selectedMsg, addedMsg])
    }

    const addList = (ques) => {

      if(typeof(ques[1][1]) != "string"){
          return ques[1].map((x)=>{
              return <QuestionList onClick={() => showList(x)}>{x[0]}</QuestionList>
          })
      }
      else{
        return <SolutionSteps>
          <h3>Steps :</h3>
          <ul>
              {ques[1].map((x) => <li>{x}</li>)}
          </ul>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <h3>Have other doubts?</h3>
            <Button variant='outlined' sx={{backgroundColor: "white", marginRight: 4}}
            onClick={() => createChat(setChatList, setChatTitle, setShowList, setShowStatusBar, showStatusBar, setChatID, setMessages, setLastSeen, setStatus)}>
              Chat with Agent</Button>
          </div>
          </SolutionSteps>
      }
    }

    return (
      <div style={{padding: "2vh 6vw"}}>
        {premsg.map((ques) => ques)}
      </div>
    )
}

export default List