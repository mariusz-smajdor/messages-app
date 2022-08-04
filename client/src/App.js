import { Fragment, useState } from 'react';

function App() {
  const [isSender, setIsSender] = useState(false);
  const [msgInfo, setMsgInfo] = useState({
    sender: '',
    recipient: '',
    title: '',
    message: '',
  });

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

  return (
    <form className=' container-sm mt-5 bg-light rounded shadow px-3 py-5'>
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
        <h2>{msgInfo.sender}, send a message.</h2>
      )}
      {isSender && (
        <Fragment>
          <input
            name='recipient'
            className='form-control mt-3'
            placeholder='Recipient'
            type='text-area'
            onChange={handleChange}
          />
          <input
            name='title'
            className='form-control mt-3'
            placeholder='Title'
            onChange={handleChange}
          />
          <textarea
            name='message'
            className='form-control mt-3'
            placeholder='Message'
            onChange={handleChange}
            rows='10'
          />
          <button className='btn btn-primary mt-3 w-100'>Send Message</button>
        </Fragment>
      )}
    </form>
  );
}

export default App;
