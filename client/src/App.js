import { Fragment, useState } from 'react';
import axios from 'axios';

const initalMsgState = {
  sender: '',
  recipient: '',
  title: '',
  message: '',
};

function App() {
  const [isSender, setIsSender] = useState(false);
  const [msgInfo, setMsgInfo] = useState(initalMsgState);
  const [info, setInfo] = useState('');

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
    if (msgInfo.sender.length) {
      setIsSender(true);
    }
  }

  function changeSender() {
    setIsSender(false);
    setMsgInfo(initalMsgState);
  }

  async function sendMessage(e) {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/message', {
        msgInfo,
      });
      setInfo(res.data);
    } catch (err) {
      setInfo(err);
    }
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
      {isSender && (
        <Fragment>
          <input
            name='recipient'
            className='form-control mt-3'
            placeholder='Recipient'
            type='text-area'
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
          <button className='btn btn-primary mt-3 w-100' onClick={sendMessage}>
            Send Message
          </button>
        </Fragment>
      )}
      <p>{info}</p>
    </form>
  );
}

export default App;
