
exports.getday = () =>{

    let today = new Date();
    let options = {
        weekday : "long",
        day : "numeric" ,
        month :"long",
        year:"numeric"
    };
    let myday = today.toLocaleDateString("en-US",options);
    return myday;
}