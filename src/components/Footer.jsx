const Footer = ({desktop = false}) => {
    if (desktop) {
        return (
            <footer className="pt-5 hidden lg:block">
                <ul className=" flex flex-wrap px-7 gap-6 items-center text-lightGray ">

                    <li><a
                        href="mailto:quillthe59@gmail.com?subject=Asking%20for%20Help%20%2F%20Suggestion&body=%3C%3CReplace%20this%20with%20your%20Question%20%2F%20suggestion%3E%3E"> Help</a>
                    </li>
                    <li><a href="listview.html">Blog</a></li>
                    <li className=""><a href="about.html"> About</a></li>
                    <li className=" "><a href="about.html/#textToSpeech">Text to speech</a></li>

                </ul>
            </footer>
        )
    }
    return (
        <>
            <footer className=" lg:hidden flex-col justify-between bg-black text-white px-7 pb-5 pt-10  items-center ">
                <a href="landing.html" className="flex items-center gap-4">
                    <img src="/src/assets/logo.svg" className="w-8 invert "/>
                    <span className="text-2xl font-semibold font-serif">The Quill</span>
                </a>
                <div className=" py-7">
                    <ul className="flex  mx-1 text-white gap-7 ">
                        <li><a
                            href="mailto:quillthe59@gmail.com?subject=Asking%20for%20Help%20%2F%20Suggestion&body=%3C%3CReplace%20this%20with%20your%20Question%20%2F%20suggestion%3E%3E"> Help</a>
                        </li>
                        <li><a href="listview.html">Blog</a></li>
                        <li className=""><a href="about.html"> About</a></li>
                        <li className=" "><a href="about.html/#textToSpeech">Text to speech</a></li>
                    </ul>

                </div>
            </footer>

        </>
    );
};

export default Footer;