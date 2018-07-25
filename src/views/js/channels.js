let channels = [];

export const sub = (data) => {
    channels.push(data)
}

export const unsub = (data) => {
    let index = channels.indexOf(data)
    if(index != -1){
        channels.splice(index, 1)
    }
}

export const clearChannels = (data) => {
    channels = [];
}

export default channels;

