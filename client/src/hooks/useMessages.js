import { useState } from 'react';
import axios from 'axios';

import { INITIAL_MSG_STATE } from '../initialMsgState';

export function useMessages() {
  const [statusInfo, setStatusInfo] = useState('');
  const [msgInfo, setMsgInfo] = useState(INITIAL_MSG_STATE);
  const [messages, setMessages] = useState(null);
  const [isSender, setIsSender] = useState(false);

  async function sendMessage() {
    try {
      const res = await axios.post('http://localhost:3001/message', {
        msgInfo,
      });
      setStatusInfo(res.data);
    } catch (err) {
      setStatusInfo(err);
    }
  }

  async function fetchMessages() {
    try {
      const res = await axios.get('http://localhost:3001/message');
      setMessages(res.data);
    } catch (err) {
      setStatusInfo(err);
    }
  }

  return {
    statusInfo,
    msgInfo,
    messages,
    isSender,
    setMsgInfo,
    setIsSender,
    sendMessage,
    fetchMessages,
  };
}
