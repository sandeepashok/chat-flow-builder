import styled from '@emotion/styled'
import { Panel } from 'reactflow'
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from 'react';
import { FlowContext } from '../context/FlowProvider';

const SettingsPanelContainer = styled(Panel)`
  height: 100%;
  width: 400px;
  margin: unset;
  border-left: 1px solid #D9D9D9;
  background-color: #FFFFFF;
`

const MessageButton = styled.button`
  cursor: pointer;
  width: 130px;
  padding: 8px 16px;
  color: #676EA6;
  font-weight: bold;
  border: 2px solid #676EA6;
  border-radius: 5px;
  margin: 76px 16px 16px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  &:active{
    color: white;
    background-color: #676EA6;
  }
`
const MessageIcon = styled(BiMessageRoundedDetail)`
  font-size: 32px;
`

const NodeEditorContainer = styled.div`
  margin: 60px 0px 16px 0px;
  border-bottom: 1px solid #D9D9D9;
  padding-bottom: 8px;
`

const NodeEditorHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #D9D9D9;
`

const BackButton = styled(IoArrowBackOutline)`
  padding-left: 16px;
  cursor: pointer;
`

const NodeEditorHeading = styled.p`
  font-weight: bold;
`

const Div = styled.div`
  padding-left: 16px;
`

const EditNodeFieldContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`

const InputLabel = styled.label`
  align-self: flex-start;
  margin: 16px 16px 8px 16px;
  color: #a3a3a3;
`

const EditNodeField = styled.input`
  margin: 8px 16px;
  padding: 8px;
  height: 75px;
  width: 335px;
  outline: none;
  border: 1px solid #D9D9D9 ;
  border-radius: 5px;
`

const SaveButton = styled.button`
  align-self: flex-end;
  margin: 8px 16px;
  cursor: pointer;
  width: 130px;
  padding: 8px;
  color: white;
  font-weight: bold;
  border: 2px solid #676EA6;
  border-radius: 5px;
  background-color: #676EA6;
  &:hover{
    color: #676EA6;
    background-color: white;
  }
  @media (max-width: 425px ) {
    margin-right: 75px;
  }
`

const SettingsPanel = ({ selectedNode, setSelectedNode, setNodes }) => {

  const [editedLabel, setEditedLabel] = useState("");

  useEffect(() => {
    if (selectedNode !== null && selectedNode?.data?.label !== undefined) {
      setEditedLabel(selectedNode?.data?.label)
    }
  }, [selectedNode])

  // Function to initiate drag
  const onDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', 'someData');
    e.dataTransfer.effectAllowed = 'move';
  }

  // Handling message node edit and saving
  const handleLabelChange = (e) => {
    setEditedLabel(e.target.value)
  }
  const handleLabelUpdate = () => {
    if (!selectedNode) {
      return
    }
    setNodes(prevNodes => {
      return prevNodes.map(node => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { ...node.data, label: editedLabel } }
        } else {
          return node
        }
      })
    });
    setSelectedNode(null)
  }

  // Saving edited message on pressing enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLabelUpdate();
    }
  }

  return (
    <SettingsPanelContainer position="top-right">
      {selectedNode === null
        ?
        <MessageButton onDragStart={e => onDragStart(e)} draggable>
          <MessageIcon />
          Message
        </MessageButton>
        :
        <NodeEditorContainer>
          <NodeEditorHeadingContainer>
            <BackButton onClick={() => setSelectedNode(null)} />
            <NodeEditorHeading>Message</NodeEditorHeading>
            <Div></Div>
          </NodeEditorHeadingContainer>
          <EditNodeFieldContainer>
            <InputLabel htmlFor='message'>Text</InputLabel>
            <EditNodeField id='message' value={editedLabel} onChange={handleLabelChange} onKeyDown={handleKeyDown} />
            <SaveButton onClick={handleLabelUpdate}>Update</SaveButton>
          </EditNodeFieldContainer>
        </NodeEditorContainer>}
    </SettingsPanelContainer>
  )
}

export default SettingsPanel