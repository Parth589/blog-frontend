import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Input from "../components/Input.jsx";
import Navbar from "../components/Navbar.jsx";
import {Context} from "../App.jsx";
import showdown from "showdown";
import dompurify from "dompurify";


const Edit = () => {
    const [formPageState, setFormPageState] = useState(0);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [keywords, setKeywords] = useState('')
    const [thumbnail_link, setThumbnail_link] = useState('')
    const [brief, setBrief] = useState('')
    const [isPreview, setPreview] = useState(false);
    const [queryParams, setQueryParams] = useSearchParams();
    const {isLoggedIn, fetchData, showNotification} = useContext(Context);

    const converter = new showdown.Converter();
    const effect = async () => {

        if (!queryParams.get('id')) {
            return setQueryParams({
                new: true
            })
        } else if (queryParams.get('id') && queryParams.get('new')) {
            queryParams.delete('new');
            setQueryParams(queryParams);
        }
        if (!queryParams.get('new')) {
            const id = queryParams.get('id');
            if (id) {
                //     make api call to get blogs data
                const {success, data, msg} = await fetchData(`/api/v1/blog/${id}`);
                if (!success) {
                    console.error(`Post not found ${{id}}`);
                    console.error(msg);
                    return
                }
                //     update states according to that data
                setTitle(data.content.title);
                setContent(converter.makeMd(data.content.post));
                setKeywords(data.keywords.toString());
                setThumbnail_link(data.thumbnail_link);
                setBrief(data.content.brief);
            }
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        effect();
    }, []);
    const handlePublishClick = async (e) => {
        e.preventDefault()
        if (formPageState === 0) {
            return setFormPageState(1);
        }
        //     publish the blog
        console.log('publish....');
        if (queryParams.get('new')) {
            const {success, msg, data} = await fetchData('/api/v1/auth/blog/create', 'POST', {
                title: title,
                keywords: keywords.split(','),
                content: content,
                thumbnail_link: thumbnail_link,
                brief: brief
            })
            if (!success) {
                showNotification(msg);
            } else {
                showNotification('post created successfully');
                navigate(`/blog/${data._id}`);
            }
        } else {
            const {success, data, msg} = await fetchData(`/api/v1/auth/blog/update/${queryParams.get('id')}`, 'PUT', {
                title: title,
                keywords: keywords.split(','),
                content: content,
                thumbnail_link: thumbnail_link,
                brief: brief
            })
            if (!success) {
                showNotification(msg);
            } else {
                showNotification('post created successfully');
                navigate(`/blog/${data._id}`);
            }
        }
    }

    const getSanitizedHTML = () => {
        return dompurify.sanitize(converter.makeHtml(content));
    }
    return (
        <div className={'h-screen flex flex-col'}>
            <Navbar isLoggedIn={isLoggedIn} isHomepage={false}/>
            <main className="h-full flex flex-col items-center justify-center">
                <div className={`${formPageState === 0 ? 'flex' : 'hidden'} justify-end gap-5 w-full px-10`}>
                    <button onClick={() => {
                        setPreview(prevState => !prevState);
                    }}
                            className={`${isPreview ? 'outline outline-2 outline-black outline-offset-4 bg-black' : 'bg-darkGray'} text-sm font-sans tracking-wide px-4 py-1 rounded-full  text-white mt-5 hover:bg-slate-700 transition-colors`}>
                        Preview
                    </button>
                    <button onClick={() => {
                        setFormPageState(1);
                    }}
                            className="text-sm font-sans tracking-wide px-4 py-1 rounded-full bg-green text-white mt-5 hover:bg-green-700 transition-colors">
                        Publish
                    </button>
                </div>
                <form className="flex flex-col items-start px-5 font-serif2 h-full relative max-w-6xl w-full"
                      onSubmit={handlePublishClick}>

                    <div className="px-3 md:px-20 h-full w-full">
                        {(isPreview && formPageState !== 1) ? (
                            <div className={'prose prose-xl font-sans'}
                                 dangerouslySetInnerHTML={{__html: getSanitizedHTML()}}>

                            </div>
                        ) : (
                            <>

                                <div id={'form--page1'}
                                     className={`${formPageState !== 0 && 'hidden'} h-full flex flex-col`}>

                                    <input type="text" placeholder="Title" value={title} onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                           className="bg-inherit w-full text-5xl font-medium focus:outline-none focus:border-none py-3"/>
                                    <textarea onKeyDown={(e) => {
                                        if(e.key==='`'){
                                            e.preventDefault();
                                            setContent(prevState => prevState+'`');
                                            return;
                                        }
                                        if (e.key === 'Tab' && !e.shiftKey) {
                                            e.preventDefault();
                                            const value = e.target.value;
                                            const selectionStart = e.target.selectionStart;
                                            const selectionEnd = e.target.selectionEnd;
                                            setContent(
                                                value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd));
                                            e.target.selectionStart = selectionEnd + 2 - (selectionEnd - selectionStart);
                                            e.target.selectionEnd = selectionEnd + 2 - (selectionEnd - selectionStart);
                                        }

                                    }} placeholder="Tell your story..." value={content} onChange={(e) => {
                                        setContent(e.target.value)
                                    }}
                                              className="bg-inherit resize-none w-full h-full mb-7 text-2xl tracking-wide focus:outline-none focus:border-none"></textarea>

                                </div>

                                <div id="form--page2"
                                     className={`${formPageState !== 1 && 'hidden'} w-full h-full grid place-content-center inset-0 font-sans bg-white`}>
                                    <div className="flex flex-col gap-5 max-w-lg">

                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="th_link">Thumbnail link</label>
                                            <input type="text" value={thumbnail_link} onChange={(e) => {
                                                setThumbnail_link(e.target.value)
                                            }}
                                                   className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2 placeholder:text-sm"
                                                   id="th_link"
                                                   placeholder="eg. https://unsplash.com/photos/MBRrXdf8iSQ "/>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="Keywords">Keywords (* comma separated)</label>
                                            <input type="text" value={keywords} onChange={(e) => {
                                                setKeywords(e.target.value)
                                            }}
                                                   className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2"
                                                   placeholder="eg. coding, technology, communication" id="Keywords"/>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="brief">summarize the post in few words</label>
                                            <textarea value={brief} onChange={(e) => {
                                                setBrief(e.target.value)
                                            }}
                                                      className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2 resize-none"
                                                      placeholder="eg. How we are going to take over the mars"
                                                      id="brief"/>
                                        </div>
                                        <Input type={'submit'} content={'Publish'}/>
                                        <span
                                            className={'text-lightGray underline underline-offset-4 cursor-pointer mx-auto'}
                                            onClick={() => {
                                                setFormPageState(0)
                                            }}>Back to edit</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </main>
        </div>

    );
};

export default Edit;