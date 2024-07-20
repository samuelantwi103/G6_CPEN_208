export function getTime() {
    const hours = new Date().getHours();

    if (hours < 12){
        return 'morning';
    } else if (hours < 12){
        return 'afternoon';
    } else if (hours < 12){
        return 'evening';
    }  
}