import React from 'react';
import {Link} from "react-router-dom";

const CardCompact = ({blog, index}) => {
    const dateOptions = {month: 'short', day: 'numeric'};

    return (
        <div className={'flex gap-4'}>
            <span className={'text-4xl text-extremelightGray font-extrabold'}>{index}</span>
            <div className={''}>
                <Link to={`/user/${blog.author.id}`} className={'flex items-center gap-3 mb-2'}>
                    {/*    author details */}
                    <span className={'text-lightGray'}>{blog.author.username}</span>
                </Link>
                <Link to={`/blog/${blog._id}`}>
                    <h3 className={'text-2xl mb-2'}>{blog.content.title}</h3>
                </Link>
                <div className={'flex gap-4 items-center whitespace-nowrap text-lightGray'}>
                    <span>{new Date(blog.updatedAt).toLocaleDateString('en-us', dateOptions)}</span>
                    <span>{blog.meta.readTime} min read</span>
                    <Link to={`/posts?q=${blog.keywords[0]}`}
                          className={' rounded-full px-6 py-1 ml-4 text-sm cursor-pointer bg-extremelightGray2 shadow-sm whitespace-nowrap'}>{blog.keywords[0]}</Link>
                </div>
            </div>
        </div>
    );
};

export default CardCompact;