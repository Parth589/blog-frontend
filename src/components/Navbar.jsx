const Navbar = ({isLoggedIn, isHomepage}) => {

    if (isHomepage || !isLoggedIn) {
        return (
            <nav
                className={`w-full flex flex-nowrap justify-between ${isHomepage ? 'bg-yellow' : 'bg-white'} px-5 md:px-7 py-3 border-b border-b-lightGray`}>
                <div className="flex items-center gap-3 md:gap-6">

                    <img src="/src/assets/logo.svg" className=" w-10 md:w-12 aspect-square"/>
                    <span className="font-serif font-bold text-2xl md:text-3xl whitespace-nowrap">The Quill</span>
                </div>
                <div className="flex gap-7 items-center">
                    <ul className="flex gap-5 items-center hidden md:flex">
                        <li>
                            <a href="" className="whitespace-nowrap">Our story</a>
                        </li>
                        <li>
                            <a href="" className="whitespace-nowrap">Write</a>
                        </li>
                        <li>
                            <a href="" className="whitespace-nowrap">Sign In</a>
                        </li>
                    </ul>
                    <a href=""
                       className="bg-green text-white px-7 py-2 rounded-full hover:bg-darkGray whitespace-nowrap">Get
                        started</a>
                </div>
            </nav>
        );
    }
    if (isLoggedIn) {
        return (
            <nav
                className="w-full flex flex-nowrap justify-between bg-white px-5 md:px-7 py-3 border-b  border-extremelightGray">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 md:gap-6">

                        <img src="/src/assets/logo.svg" className=" w-10 md:w-12 aspect-square"/>

                    </div>
                    <div>
                        <div
                            className="hidden md:flex bg-extremelightGray2 rounded-full items-center pl-3 outline outline-extremelightGray outline-2 focus-within:outline-lightGray">
                            <img src="/src/assets/search.svg" className="h-5"/>
                            <input type="text"
                                   className="bg-extremelightGray2 rounded-full py-2 px-4 focus:outline-none"/>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10 items-center">
                    <a href="" className=" gap-2 hidden md:flex">
                        <img src="/src/assets/write.svg" alt=""/>
                        <span>Write</span>
                    </a>
                    <div className="relative group">

                        <div className="flex items-center gap-2">
                            <img src="/src/assets/person-circle.svg" alt="" className="w-8 aspect-square"/>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M3.07994 4.11999C3.00291 4.06222 2.90763 4.03417 2.81159 4.041C2.71554 4.04782 2.62518 4.08906 2.5571 4.15715C2.48901 4.22523 2.44777 4.31559 2.44095 4.41164C2.43412 4.50768 2.46217 4.60296 2.51994 4.67999L5.99994 8.16799L9.47994 4.67999C9.52579 4.64561 9.56371 4.60177 9.59114 4.55145C9.61857 4.50114 9.63487 4.44551 9.63894 4.38835C9.643 4.33118 9.63473 4.27381 9.61469 4.22012C9.59465 4.16643 9.56331 4.11767 9.52278 4.07715C9.48226 4.03663 9.4335 4.00528 9.37981 3.98524C9.32612 3.9652 9.26875 3.95694 9.21159 3.961C9.15442 3.96506 9.0988 3.98136 9.04848 4.00879C8.99816 4.03622 8.95433 4.07414 8.91994 4.11999L5.99994 7.03199L3.07994 4.11999Z"
                                      fill="black"/>
                            </svg>

                        </div>
                        {/* drop down*/}
                        <div className="absolute bg-white px-7 py-5 right-0 top-full hidden group-hover:block">
                            <ul className="text-lg flex flex-col gap-2 w-32 pb-5">
                                <li>
                                    <a href="">profile</a>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>
                                <li>
                                    <a href="">bookmarks</a>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                                <li>
                                    <a href="">write</a>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                                <li className="text-red">
                                    <a href="">log out</a>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
};

export default Navbar;