import { Fragment } from 'react';
import Select from 'react-select';

import { INITIAL_MSG_STATE } from '../initialMsgState';

function Form({
  fetchMessages,
  setIsSender,
  setMsgInfo,
  msgInfo,
  isSender,
  statusInfo,
  sendMessage,
  messages,
}) {
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
          <button className='btn btn-primary mt-3 w-100' onClick={checkSender}>
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
      {messages && (
        <Fragment>
          <Select
            options={messages
              .map(msg => msg.sender)
              .filter((msg, i, ar) => ar.indexOf(msg) === i)
              .map(msg => ({ label: msg }))}
            placeholder='Recipient'
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
          <button className='btn btn-primary mt-3 w-100' onClick={sendMessage}>
            Send Message
          </button>
          <p>{statusInfo}</p>
        </Fragment>
      )}
    </form>
  );
}

export default Form;
