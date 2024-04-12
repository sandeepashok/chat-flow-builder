import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import { Panel } from 'reactflow'
import { FlowContext } from '../context/FlowProvider'
import { Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavPanelContainer = styled(Panel)`
  width: 100%;
  height: 60px;
  margin: unset;
  padding-left:0;
  background-color: #F3F3F3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Div = styled.div``

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SaveButton = styled.button`
  cursor: pointer;
  width: 130px;
  padding: 8px 16px;
  color: #676EA6;
  font-weight: 700;
  border: 2px solid #676EA6;
  border-radius: 5px;
  margin-right: 140px;
  &:active{
    color: white;
    background-color: #676EA6;
  }
  @media (max-width: 425px ) {
    margin-right: 75px;
  }
`

const NavPanel = () => {

  const { nodes, edges } = useContext(FlowContext)

  const areAllnodesConnected = () => {
    for (let i = 0; i < nodes.length; i++) {
      const index = i;
      const node = nodes[i];
      if (index === 0) {
        const sourceEdgeConnected = edges.find(edge => edge.source === node.id);
        if (!sourceEdgeConnected) {
          return false;
        }
      } else {
        const isConnected = edges.find(edge => edge.target === node.id);
        // console.log({ isConnected, node, index })
        if (!isConnected) return false
      }
    }
    return true
  }

  const handleSave = () => {
    if (!areAllnodesConnected()) {
      toast.error('Flow Not Saved!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } else {
      toast.success("Flow Saved!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  }

  return (
    <>
      <NavPanelContainer position="top-left">
        <Div></Div>
        <ButtonGroup>
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </ButtonGroup>
      </NavPanelContainer>
      <ToastContainer />
    </>
  )
}

export default NavPanel