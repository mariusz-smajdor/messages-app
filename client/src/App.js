import { Fragment, useState } from 'react';

import { useMessages } from './hooks/useMessages';
import { INITIAL_MSG_STATE } from './initialMsgState';

function App() {
  const [isSender, setIsSender] = useState(false);

  const {
    fetchMessages,
    sendMessage,
    setMsgInfo,
    statusInfo,
    messages,
    msgInfo,
  } = useMessages();

  function handleChange(e) {
    const { name, value } = e.target;

    setMsgInfo(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function checkSender(e) {
    e.preventDefault();
    fetchMessages();

    setIsSender(true);
  }

  function changeSender() {
    setIsSender(false);
    setMsgInfo(INITIAL_MSG_STATE);
  }

  return (
    <Fragment>
      <form className='container-sm mt-5 bg-light rounded shadow px-3 py-5'>
        {!isSender ? (
          <Fragment>
            <h2>Your Username</h2>
            <input
              name='sender'
              className='form-control mt-3'
              placeholder='Your Username'
              onChange={handleChange}
            />
            <button
              className='btn btn-primary mt-3 w-100'
              onClick={checkSender}
            >
              Submit
            </button>
          </Fragment>
        ) : (
          <div className='d-flex justify-content-between'>
            <h2>{msgInfo.sender}, send a message.</h2>
            <button className='btn btn-dark' onClick={changeSender}>
              Change User
            </button>
          </div>
        )}
        {isSender && (
          <Fragment>
            <input
              name='recipient'
              className='form-control mt-3'
              placeholder='Recipient'
              onChange={handleChange}
              required
            />
            <input
              name='title'
              className='form-control mt-3'
              placeholder='Title'
              onChange={handleChange}
              required
            />
            <textarea
              name='message'
              className='form-control mt-3'
              placeholder='Message'
              onChange={handleChange}
              rows='10'
              required
            />
            <button
              className='btn btn-primary mt-3 w-100'
              onClick={sendMessage}
            >
              Send Message
            </button>
            <p>{statusInfo}</p>
          </Fragment>
        )}
      </form>
      {isSender && (
        <div className='container-sm my-5 bg-light rounded shadow px-3 py-5'>
          <h2>Your received messages</h2>
          {messages ? (
            messages
              .filter(msg => msg.recipient === msgInfo.sender)
              .map(msg => {
                return (
                  <div key={msg.id} className='border rounded p-3 my-3'>
                    <h3 className='border rounded p-3'>from: {msg.sender}</h3>
                    <h4 className='border rounded p-3'>Title: {msg.title}</h4>
                    <p className='border rounded p-3'>{msg.message}</p>
                  </div>
                );
              })
          ) : (
            <p>{statusInfo}</p>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default App;
