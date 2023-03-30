import Navbar from "../components/Navbar.jsx";
import {useContext} from "react";
import {Context} from "../App.jsx";

const About = () => {
    const {isLoggedIn}=useContext(Context);
    return (
        <div className={'w-fit'}>
            <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
            <div className="flex container   items-center justify-center py-8 ">

                <h1 className="text-5xl font-medium px-7 ">The only way to do great work is to love what you do</h1>
            </div>
            <div className="px-10 xl:px-64 pb-10">
                <div className="py-6 text-2xl"> Welcome to our blog! We are a team of passionate writers and editors
                    committed to providing valuable and engaging content to our readers. With over 10,000 words of
                    content, we hope to introduce ourselves and share our vision with you.
                </div>
                <div className="py-6 text-2xl">Our Mission
                </div>
                <div>At our core, we believe that knowledge is power. Our mission is to provide comprehensive and
                    accessible content that empowers our readers to make informed decisions about their health,
                    relationships, finances, and more. We strive to create a platform where our readers can access
                    quality information that can improve their lives and the lives of those around them.
                </div>
                <div className="py-6 text-2xl">Our Team
                </div>
                <div>We are a diverse group of writers and editors, each with unique skills and experiences. Together,
                    we work to create content that is informative, engaging, and relevant. Our team includes experts in
                    various fields, including medicine, psychology, nutrition, and finance.
                </div>
                <div className="py-6 text-2xl">Our Content

                </div>
                <div>We publish a wide range of content, including articles, reviews, and how-to guides. Our articles
                    cover a variety of topics, from the latest trends in health and wellness to tips for managing stress
                    and anxiety. Our reviews provide in-depth analysis of products and services, helping our readers
                    make informed purchasing decisions. Our how-to guides offer step-by-step instructions for everything
                    from DIY projects to financial planning.
                </div>
                <div className="py-6 text-2xl">Our Approach

                </div>
                <div>We believe in taking a holistic approach to content creation. We strive to provide information that
                    is not only accurate and reliable but also accessible and engaging. We understand that our readers
                    come from all walks of life, and we aim to create content that resonates with everyone.

                    We prioritize diversity, equity, and inclusion in our content creation process. We recognize that
                    there are different perspectives and experiences that shape people's lives and we aim to amplify
                    diverse voices and perspectives in our content.
                </div>

                <div className="py-6 text-2xl"> Our Future

                </div>
                <div>We are committed to growing and evolving with our readers. We are always looking for ways to
                    improve our content and provide even greater value to our audience. Our goal is to continue to be a
                    trusted source of information and inspiration for our readers for years to come.

                    We plan to expand our team to include even more experts in various fields. We also plan to develop
                    new formats of content such as podcasts and videos to further engage our audience.
                </div>
                <div className="py-6 text-2xl" id={'textToSpeech'}> Text To Speech

                </div>
                <div>Are you tired of reading lengthy blog articles and wish you could listen to them instead? We
                    understand how exhausting it can be to read through paragraphs of information, especially when
                    you're on the go.

                    That's why we've introduced our read-aloud feature, which allows you to listen to our blog content
                    instead of reading it. With just a click of a button, you can sit back, relax, and listen to our
                    writers' insights and perspectives on various topics.

                    Our read-aloud feature is perfect for those who prefer to consume content while doing other tasks,
                    such as commuting or working out. You can listen to our content on your phone or computer, and it's
                    available to you anytime, anywhere.

                    We take great pride in ensuring that our content is well-researched, accurate, and engaging. Our
                    writers put in the time and effort to provide you with valuable information that you can rely on.
                    With our read-aloud feature, you can now access this information in a more convenient and accessible
                    way.

                    We hope that our read-aloud feature enhances your experience on our blog and makes it easier for you
                    to stay informed and engaged with our content. Thank you for choosing to read or listen to our blog,
                    and we look forward to continuing to provide you with valuable insights and perspectives.
                </div>

                <div className="py-6 text-2xl"> Conclusion

                </div>
                <div>Thank you for taking the time to get to know us. We hope that our content provides you with the
                    knowledge and inspiration you need to live your best life. We are committed to providing valuable
                    and engaging content that empowers our readers and creates a positive impact in the world. We look
                    forward to continuing to grow and evolve with our community.
                </div>
            </div>

        </div>);
};

export default About;