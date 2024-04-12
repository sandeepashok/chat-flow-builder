import styled from '@emotion/styled'
import { useCallback, useContext, useRef, useState } from 'react'
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import 'reactflow/dist/style.css'
import NavPanel from './NavPanel'
import SettingsPanel from './SettingsPanel'
import MessageNode from './MessageNode'
import { FlowContext } from '../context/FlowProvider'
import uuid4 from 'uuid4'

const nodeTypes = { messageNode: MessageNode }

const FlowContainer = styled.div`
  height: 100%;
  width: 100%;
`

const Flow = () => {
  const { nodes, setNodes, edges, setEdges } = useContext(FlowContext);

  const flowContainerRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // used to select drag and remove nodes
  const onNodesChange = useCallback(changes => setNodes(nodes => applyNodeChanges(changes, nodes)), [setNodes]);

  // used to select drag and remove nodes
  const onEdgesChange = useCallback(changes => setEdges(edges => applyEdgeChanges(changes, edges)), [setEdges]);

  const onConnect = useCallback((params) => {
    // console.log(params, edges);
    // checking for edge conflict
    const conflict = edges.find(edge => edge.source === params.target && edge.target === params.source)
    if (!conflict) {
      setEdges((edges) => addEdge({ ...params }, edges))
    }
  }, [setEdges])

  // Drag Drop Feature

  // This function triggers when dragged over a drop target
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, [])

  // This function triggers when the item is dropped into flow instance, gets position, creates new dummy node and adds it to the nodes panel
  const onDrop = useCallback((e) => {
    e.preventDefault();

    const type = 'messageNode';

    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance.screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = {
      id: uuid4(),
      type,
      position,
      data: { label: "Message" },
    }

    setNodes(nodes => nodes.concat(newNode))

  }, [reactFlowInstance])

  const onNodeClick = useCallback((e, node) => {
    e.preventDefault();
    setSelectedNode(node)
  }, []);

  return (
    <FlowContainer ref={flowContainerRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
      >
      </ReactFlow>
      <SettingsPanel selectedNode={selectedNode} setSelectedNode={setSelectedNode} setNodes={setNodes} />
      <NavPanel />
    </FlowContainer>
  )
}

export default Flow