import { Fragment } from 'react';

import { useMessages } from './hooks/useMessages';
import Form from './components/Form';

function App() {
  const {
    fetchMessages,
    sendMessage,
    setMsgInfo,
    setIsSender,
    isSender,
    statusInfo,
    msgInfo,
    messages,
  } = useMessages();

  return (
    <Fragment>
      <Form
        fetchMessages={fetchMessages}
        sendMessage={sendMessage}
        setMsgInfo={setMsgInfo}
        setIsSender={setIsSender}
        isSender={isSender}
        statusInfo={statusInfo}
        msgInfo={msgInfo}
      />
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
