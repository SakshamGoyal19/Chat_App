import styled from '@emotion/styled'

export const LoginForm = styled.form`
    display: grid;
    align-items: center;
    justify-content: center;
    height: 50vh;
    width: 26vw;
    border: 1px solid;
    box-shadow: 5px 10px rgb(197, 194, 194);
    border-radius: 10px;
    padding: 20px;
    margin-top: 20vh;
    margin-left: 37vw;
    `

export const RegisterForm = styled.form`
    display: grid;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 26vw;
    border: 1px solid;
    box-shadow: 5px 10px rgb(197, 194, 194);
    border-radius: 10px;
    padding: 20px;
    margin-top: 15vh;
    margin-left: 37vw;
    `

export const HomeDiv = styled.div`
    margin: 4.8vh 4.9vw;
    border: 0.1px solid gray;
    display: flex;
    `

export const ChatListDiv = styled.div`
    border: 0.1px solid gray;
    width: 22vw;
    height: 90vh;
    background-color: #DBDBDB;
    position: relative;
    `

export const ChatPersonDiv = styled.div`
    border: 0.1px solid gray;
    width: 20vw;
    padding: 2vh 1vw;
    font-weight: 700;
    cursor: pointer;
    `

export const ChatScreenDiv = styled.div`
    border: 0.1px solid gray;
    width: 68vw;
    height: 90vh;
    position: relative;
    overflow: auto;
    `

export const NavDiv = styled.div`
    border: 0.1px solid gray; 
    width: 64vw;
    height: 6.5vh;
    padding: 1vh 2vw; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #DBDBDB;
    `

export const MessageDiv = styled.div`
    width: 64vw;
    padding: 2vh 2vw;
    overflow: auto;
    height: 67vh;
    `

export const SendMsgDiv = styled.div`
    border: 0.1px solid gray; 
    width: 64vw;
    height: 5vh;
    padding: 2vh 2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #DBDBDB;
    position: absolute;
    bottom: 0;
    `

export const ChatMessages = styled.p`
    border: 1px solid gray;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    `

export const LoadMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25vh;
    width: 68vw;
    `

export const ChatListHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 8.5vh;
    `

export const NavTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 20vw;
    `
export const ChatMessageText = styled.div`
    display: flex;
    flexWrap: wrap;
    alignItems: center;
    justify-content: space-between;
    `

export const QuestionList = styled.div`
    border: 0.1px solid gray;
    width: 15vw;
    padding: 8px;
    background-color: #F2F3F1;
    margin-right: 40vw;
    font-weight: 500;
    cursor: pointer;
    `
export const SelectedText = styled.div`
    height: 4vh;
    border: 0.1px solid gray;
    width: 15vw;
    padding: 8px;
    background-color: #E8E8E8;
    margin-left: 38vw;
    font-weight: 500;
    `

export const SolutionSteps = styled.div`
    border: 0.1px solid gray;
    display:inline-block;
    width: 25vw;
    padding: 8px;
    background-color: #F2F3F1;
    margin-right: 40vw;
    flex-wrap: wrap;
    font-weight: 500;
    `


