import { Fragment } from 'react';

import { useMessages } from './hooks/useMessages';
import Form from './components/Form';
import Messages from './components/Messages';

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
        messages={messages}
      />
      {isSender && (
        <Messages
          messages={messages}
          msgInfo={msgInfo}
          statusInfo={statusInfo}
        />
      )}
    </Fragment>
  );
}

export default App;
