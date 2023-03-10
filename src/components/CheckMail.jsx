const CheckMail = () => {
    return (
        <div className={'h-screen bg-extremelightGray grid place-content-center'}>
            <div className={'flex flex-wrap justify-center items-center h-fit w-fit px-10'}>
                <img src="/src/assets/mailReceived.png" alt="" className={'w-96'}/>
                <h3 className={'text-3xl text-center'}>Check your mail to finish logging in </h3>
            </div>
        </div>
    );
};

export default CheckMail;