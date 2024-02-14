'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetch(`https://api.github.com/users?per_page=${currentPage}`, {
      headers: {
        Authorization: 'token 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',
      },
    })
      .then((res) => res.json())
      .then((result) => setUsers(result))
      .catch((err) => console.log(err));
  }, [currentPage]);
  if (users.length < 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center text-center items-center m-2 p-2">
        <button
          className="p-2 bg-blue-300 text-black-300 rounded-lg m-1"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Current Page:{currentPage}</span>
        <button
          className="p-2 bg-blue-300 text-black-300 rounded-lg m-1"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        
      </div>
      {users &&
        users.length > 0 &&
        users.map((item) => {
          return (
            <Link key={item['id']} href={`/users/${item['login']}`}>
              <Image
                src={item && item['avatar_url'] ? item['avatar_url'] : ''}
                width={100}
                height={100}
                alt={item['login']}
              />

              {item['login']}
            </Link>
          );
        })}
    </div>
  );
}
