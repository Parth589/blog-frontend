import Navbar from "../components/Navbar.jsx";

const Single = (props) => {
    return (<>
        <Navbar isHomepage={true} isLoggedIn={props.isLoggedIn}/>
        <main className="hidden md:block p-5 w-full items-center flex-col px-5">
            <div className="flex flex-col  w-full px-7">

                <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-3">
                            <img src="/src/assets/person-circle.svg" alt="user"
                                 className="w-9 aspect-square"/>
                            <div className="flex flex-col">
                                <a href="#" className="block text-lg font-semibold">Tom cooper</a>
                                <span className="flex    gap-8 ">
                                <div className="flex items-center pt-0 gap-8 text-gray-600">
                                    <span>Jan 26</span>
                                    <span>8 min read</span>
                                </div>


                                <button className="flex items-center gap-2 text-green-600">
                                    <img src="/src/assets/listen.svg" alt="" className="w-4"/>Listen
                                </button>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-12"><img src="/src/assets/link.svg" alt="" className="w-4.5"/> <img
                            src="/src/assets/bookmark.svg" alt="" className=""/>

                        </div>
                    </div>
                </div>

            </div>
        </main>
        <div className="flex justify-center">
            <div className="px-7 max-w-4xl">
                <main className="md:hidden p-5 w-full flex items-center flex-col px-0">
                    <div className="max-w-6xl w-full">

                        <div className="flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3"><img src="/src/assets/person-circle.svg" alt="user"
                                                                          className="w-9"/>

                                    <a href="#" className="block text-lg font-semibold">Tom cooper</a>
                                </div>
                                <img src="/src/assets/link.svg" alt=""/>
                            </div>
                        </div>
                        <span className="flex justify-between sm:py-4   gap-4 pt-5">
                        <div className="flex items-center gap-4 text-gray-600"><span
                            className="flex gap-2 items-center  border-2 px-4 py-1  rounded-full border-slate-300"><img
                            src="/src/assets/bookmark.svg" alt="" className="w-4"/> save </span>
                            <span>Jan 26</span>
                            <span>8 min read</span>

                        </div>
                        <button className="flex items-center gap-2 text-green-600"><img src="/src/assets/listen.svg" alt=""
                                                                                    className="w-4"/>Listen</button>

                    </span>
                    </div>
                </main>
                <div className="flex flex-col pt-6 md:pt-12">
                    <span className="font-semibold text-3xl">An out of google experience</span>
                    <span className="pt-6 md:pt-20"><img src="/src/assets/sample1.svg" alt=""
                                                     className="w-full aspect-video object-cover"/></span>
                    <span className="py-10 [word-spacing:3px] leading-7 md:pt-28">
                        Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptate dolore nihil repellendus, quis consequatur ut in! Nobis qui
                    quia itaque quaerat facilis temporibus. Illo aliquam magnam expedita sapiente reprehenderit tempore
                    optio libero nihil tempora eaque commodi, non nobis quidem vero harum suscipit aut dolorem! Totam
                    cupiditate ipsam iste a aliquam ducimus laborum mollitia obcaecati, ex impedit voluptatum, rerum
                    omnis illum, natus ipsa. Eos dolores optio consequatur! Tempora quod reiciendis blanditiis quia eum
                    possimus eaque rem nulla. Incidunt dolores similique explicabo reprehenderit illum, esse commodi
                    harum repellat, et quisquam autem eum tempore, consequatur rerum at natus alias blanditiis illo eius
                    maxime cum voluptate neque optio repellendus. Tempora soluta accusantium deleniti repellat dolor
                    provident libero expedita adipisci beatae magnam dolorem, in ratione fuga facilis magni ducimus
                    eius! Voluptatibus debitis, ut voluptatum, quo sunt quia exercitationem recusandae, neque nihil
                    necessitatibus animi ipsam maxime officiis molestias doloremque voluptate itaque. Minus nulla
                    laborum omnis odit non at voluptatibus molestiae labore quasi quis dolor modi dolorem iusto
                    explicabo voluptate culpa voluptas consequatur blanditiis nobis quaerat, nemo in adipisci? Commodi,
                    laborum molestiae. Quaerat voluptas eum quis dolorum asperiores rerum ad. Dicta, inventore
                    doloremque delectus eos, assumenda similique incidunt quis ut asperiores ex beatae, animi dolorum
                    non iusto!</span>
                </div>
                <div className="md:hidden">
                    <div className="flex pb-16 gap-8">
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm">Conversation Design</button>
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm ">Conversation Design</button>
                    </div>
                    <div className=" flex pb-16 justify-center">
                        <div
                            className="flex w-32 shadow-xl px-4 py-2 items-center border-2 border-gray-200 rounded-full justify-between">
                            <span><img src="/src/assets/clap.svg" alt=""/></span>
                            <span><img src="/src/assets/comment.svg" alt=""/></span>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="flex pt-12 pb-10 gap-8">
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm">Conversation Design</button>
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm ">Conversation Design</button>
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm ">Conversation Design</button>
                        <button className=" bg-gray-100 rounded-full px-4 py-1 text-sm ">Conversation Design</button>
                    </div>
                    <div className="pb-16">
                        <div className="bg-gray-50 px-6 py-2 flex gap-8 justify-between">
                            <div className="flex gap-8 text-gray-800 text-sm ">

                            <span className="flex gap-2 items-center"><img src="/src/assets/clap.svg" alt=""
                                                                       className="w-5"/> 80k</span>
                                <span className="flex gap-2 "><img src="/src/assets/comment.svg" alt=""
                                                               className="w-4"/>193</span>
                            </div>

                            <span><img src="/src/assets/bookmark.svg" alt="" className="w-4"/></span>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>);
};

export default Single;