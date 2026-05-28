import {
  get,
  limitToLast,
  onChildAdded,
  onDisconnect,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
  set,
  update
} from 'firebase/database';
import { realtimeDatabase } from './firebase.js';

export function getChatId(firstUserId, secondUserId) {
  if (!firstUserId || !secondUserId || firstUserId === 'undefined' || secondUserId === 'undefined') {
    throw new Error('Cannot create chat because one user profile is missing its uid.');
  }

  return [firstUserId, secondUserId].sort().join('__');
}

export async function ensureUserProfile(user, displayName) {
  if (!user?.uid) {
    throw new Error('Cannot save profile without a Firebase uid.');
  }

  const userRef = ref(realtimeDatabase, `users/${user.uid}`);
  const snapshot = await get(userRef);
  const fallbackName = user.displayName || displayName || user.email?.split('@')[0] || 'New user';

  await update(userRef, {
    uid: user.uid,
    displayName: fallbackName,
    email: user.email,
    photoURL: user.photoURL || '',
    online: true,
    lastSeen: serverTimestamp(),
    createdAt: snapshot.exists() ? snapshot.val().createdAt : serverTimestamp()
  });
}

export function watchPresence(userId) {
  const statusRef = ref(realtimeDatabase, `users/${userId}`);
  update(statusRef, {
    online: true,
    lastSeen: serverTimestamp()
  });
  onDisconnect(statusRef).update({
    online: false,
    lastSeen: serverTimestamp()
  });
}

export function subscribeToUsers(currentUserId, callback) {
  const usersRef = ref(realtimeDatabase, 'users');

  return onValue(usersRef, (snapshot) => {
    const users = [];

    snapshot.forEach((childSnapshot) => {
      const user = {
        ...childSnapshot.val(),
        uid: childSnapshot.val()?.uid || childSnapshot.key
      };

      if (user.uid && user.uid !== 'undefined' && user.uid !== currentUserId) {
        users.push(user);
      }
    });

    callback(users.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || '')));
  });
}

export function subscribeToUserChats(userId, callback) {
  const userChatsRef = ref(realtimeDatabase, `userChats/${userId}`);

  return onValue(userChatsRef, async (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const chatIds = Object.keys(snapshot.val());
    const chatSnapshots = await Promise.all(
      chatIds
        .filter((chatId) => chatId && !chatId.includes('undefined'))
        .map(async (chatId) => {
        const chatSnapshot = await get(ref(realtimeDatabase, `chats/${chatId}`));
        return chatSnapshot.exists() ? { id: chatId, ...chatSnapshot.val() } : null;
      })
    );

    callback(
      chatSnapshots
        .filter(Boolean)
        .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0))
    );
  });
}

export async function createOrOpenPrivateChat(currentUser, recipient) {
  if (!currentUser?.uid || !recipient?.uid || recipient.uid === 'undefined') {
    throw new Error('This user profile is incomplete. Refresh the chat or ask the user to sign in again.');
  }

  const chatId = getChatId(currentUser.uid, recipient.uid);
  const chatRef = ref(realtimeDatabase, `chats/${chatId}`);
  const snapshot = await get(chatRef);

  if (!snapshot.exists()) {
    const chatPayload = {
      id: chatId,
      type: 'private',
      participants: {
        [currentUser.uid]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName || currentUser.email,
          photoURL: currentUser.photoURL || ''
        },
        [recipient.uid]: {
          uid: recipient.uid,
          displayName: recipient.displayName || recipient.email,
          photoURL: recipient.photoURL || ''
        }
      },
      participantIds: {
        [currentUser.uid]: true,
        [recipient.uid]: true
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: null
    };

    await set(chatRef, chatPayload);
    await update(ref(realtimeDatabase), {
      [`userChats/${currentUser.uid}/${chatId}`]: true,
      [`userChats/${recipient.uid}/${chatId}`]: true
    });
  }

  return chatId;
}

export function subscribeToMessages(chatId, callback) {
  const messagesRef = query(
    ref(realtimeDatabase, `messages/${chatId}`),
    orderByChild('createdAt'),
    limitToLast(80)
  );

  const messages = [];

  return onChildAdded(messagesRef, (snapshot) => {
    messages.push({ id: snapshot.key, ...snapshot.val() });
    callback([...messages]);
  });
}

export async function sendMessage(chatId, user, text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  const now = Date.now();
  const messageRef = push(ref(realtimeDatabase, `messages/${chatId}`));
  const messagePayload = {
    uid: user.uid,
    displayName: user.displayName || user.email,
    photoURL: user.photoURL || '',
    text: trimmedText,
    createdAt: now
  };

  await set(messageRef, messagePayload);
  await update(ref(realtimeDatabase, `chats/${chatId}`), {
    lastMessage: {
      text: trimmedText,
      uid: user.uid,
      createdAt: now
    },
    updatedAt: now
  });
}
