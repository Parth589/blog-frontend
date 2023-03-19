import {Link} from "react-router-dom";
import Footer from "./Footer.jsx";

const Categories = () => {
    return (
        <div className="lg:sticky md:h-fit md:top-0 basis-1/3">
            <span className=" text-md  uppercase pt-14 items-center gap-2 pb-10 px-7 flex font-bold "> <img
                src="/src/assets/compass.svg" className="w-5"/>Discover More categories</span>

            <div className=" border-extremelightGray border-b-2 pb-20 md:pb-10 ">
                <ul className=" flex flex-wrap px-7 gap-5 items-center text-lightGray  ">
                    <li className="tagg "><Link to={"/posts?q=Data Science"}> Data
                        Science </Link></li>
                    <li className="tagg "><Link to={"/posts?q=Technology"}> Technology </Link>
                    </li>
                    <li className="tagg "><Link to={"/posts?q=Writing"}> Writing </Link></li>
                    <li className="tagg "><Link
                        to={"/posts?q=Relationships"} > Relationships < /Link>
                    </li>
                    <li className="tagg "><Link to={"/posts?q=Machine Learning"}> Machine
                        Learning </Link></li>
                    <li className="tagg "><Link
                        to={"/posts?q=Productivity"}> Productivity < /Link></li>
                    <li className="tagg "><Link to={"/posts?q=Politics"}> Politics </Link></li>
                </ul>
            </div>
            <Footer desktop={true}/>
        </div>
    );
};

export default Categories;