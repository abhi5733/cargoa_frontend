import { Manufacturer, Transporter, signupsuccess } from "./actionType"


const initialState = {isauth:false,role:""}


export const reducer = (state=initialState,{type,payload})=>{

    switch(type){

        case signupsuccess:
            return {...state,isauth:true}

        case Manufacturer:
            return {...state,role:"Manufacturer"}   
            case Transporter:
                return {...state,role:"Transporter"}     

            default:
            return state

    }


}