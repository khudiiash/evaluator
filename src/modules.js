export function getMonth() {
    var d = new Date();
    var n = d.getMonth();
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return months[n]
}