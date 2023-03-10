import React from "react";

const Input = ({label, id, state, setState, type,content}) => {
    if(type==='submit'){
        return (
            <button type={'submit'}
                    className=" font-semibold px-3 py-2 outline outline-2 bg-green hover:bg-lightGray text-white rounded-md ">
                {content}
            </button>
        )
    }
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={`${id}`}>{label}</label>
            <input type={type}
                   className="focus:outline-green outline outline-1 outline-slate-800 w-80 rounded-md px-3 py-2"
                   id={`${id}`} onChange={(e) => setState(e.target.value)} value={state}/>
        </div>
    );
};

export default Input;