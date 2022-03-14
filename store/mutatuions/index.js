
function hasOwn(obj,key){
    return Object.prototype.hasOwnProperty.call(obj,key)
}
const setStateByKey =(state,data) =>{
    Object.keys(data).forEach((e)=>{
        if(hasOwn(state,e)){
            state[e] = data[e]
        }else{
            if(/\.|\[|\]/.test(e)){
                // setByKey(state,e,data[e])
            }else{
                state[e] = data[e]
            }
        }
    })
}

export  default{
    setStateByKey
} 
