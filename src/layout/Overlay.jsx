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
        About Me
        <br/>        
        <br />
        Machine Learning
        <br />
        Web + Three.js
        <br/>
        Stuffs
        <br />
       <a href="https://github.com/Fa26"  target="_blank" rel="noopener noreferrer">Github</a>
        <br />
       
      </BottomRight>
    
      <VelvetBanana />
    </Container>
  )
}
