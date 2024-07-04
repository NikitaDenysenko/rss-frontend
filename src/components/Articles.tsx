'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './Articles.module.scss'

const Articles = () => {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_RSS_API}/posts`, {
                params: {
                    limit,
                    offset,
                },
            });
            setPosts(response.data.posts);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [limit, offset]);

    const handleNextPage = () => {
        if (offset + limit < total) {
            setOffset(offset + limit);
        }
    };

    const handlePreviousPage = () => {
        if (offset - limit >= 0) {
            setOffset(offset - limit);
        }
    };

    return (
        <div className={styles.postsContainer}>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <a href={post.link} key={post.id} target="_blank">
                        <li>{post.title}</li>
                    </a>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={offset === 0}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={offset + limit >= total}>
                    Next
                </button>
            </div>
        </div>
    );

}

export default Articles