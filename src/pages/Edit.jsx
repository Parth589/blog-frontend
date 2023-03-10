import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Input from "../components/Input.jsx";

const Edit = () => {
    const [formPageState, setFormPageState] = useState(0);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [keywords, setKeywords] = useState('')
    const [thumbnail_link, setThumbnail_link] = useState('')
    const [queryParams] = useSearchParams();
    const effect = async () => {
        if (!queryParams.get('new')) {
            console.log('h')
            const id = queryParams.get('id');
            //     make api call to get blogs data
            //     update states according to that data
        }
    }
    useEffect(() => {
        effect();
    });
    const handlePublishClick = (e) => {
        e.preventDefault()
        if (formPageState === 0) {
            return setFormPageState(1);
        }
        //     publish the blog
        console.log('publish....')
    }
    return (
        <main className="h-screen flex justify-center">
            <form className="flex flex-col items-start px-5 font-serif h-full relative max-w-6xl w-full">
                <div className={`${formPageState !== 0 && 'hidden'} flex justify-end gap-5 w-full`}>
                    <button
                        className="text-sm font-sans tracking-wide px-4 py-1 rounded-full bg-black text-white mt-5 hover:bg-slate-700 transition-colors">Preview
                    </button>
                    <button type="submit"
                            className="text-sm font-sans tracking-wide px-4 py-1 rounded-full bg-green text-white mt-5 hover:bg-green-700 transition-colors"
                            onClick={handlePublishClick}>
                        Publish
                    </button>
                </div>
                <div className="px-3 md:px-20 h-full w-full">
                    <div id={'form--page1'} className={`${formPageState !== 0 && 'hidden'} h-full flex flex-col`}>

                        <input type="text" placeholder="Title" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                               className="bg-inherit w-full text-5xl font-medium focus:outline-none focus:border-none py-3"/>
                        <textarea placeholder="Tell your story..." value={content} onChange={(e) => {
                            setContent(e.target.value)
                        }}
                                  className="bg-inherit  resize-none w-full h-full mb-7 text-xl focus:outline-none focus:border-none"></textarea>

                    </div>

                    <div id="form--page2"
                         className={`${formPageState !== 1 && 'hidden'} w-full h-full grid place-content-center inset-0 font-sans bg-white`}>
                        <div className="flex flex-col gap-5 max-w-lg">

                            <div className="flex flex-col gap-1">
                                <label htmlFor="th_link">Thumbnail link</label>
                                <input type="email" value={thumbnail_link} onChange={(e) => {
                                    setThumbnail_link(e.target.value)
                                }}
                                       className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2 placeholder:text-sm"
                                       id="th_link" placeholder="eg. https://unsplash.com/photos/MBRrXdf8iSQ "/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="Keywords">Keywords (* comma separated)</label>
                                <input type="email" value={keywords} onChange={(e) => {
                                    setKeywords(e.target.value)
                                }}
                                       className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2"
                                       placeholder="eg. coding, technology, communication" id="Keywords"/>
                            </div>
                            <Input type={'submit'} content={'Publish'}/>
                        </div>
                    </div>
                </div>
            </form>
        </main>

    );
};

export default Edit;