import {Link} from "react-router-dom";

const Footer = ({desktop = false}) => {
    if (desktop) {
        return (
            <footer className="py-5 hidden lg:block whitespace-nowrap">
                <ul className=" flex px-2 gap-6 items-center text-lightGray ">

                    <li><a
                        href="mailto:quillthe59@gmail.com?subject=Asking%20for%20Help%20%2F%20Suggestion&body=%3C%3CReplace%20this%20with%20your%20Question%20%2F%20suggestion%3E%3E"> Help</a>
                    </li>
                    <li><Link to="/posts">Blog</Link></li>
                    <li className=""><Link to={'/about'}> About</Link></li>
                    <li className=" "><Link to={'/about#textToSpeech'}>Text to speech</Link></li>

                </ul>
            </footer>
        )
    }
    return (
        <>
            <footer className=" lg:hidden flex-col justify-between bg-black text-white px-7 pb-5 pt-10  items-center ">
                <Link to={'/'} className="flex items-center gap-4">
                    <img src="/src/assets/logo.svg" className="w-8 invert "/>
                    <span className="text-2xl font-semibold font-serif">The Quill</span>
                </Link>
                <div className=" py-7">
                    <ul className="flex  mx-1 text-white gap-7 ">
                        <li><a
                            href="mailto:quillthe59@gmail.com?subject=Asking%20for%20Help%20%2F%20Suggestion&body=%3C%3CReplace%20this%20with%20your%20Question%20%2F%20suggestion%3E%3E"> Help</a>
                        </li>
                        <li><Link to="/posts">Blog</Link></li>
                        <li className=""><Link to="/about"> About</Link></li>
                        <li className=" "><Link to="/about#textToSpeech">Text to speech</Link></li>
                    </ul>

                </div>
            </footer>

        </>
    );
};

export default Footer;