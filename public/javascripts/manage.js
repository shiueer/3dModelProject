// made a list to choose which one need to be edited
function M_Manage(MList){
    let keys = Object.keys(MList[0]);
    // console.log(keys);
    // console.log(MList[0][keys[0]],MList[0][keys[1]]);
    let htmlStr = `<div class="row mt-3">`;
    // console.log(MList.length);
    for (let i=0; i<MList.length; i++){
        htmlStr += `<div class="col-3">${MList[i][keys[0]]}</div><div class="col-6">${MList[i][keys[1]]}</div><div class="col-3"><a class="btn btn-primary">EDIT</a></div></div><div class="row mt-3">`;
    }
    htmlStr += `</div>`;
    console.log(htmlStr);
    $('#MList').html(htmlStr);
}