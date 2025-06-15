import React, { useState, useEffect, useRef } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Xin chào!Bạn muốn biết thông tin về bộ phim nào? Hãy nhập tên phim hoặc từ khóa.' }
  ]);
  const [input, setInput] = useState('');
  const [phimList, setPhimList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [pendingPhim, setPendingPhim] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/phim')
      .then(res => res.json())
      .then(data => {
        setPhimList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, minimized]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    // Các từ xác nhận 
    const yesWords = ['đúng', 'ok', 'ừ', 'ờ', 'yes'];
    const noWords = ['sai', 'ko', 'no', 'không', 'không phải'];

    // Nếu đang chờ xác nhận phim
    if (pendingPhim) {
      const inputLower = input.trim().toLowerCase();
      if (yesWords.includes(inputLower)) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: (
              <span>
                <b>{pendingPhim.ten}</b><br />
                {pendingPhim.moTa ? pendingPhim.moTa : 'Không có mô tả.'}
              </span>
            )
          }
        ]);
        setPendingPhim(null);
        setInput('');
        return;
      } else if (noWords.includes(inputLower)) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Bạn hãy nhập lại tên phim hoặc từ khóa khác nhé!' }
        ]);
        setPendingPhim(null);
        setInput('');
        return;
      }
    }

    setInput('');

    if (loading) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Đang tải dữ liệu phim, vui lòng chờ...' }
      ]);
      return;

      
    }
    
    const thankWords = ['cảm ơn', 'thank', 'thanks', 'thank you', 'cám ơn'];

    if (thankWords.some(word => input.trim().toLowerCase().includes(word))) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Rất vui được hỗ trợ bạn! Nếu bạn cần thêm gì, cứ nói nhé 😊' }
      ]);
      setInput('');
      return;
    }

    const keyword = input.trim().toLowerCase();
    const found = phimList.filter(
      phim =>
        phim.ten.toLowerCase().includes(keyword) ||
        (phim.moTa && phim.moTa.toLowerCase().includes(keyword))
    );

    setTimeout(() => {
      if (found.length === 0) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Xin lỗi, không tìm thấy phim phù hợp. Bạn hãy thử từ khóa khác nhé!' }
        ]);
      } else if (found.length === 1 && found[0].ten.toLowerCase() !== keyword) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: (
              <span>
                Bạn muốn tìm phim này phải không: <b>{found[0].ten}</b>?<br />
              </span>
            )
          }
        ]);
        setPendingPhim(found[0]);
      } else {
        setMessages(prev => [
          ...prev,
          ...found.slice(0, 3).map(phim => ({
            sender: 'bot',
            text: (
              <span>
                <b>{phim.ten}</b><br />
                {phim.moTa ? phim.moTa : 'Không có mô tả.'}
              </span>
            )
          }))
        ]);
      }
    }, 600);
  };

  return (
    <div className={`chatbox-container${minimized ? ' minimized' : ''}`}>
      <div className="chatbox-header">
        Cinema Chat
        <button
          className="chatbox-toggle-btn"
          onClick={() => setMinimized(m => !m)}
          aria-label={minimized ? "Mở rộng chat" : "Thu nhỏ chat"}
        >
          {minimized ? '▲' : '▼'}
        </button>
      </div>
      {!minimized && (
        <>
          <div className="chatbox-messages" ref={chatBoxRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {typeof msg.text === 'string' ? msg.text : msg.text}
              </div>
            ))}
          </div>
          <form className="chatbox-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Nhập tên phim hoặc từ khóa..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>Gửi</button>
          </form>
        </>
      )}
      <style>{`
        .chatbox-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 340px;
          max-width: 95vw;
          background: #181818;
          color: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          z-index: 2000;
          font-family: 'Segoe UI', Arial, sans-serif;
          transition: box-shadow 0.2s, width 0.2s;
        }
        .chatbox-container.minimized {
          height: auto !important;
          width: 220px;
          min-width: 120px;
          max-width: 60vw;
          box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        .chatbox-header {
          background: #e53935;
          color: #fff;
          padding: 1rem 2.5rem 1rem 1rem;
          border-radius: 18px 18px 0 0;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 1px;
          text-align: center;
          position: relative;
          user-select: none;
        }
        .chatbox-toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.13);
          border: none;
          color: #fff;
          font-size: 1.1rem;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chatbox-toggle-btn:hover {
          background: rgba(255,255,255,0.25);
        }
        .chatbox-container.minimized .chatbox-header {
          border-radius: 18px;
          padding: 1rem 2.5rem 1rem 1rem;
        }
        .chatbox-container.minimized .chatbox-messages,
        .chatbox-container.minimized .chatbox-input {
          display: none;
        }
        .chatbox-messages {
          padding: 1rem;
          flex: 1;
          overflow-y: auto;
          max-height: 320px;
          background: rgba(24,24,24,0.98);
        }
        .chat-msg {
          margin-bottom: 0.7rem;
          line-height: 1.5;
          word-break: break-word;
          max-width: 80%;
          display: inline-block;
          padding: 0.7em 1.1em;
          border-radius: 18px;
          font-size: 1rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          position: relative;
          background: #232733;
        }
        .chat-msg.user {
          background: linear-gradient(90deg, #ffe0e0 0%, #ffb199 100%);
          color: #e53935;
          text-align: right;
          align-self: flex-end;
          float: right;
          border-bottom-right-radius: 6px;
          border-bottom-left-radius: 18px;
          border-top-right-radius: 18px;
          border-top-left-radius: 18px;
        }
        .chat-msg.bot {
          background: linear-gradient(90deg, #232733 0%, #444857 100%);
          color: #fff;
          text-align: left;
          align-self: flex-start;
          float: left;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 18px;
          border-top-right-radius: 18px;
          border-top-left-radius: 18px;
        }
        .chatbox-input {
          display: flex;
          border-top: 1px solid #333;
          background: #222;
          border-radius: 0 0 18px 18px;
        }
        .chatbox-input input {
          flex: 1;
          border: none;
          padding: 0.8rem 1rem;
          border-radius: 0 0 0 18px;
          background: transparent;
          color: #fff;
          font-size: 1rem;
          outline: none;
        }
        .chatbox-input button {
          background: #e53935;
          color: #fff;
          border: none;
          padding: 0 1.2rem;
          border-radius: 0 0 18px 0;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chatbox-input button:disabled {
          background: #888;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .chatbox-container {
            right: 5px;
            bottom: 5px;
            width: 98vw;
          }
          .chatbox-container.minimized {
            width: 120px;
          }
        }
      `}</style>
    </div>
  );
}