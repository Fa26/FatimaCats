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
        You can see my Github <a href="https://playful.software"> no to much interesting things</a>
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
       Github
        <br />
       
      </BottomRight>
    
      <VelvetBanana />
    </Container>
  )
}
