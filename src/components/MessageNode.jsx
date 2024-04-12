import styled from "@emotion/styled"
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Handle, Position } from "reactflow";
import whatsapplogo from '../../public/assets/whatsapp-icon.svg'
import { useContext } from "react";
import { FlowContext } from "../context/FlowProvider";

const MessageNodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  height: 100px;
  width: 350px;
`

const MessageHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #B1F0E3;
  border-radius: 10px 10px 0 0;
  height: 35px;
`

const MessageLogo = styled(BiMessageRoundedDetail)`
  font-size: 16px;
  padding: 2px 6px 2px 0px;
`

const Heading = styled.b`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 19px;
  padding: 8px 16px;
`

const LogoSection = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 4px 16px 4px 4px;
`

const WhatsappLogo = styled.img`
  height: 15px;
  width: 15px;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 65px;
  background-color: white;
  border-radius: 0 0 10px 10px;
`

const Message = styled.p`
  font-size: 18px;
  margin: 18px;
`

const MyHandle = styled(Handle)`
  height: 8px;
  width: 8px;
`

const MessageNode = (props) => {
  const { nodes } = useContext(FlowContext)
  const { data: { label }, id } = props
  // Getting first message node to make it input node
  let isFirst = nodes && nodes.length > 0 && id === nodes[0].id
  return (
    <MessageNodeContainer>
      {
        isFirst ? <MyHandle type="source" position={Position.Right} />
          : <MyHandle type="target" position={Position.Left} />
      }
      <MessageHeadingContainer>
        <Heading><MessageLogo />Send Message</Heading>
        <LogoSection>
          <WhatsappLogo src={whatsapplogo} alt="whatsapp logo" />
        </LogoSection>
      </MessageHeadingContainer>
      <MessageContainer>
        <Message>{label}</Message>
      </MessageContainer>
      {!isFirst && <MyHandle type="source" position={Position.Right} />}
    </MessageNodeContainer>
  )
}

export default MessageNode