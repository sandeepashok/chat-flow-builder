import styled from "@emotion/styled"
import Flow from "./components/Flow"

const AppContainer = styled.div`
 height: 100vh;
 width: 100vw;
`

const App = () => {
  return (
    <AppContainer>
      <Flow />
    </AppContainer>
  )
}

export default App