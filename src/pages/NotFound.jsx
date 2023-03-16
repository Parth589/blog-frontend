import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={'h-screen'}>
            <main className="flex flex-col-reverse gap-5 items-center justify-center h-full px-5 py-10
    lg:flex-row lg:gap-10">
                <div className="flex flex-col gap-2 items-center">
                    <h1 className=" text-4xl text-center font-bold flex flex-col gap-2 text-lightGray">
                        <span className="text-5xl text-green-600 text-black">Oops!</span>
                        That page is not available
                    </h1>
                    <Link to={'/'}
                       className="flex gap-2 text-xl  text-green-600 text-green underline underline-offset-8">back to Home
                    </Link>
                </div>
                <img src="/src/assets/14.png" alt="" className="w-96 drop-shadow-md
        lg:w-full lg:max-w-xl"/>
            </main>
        </div>

    );
};

export default NotFound;