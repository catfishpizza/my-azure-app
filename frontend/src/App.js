import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// あなたのAzure Backend APIのIPアドレス
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://4.157.181.45:8000'  // Azure Backend
  : 'http://localhost:8000';    // ローカル開発用

function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // APIからメッセージを取得
  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/`);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Error: APIとの接続に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // APIからユーザー一覧を取得
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + FastAPI アプリ（Azure版）</h1>
        
        <div style={{ margin: '20px' }}>
          <h2>Azure Backend API接続テスト</h2>
          <p>{loading ? '読み込み中...' : message}</p>
          <button onClick={fetchMessage} disabled={loading}>
            メッセージを再取得
          </button>
        </div>

        <div style={{ margin: '20px' }}>
          <h2>Azure からのユーザー一覧</h2>
          {loading ? (
            <p>読み込み中...</p>
          ) : (
            <ul style={{ textAlign: 'left' }}>
              {users.map(user => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
          <button onClick={fetchUsers} disabled={loading}>
            ユーザー一覧を再取得
          </button>
        </div>

        <div style={{ margin: '20px', fontSize: '14px', color: '#888' }}>
          <p>Backend: {API_BASE_URL}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
        </div>
      </header>
    </div>
  );
}

export default App;