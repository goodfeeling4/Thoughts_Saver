"use client"

import { DeleteMessages } from "@/lib/indexdb";

export default function Deletebtn({id}){
    const remove = async() => {
        const confirmed = confirm("are you sure");
        if(confirmed){
          const res = DeleteMessages(id);
            if(res){
                window.location.reload();
            }
        }
    }
    
    return (
        <span onClick={remove} className="float-right bg-gradient-to-r border-2 border-red-600  text-red-600  rounded-sm px-1 cursor-pointer">
            Delete
        </span>
    );
}