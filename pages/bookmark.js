// pages/bookmarks.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      setBookmarks(savedBookmarks);
    }
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarks(updatedBookmarks);
  };

  return (
    <div>
      <h1>Your Bookmarked Universities</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <Link legacyBehavior href={`/university/${bookmark.id}`}>
                <a>{bookmark.name}</a>
              </Link>
              <button onClick={() => removeBookmark(bookmark.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
