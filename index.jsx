import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./src/App"
import { ReactFlowProvider } from 'reactflow'
import FlowProvider from "./src/context/FlowProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <FlowProvider>
        <App />
      </FlowProvider>
    </ReactFlowProvider>
  </StrictMode>
)