import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch(
        'http://headless-wordpress.local/wp-json/wp/v2/posts' // DEBE SER HTTPS
        // 'http://localhost:3000/wp-json/wp/v2/posts'
      );

      const posts = await response.json();
      setPosts(posts)

      console.log('posts', posts);
    } catch (err) {
      console.log('esto no funciona', err);
    } 
  }

  useEffect(() => {
    getPosts();
  }, []);


useEffect(() => {
  console.log('entra en el useefect')
  const interval = setInterval(() => {
    getPosts();
  }, 15000); 

  return () => clearInterval(interval);
}, []);


  return (
    <div className="App">
      <div>
      <h1>Posts de WordPress</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
