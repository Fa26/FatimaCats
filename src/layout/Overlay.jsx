import ChatBot from '../component'
import { Container, TopLeft, BottomLeft, BottomRight } from './styles'
import { VelvetBanana } from './VelvetBanana'
import { useState } from 'react'


export default function Overlay() {
  const [showChat, setShowChat] = useState(false);
  return (
    <Container>
      <TopLeft>
        <h1>
          Fatima 
          <br />
          Developer
        </h1>
        <p>Made with Cats and Fun —</p>
      </TopLeft>
      <BottomLeft>
        "Let everything happen to you: beauty and terror. Just keep going. No feeling is final."
      </BottomLeft>
      <BottomRight>

        <button onClick={() => setShowChat(!showChat)}>
          About Me!
        </button>
        {showChat && <ChatBot />}
        <br>
        </br>
        <a target="_blank" href="https://reactjs.org/">
        React Notes
        </a>
        <br></br>
        <a target="_blank" href="https://www.nordtheme.com/">
        Python + Flask
        </a>
        <br></br>
        <a target="_blank" href="https://www.nordtheme.com/">
       Creative
        </a>
      </BottomRight>
      <VelvetBanana />
    </Container>
  )
}
