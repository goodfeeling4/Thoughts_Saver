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
        <div onClick={remove} className="bg-gradient-to-r text-red-600  rounded-sm p-1 cursor-pointer">
            Delete
        </div>
    );
}