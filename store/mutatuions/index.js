
const setStateByKey =(state,data) =>{
    Object.keys(data).forEach((e)=>{
        if(state.hasOwnProerty(e)){
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

export default{
    setStateByKey
}