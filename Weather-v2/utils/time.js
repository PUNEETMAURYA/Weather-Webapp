exports.getTime = () => {
    let time = new Date();
    let options = {

    }
    return time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}