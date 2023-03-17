import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "../App.jsx";
import Card from "../components/Card.jsx";
import CardCompact from "../components/CardCompact.jsx";

const Landing = () => {
    const {isLoggedIn, fetchData} = useContext(Context);
    const [compactCardList, setCompactCardList] = useState([]);
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);
    const effect = async () => {
        const {success, data} = await fetchData('/api/v1/blogs?limit=20', 'GET');
        if (success) {
            setCompactCardList(data.slice(0, 6));
            setCardList(data.slice(6, data.length));
            setLoading(false);
        }
    }
    useEffect(() => {
        effect();
    }, [])
    return (<>
        <Navbar isHomepage={true} isLoggedIn={isLoggedIn}/>
        <main>
            <section
                className="bg-yellow py-20 lg:px-20 pl-7 pr-10 flex flex-col items-start border-b border-extremelightGray border-b-1 gap-5 ">
                <h3 className="lg:text-6xl text-5xl mb-5  whitespace-nowrap ">Stay Curious.</h3>
                <span className="text-xl max-w-3xl">
                Discover stories, thinking, and expertise
                <br/>
                from writers on any topic.
            </span>
                <a href={'listview.html'} className="btn-primary !mx-0 my-5 !px-14 !py-2 !text-lg hover:bg-darkGray">
                    Start Reading
                </a>
            </section>
            <hr/>
            <section className="px-7 md:px-10 border-extremelightGray border-b-2">

            <span className="font-bold text-sm tracking-wider uppercase pt-16 items-center gap-2 py-10 flex "> <img
                src="/src/assets/trend.png" className="w-5"/> Trending on The Quill</span>
                <div className="pb-2 pl-5">
                    <ol
                        className="gap-10 lg:gap-14 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10 list-decimal marker:text-extremelightGray  marker:font-bold marker:text-2xl  "
                        id="compact-card-wrapper">
                        {
                            loading ?
                                <>
                                    <div className=" ">
                                        <a className="flex gap-2 items-center">
                                            <div
                                                className="w-7 h-7 aspect-square bg-extremelightGray rounded-full animate-pulse">
                                            </div>
                                            <span className=" animate-pulse bg-extremelightGray w-40 h-7 rounded">
                            </span>
                                        </a>
                                        <h6 className="text-lg py-4 my-2 font-semibold animate-pulse w-72 bg-extremelightGray rounded">
                                            <a href="/single.html?id=${data.id}">
                                            </a>
                                        </h6>
                                        <div className="flex gap-5 text-lightGray text-md">
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                        </div>
                                    </div>
                                    <div className=" ">
                                        <a className="flex gap-2 items-center">
                                            <div
                                                className="w-7 h-7 aspect-square bg-extremelightGray rounded-full animate-pulse">
                                            </div>
                                            <span className=" animate-pulse bg-extremelightGray w-40 h-7 rounded">
                            </span>
                                        </a>
                                        <h6 className="text-lg py-4 my-2 font-semibold animate-pulse w-72 bg-extremelightGray rounded">
                                            <a href="/single.html?id=${data.id}">
                                            </a>
                                        </h6>
                                        <div className="flex gap-5 text-lightGray text-md">
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                        </div>
                                    </div>
                                    <div className=" ">
                                        <a className="flex gap-2 items-center">
                                            <div
                                                className="w-7 h-7 aspect-square bg-extremelightGray rounded-full animate-pulse">
                                            </div>
                                            <span className=" animate-pulse bg-extremelightGray w-40 h-7 rounded">
                            </span>
                                        </a>
                                        <h6 className="text-lg py-4 my-2 font-semibold animate-pulse w-72 bg-extremelightGray rounded">
                                            <a href="/single.html?id=${data.id}">
                                            </a>
                                        </h6>
                                        <div className="flex gap-5 text-lightGray text-md">
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                        </div>
                                    </div>
                                    <div className=" ">
                                        <a className="flex gap-2 items-center">
                                            <div
                                                className="w-7 h-7 aspect-square bg-extremelightGray rounded-full animate-pulse">
                                            </div>
                                            <span className=" animate-pulse bg-extremelightGray w-40 h-7 rounded">
                            </span>
                                        </a>
                                        <h6 className="text-lg py-4 my-2 font-semibold animate-pulse w-72 bg-extremelightGray rounded">
                                            <a href="/single.html?id=${data.id}">
                                            </a>
                                        </h6>
                                        <div className="flex gap-5 text-lightGray text-md">
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                            <span
                                                className="w-32 h-7 bg-extremelightGray animate-pulse rounded">  </span>
                                        </div>
                                    </div>
                                </>
                                :
                                compactCardList.map(e => {
                                    return <CardCompact key={e._id} title={e.content.title}/>
                                })
                        }

                        </ol>
                    </div>
                </section>
                <div className="lg:flex flex-row-reverse  ">
                    <div className="lg:sticky md:h-fit md:top-0 basis-1/3">
            <span className=" text-md  uppercase pt-14 items-center gap-2 py-10 px-7 flex font-bold "> <img
                src="/src/assets/compass.svg" className="w-5"/>Discover More categories</span>

                        <div className=" border-extremelightGray border-b-2 pb-20 md:pb-10 ">
                            <ul className=" flex flex-wrap px-7 gap-5 items-center text-lightGray  ">
                                <li className="tagg "><a href="search.html?search=Data Science"> Data
                                    Science </a></li>
                                <li className="tagg "><a href="search.html?search=Technology"> Technology </a>
                                </li>
                                <li className="tagg "><a href="search.html?search=Writing"> Writing </a></li>
                                <li className="tagg "><a
                                    href="search.html?search=Relationships"> Relationships </a>
                                </li>
                                <li className="tagg "><a href="search.html?search=Machine Learning"> Machine
                                    Learning </a></li>
                                <li className="tagg "><a
                                    href="search.html?search=Productivity"> Productivity </a></li>
                                <li className="tagg "><a href="search.html?search=Politics"> Politics </a></li>
                            </ul>

                        </div>
                        <Footer desktop={true}/>
                    </div>
                    <div className="pt-14 pb-20 px-1 sm:px-7 py-7  basis-2/3">
                        <ol className="gap-14 grid grid-cols-1  " id="non-compact-card-wrapper">
                            {
                                loading?
                                <>
                                    <li>
                                        <div className="md:card3 px-5  flex justify-between md:items-center gap-5">
                                            <div className="gap-2 items-center ">
                                                <div className="flex gap-2 items-center">
                                                    <div
                                                        className="w-7 h-7 aspect-square bg-extremelightGray animate-pulse rounded-full"></div>
                                                    <span
                                                        className="w-32 py-3 animate-pulse bg-extremelightGray rounded">
                                </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h6 className="py-4 my-2 w-40 md:w-72 text-lg md:text-xl md:font-semibold bg-extremelightGray animate-pulse rounded">
                                                        <a href="/single.html?id=${data.id}">
                                                        </a>
                                                    </h6>
                                                    <span
                                                        className="hidden sm:block  text-lightGray text-base py-6 bg-extremelightGray animate-pulse w-96">
                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="w-16 md:w-32 aspect-square bg-extremelightGray animate-pulse">
                                            </div>
                                        </div>
                                        <span
                                            className="flex justify-between sm:py-4 text-lightGray text-sm gap-4 px-5 pt-6">
                        <div className="flex items-center gap-4">
                            <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                            </span>
                            <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                            </span>
                            <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                            </span>
                        </div>
                    </span>
                                    </li>
                                    <li>
                                        <div className="md:card3 px-5  flex justify-between md:items-center gap-5">
                                            <div className="gap-2 items-center ">
                                                <div className="flex gap-2 items-center">
                                                    <div
                                                        className="w-7 h-7 aspect-square bg-extremelightGray animate-pulse rounded-full"></div>
                                                    <span
                                                        className="w-32 py-3 animate-pulse bg-extremelightGray rounded">
                                </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h6 className="py-4 my-2 w-40 md:w-72 text-lg md:text-xl md:font-semibold bg-extremelightGray animate-pulse rounded">
                                                        <a href="/single.html?id=${data.id}">
                                                        </a>
                                                    </h6>
                                                    <span
                                                        className="hidden sm:block  text-lightGray text-base py-6 bg-extremelightGray animate-pulse w-96">
                                </span>
                                                </div>
                                            </div>
                                            <div
                                                className="w-16 md:w-32 aspect-square bg-extremelightGray animate-pulse">
                                            </div>
                                        </div>
                                        <span
                                            className="flex justify-between sm:py-4 text-lightGray text-sm gap-4 px-5 pt-6">
                                <div className="flex items-center gap-4">
                                <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                                </span>
                                <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                                </span>
                                <span className="w-24 md:w-32 lg:w-40 py-4 bg-extremelightGray animate-pulse rounded">
                                </span>
                                </div>
                                </span>
                                    </li>
                                </>
                                :cardList.map(e=>{
                                    return <Card key={e._id} title={e.content.title}/>
                                    })
                            }
                        </ol>
                    </div>
                </div>
            </main>
        <Footer desktop={false}/>
        </>);
};

export default Landing;