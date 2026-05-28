import {
  ArrowLeft,
  AtSign,
  LogOut,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseAuth } from '@hooks/useFirebaseAuth.js';
import { ROUTES } from '@routes/routePaths.js';
import {
  createOrOpenPrivateChat,
  sendMessage,
  subscribeToMessages,
  subscribeToUserChats,
  subscribeToUsers
} from '@services/chatService.js';

function getFirebaseErrorMessage(error) {
  const code = error?.code || '';

  if (code.includes('auth/invalid-credential')) {
    return 'Email or password is incorrect.';
  }

  if (code.includes('auth/email-already-in-use')) {
    return 'That email is already registered. Try signing in.';
  }

  if (code.includes('auth/weak-password')) {
    return 'Password should be at least 6 characters.';
  }

  if (code.includes('auth/popup')) {
    return 'Google sign-in popup was closed before finishing.';
  }

  return error?.message || 'Something went wrong. Please try again.';
}

function AuthPanel({ auth }) {
  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (mode === 'signup') {
        await auth.createAccount(formData.name, formData.email, formData.password);
      } else {
        await auth.signInWithEmail(formData.email, formData.password);
      }
    } catch (submitError) {
      setError(getFirebaseErrorMessage(submitError));
    }
  };

  const handleGoogle = async () => {
    setError('');

    try {
      await auth.signInWithGoogle();
    } catch (googleError) {
      setError(getFirebaseErrorMessage(googleError));
    }
  };

  return (
    <main className="chat-auth">
      <div className="chat-auth__halo" />
      <section className="chat-auth__panel">
        <Link className="chat-entry__back" to={ROUTES.HOME}>
          <ArrowLeft size={18} />
          Back to landing
        </Link>

        <div className="chat-entry__icon">
          <MessageCircle size={28} />
        </div>
        <p className="section-kicker">Realtime access</p>
        <h1>{mode === 'signup' ? 'Create your chat profile.' : 'Open your private chat space.'}</h1>
        <p>
          Sign in to start private conversations, see active users and test the
          realtime messaging foundation.
        </p>

        <div className="auth-toggle" aria-label="Authentication mode">
          <button className={mode === 'signin' ? 'is-active' : ''} onClick={() => setMode('signin')}>
            Sign in
          </button>
          <button className={mode === 'signup' ? 'is-active' : ''} onClick={() => setMode('signup')}>
            Create account
          </button>
        </div>

        <form className="chat-auth__form" onSubmit={handleSubmit}>
          {mode === 'signup' ? (
            <label>
              Display name
              <input
                autoComplete="name"
                name="name"
                onChange={handleChange}
                placeholder="Alex Rivera"
                required
                value={formData.name}
              />
            </label>
          ) : null}

          <label>
            Email
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={formData.email}
            />
          </label>

          <label>
            Password
            <input
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={6}
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              required
              type="password"
              value={formData.password}
            />
          </label>

          {error ? <p className="chat-error">{error}</p> : null}

          <button className="button-primary" disabled={auth.isSubmitting} type="submit">
            {auth.isSubmitting ? 'Working...' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button className="google-button" disabled={auth.isSubmitting} onClick={handleGoogle}>
          <AtSign size={18} />
          Continue with Google
        </button>
      </section>
    </main>
  );
}

function UserAvatar({ user, size = 'normal' }) {
  const initials = (user?.displayName || user?.email || '?')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return user?.photoURL ? (
    <img className={`chat-avatar chat-avatar--${size}`} src={user.photoURL} alt="" />
  ) : (
    <span className={`chat-avatar chat-avatar--${size}`}>{initials}</span>
  );
}

function getOtherParticipant(chat, currentUserId) {
  const participants = Object.values(chat?.participants || {});
  return participants.find((participant) => participant.uid !== currentUserId) || participants[0];
}

export function ChatPage() {
  const auth = useFirebaseAuth();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageDraft, setMessageDraft] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId),
    [activeChatId, chats]
  );
  const activeRecipient = useMemo(
    () => getOtherParticipant(activeChat, auth.user?.uid),
    [activeChat, auth.user?.uid]
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.displayName || ''} ${user.email || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users]
  );

  useEffect(() => {
    if (!auth.user) {
      return undefined;
    }

    const unsubscribeUsers = subscribeToUsers(auth.user.uid, setUsers);
    const unsubscribeChats = subscribeToUserChats(auth.user.uid, setChats);

    return () => {
      unsubscribeUsers();
      unsubscribeChats();
    };
  }, [auth.user]);

  useEffect(() => {
    if (!activeChatId) {
      return undefined;
    }

    return subscribeToMessages(activeChatId, setMessages);
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpenChat = async (recipient) => {
    if (!auth.user) {
      return;
    }

    const chatId = await createOrOpenPrivateChat(auth.user, recipient);
    setMessages([]);
    setActiveChatId(chatId);
  };

  const handleSelectChat = (chatId) => {
    setMessages([]);
    setActiveChatId(chatId);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!activeChatId || !auth.user || !messageDraft.trim()) {
      return;
    }

    await sendMessage(activeChatId, auth.user, messageDraft);
    setMessageDraft('');
  };

  if (!auth.isAuthReady) {
    return (
      <main className="chat-loading">
        <span />
        <p>Preparing realtime session...</p>
      </main>
    );
  }

  if (!auth.user) {
    return <AuthPanel auth={auth} />;
  }

  return (
    <main className="chat-app">
      <aside className="chat-sidebar">
        <div className="chat-sidebar__top">
          <Link className="chat-entry__back" to={ROUTES.HOME}>
            <ArrowLeft size={18} />
            Landing
          </Link>
          <button className="chat-icon-button" onClick={auth.signOutUser} aria-label="Sign out">
            <LogOut size={18} />
          </button>
        </div>

        <div className="chat-profile">
          <UserAvatar user={auth.user} />
          <div>
            <strong>{auth.user.displayName || 'Signed in user'}</strong>
            <span>{auth.user.email}</span>
          </div>
        </div>

        <div className="chat-search">
          <Search size={17} />
          <input
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Find people"
            value={searchTerm}
          />
        </div>

        <section className="chat-list-section">
          <div className="chat-list-section__heading">
            <span>Conversations</span>
            <MessageCircle size={16} />
          </div>
          <div className="chat-list">
            {chats.length ? (
              chats.map((chat) => {
                const participant = getOtherParticipant(chat, auth.user.uid);

                return (
                  <button
                    className={`chat-list-item ${activeChatId === chat.id ? 'is-active' : ''}`}
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                  >
                    <UserAvatar user={participant} size="small" />
                    <span>
                      <strong>{participant?.displayName || participant?.email}</strong>
                      <small>{chat.lastMessage?.text || 'Conversation ready'}</small>
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="empty-note">Start by selecting a user below.</p>
            )}
          </div>
        </section>

        <section className="chat-list-section">
          <div className="chat-list-section__heading">
            <span>People</span>
            <UserPlus size={16} />
          </div>
          <div className="chat-list">
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <button className="chat-list-item" key={user.uid} onClick={() => handleOpenChat(user)}>
                  <span className={`presence-dot ${user.online ? 'is-online' : ''}`} />
                  <UserAvatar user={user} size="small" />
                  <span>
                    <strong>{user.displayName || user.email}</strong>
                    <small>{user.online ? 'Online now' : 'Offline'}</small>
                  </span>
                </button>
              ))
            ) : (
              <p className="empty-note">No other users yet. Create another account to test private chats.</p>
            )}
          </div>
        </section>
      </aside>

      <section className="chat-room">
        {activeChat ? (
          <>
            <header className="chat-room__header">
              <div className="chat-room__identity">
                <UserAvatar user={activeRecipient} />
                <div>
                  <strong>{activeRecipient?.displayName || activeRecipient?.email}</strong>
                  <span>{activeRecipient?.email}</span>
                </div>
              </div>
              <span className="chat-room__badge">
                <Sparkles size={15} />
                Realtime
              </span>
            </header>

            <div className="message-stream">
              {messages.length ? (
                messages.map((message) => {
                  const isMine = message.uid === auth.user.uid;

                  return (
                    <article
                      className={`chat-message ${isMine ? 'chat-message--mine' : 'chat-message--theirs'}`}
                      key={message.id}
                    >
                      {!isMine ? <UserAvatar user={message} size="tiny" /> : null}
                      <div>
                        <p>{message.text}</p>
                        <time>
                          {message.createdAt
                            ? new Intl.DateTimeFormat('en', {
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(message.createdAt)
                            : 'Sending'}
                        </time>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="empty-chat">
                  <MessageCircle size={34} />
                  <h2>Start the conversation.</h2>
                  <p>Send the first message and watch it arrive in realtime.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="message-composer" onSubmit={handleSendMessage}>
              <input
                onChange={(event) => setMessageDraft(event.target.value)}
                placeholder={`Message ${activeRecipient?.displayName || 'user'}`}
                value={messageDraft}
              />
              <button aria-label="Send message" disabled={!messageDraft.trim()} type="submit">
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="chat-room__empty">
            <MessageCircle size={42} />
            <h1>Choose someone to message.</h1>
            <p>
              Conversations are private, persistent and synced through Firebase
              Realtime Database.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
