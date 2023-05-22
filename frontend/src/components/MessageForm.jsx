import React from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import {BsFillSendFill} from 'react-icons/bs';
import './css/MessageForm.css'

function MessageForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  }

  return (
    <div className="message-form-container">
      <div className="messages-window">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae sollicitudin risus. Curabitur eleifend commodo rutrum. Donec egestas mauris eu felis luctus, in sollicitudin lorem volutpat. Nunc in facilisis urna. Etiam ex libero, dignissim ut pretium commodo, hendrerit ac lacus. Sed ultricies magna ut risus mollis scelerisque. Nunc tortor nibh, suscipit in blandit non, iaculis ac risus. Aliquam at nisl non leo scelerisque tempus. Nullam condimentum molestie erat, in placerat sem fermentum sed. Donec viverra, urna eget congue ultrices, purus leo laoreet velit, id scelerisque lectus odio interdum odio. Curabitur sed finibus turpis. Aenean non tincidunt nibh, eget luctus eros. Praesent arcu eros, rhoncus a diam nec, scelerisque iaculis quam. Nunc laoreet nisl ut diam fringilla euismod. Nunc nec neque quis nulla efficitur efficitur vel id eros. 

Nulla ultrices elementum lacus, at pharetra lacus vestibulum viverra. Nullam vel nisi sit amet erat viverra congue. Proin commodo velit vel ullamcorper interdum. Donec laoreet auctor sagittis. Duis blandit cursus arcu nec imperdiet. Vivamus imperdiet bibendum enim vitae tempus. Sed id posuere ipsum. Duis iaculis sollicitudin tellus et sodales. Pellentesque scelerisque, enim eget placerat dapibus, risus felis volutpat nisi, eget consequat nisl risus vel sem. Curabitur in rutrum erat. Sed ipsum lorem, dignissim ac pulvinar eu, vestibulum ac lorem.

Vivamus imperdiet finibus ex sed vehicula. Sed eu sem vitae velit pellentesque sodales. Duis sed neque et purus vehicula cursus sed sit amet risus. Maecenas posuere enim ligula, ac venenatis turpis convallis vitae. Quisque non nisl quam. Donec varius nisi ipsum, id aliquet eros rhoncus at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ac velit vitae dui pellentesque mollis.

Integer mattis, est eu ullamcorper ultricies, lectus arcu tempus felis, id venenatis est dui vel ligula. Curabitur pretium magna lorem, id vulputate ex lobortis vel. Etiam commodo ut lorem a mollis. Morbi et elit felis. Duis eget tempus dolor, non volutpat ipsum. Morbi in nibh feugiat, luctus tellus nec, ullamcorper sapien. Praesent condimentum imperdiet sem sed tincidunt. Maecenas porttitor neque sed metus consequat vulputate.

Cras non tempor neque, ut convallis dolor. Curabitur in lacus vitae quam condimentum tempor in non lorem. Integer semper nunc non purus pulvinar posuere at a magna. Vestibulum id erat at dui viverra pulvinar. Fusce ut facilisis lectus, sed rhoncus arcu. Etiam blandit sapien vitae massa aliquet, non porttitor turpis euismod. Morbi nulla arcu, sagittis id dolor viverra, pharetra rutrum eros. Aenean at purus et magna finibus consequat. Nam eget arcu at nunc mattis ullamcorper. Suspendisse euismod, diam sed bibendum bibendum, libero felis congue lorem, feugiat pretium sem ante non ipsum. Praesent consectetur hendrerit pulvinar.</div>
      <Form onSubmit={handleSubmit}>
        <Row style={{width:"100%", margin:"auto"}}>
          <Col sm={11} style={{paddingRight:0}}>
            <Form.Group>
              <Form.Control type="text" placeholder="Type a message..."></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={1} >
            <Button type="submit" style={{backgroundColor:"blueviolet"}}><BsFillSendFill/></Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MessageForm;
