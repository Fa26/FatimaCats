import ChatBot from '../component'
import { Container, TopLeft, BottomLeft, BottomRight } from './styles'
import { VelvetBanana } from './VelvetBanana'


export default function Overlay() {
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
        Chat with Me!
        <br/>   
        <ChatBot />     
        <br />
     
       
      </BottomRight>
    
      <VelvetBanana />
    </Container>
  )
}
