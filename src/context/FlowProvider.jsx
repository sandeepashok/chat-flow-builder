import { createContext, useState } from 'react'

export const FlowContext = createContext();

const initialNodes = [
  {
    id: '1', type: 'messageNode', position: { x: 250, y: 250 }, data: { label: 'Message' }
  }
]

const FlowProvider = ({ children }) => {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([])

  return (
    <FlowContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
      {children}
    </FlowContext.Provider>
  )
}

export default FlowProvider