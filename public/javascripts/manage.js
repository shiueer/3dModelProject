// made a list to choose which model's data needs to be edited
function M_Manage(MList){
    let keys = Object.keys(MList[0]);
    // console.log(keys);
    // console.log(MList[0][keys[0]],MList[0][keys[1]]);
    let htmlStr = `<div class="row mt-3">`;
    // console.log(MList.length);
    for (let i=0; i<MList.length; i++){
        htmlStr += `<div class="col-3">${MList[i][keys[0]]}</div><div class="col-6">${MList[i][keys[1]]}</div><div class="col-3"><a href="/edit/M_Edit?M_ID=${MList[i][keys[0]]}" class="btn btn-primary">編輯</a></div></div><div class="row mt-3">`;
    }
    htmlStr += `</div>`;
    // console.log(htmlStr);
    $('#MList').html(htmlStr);
}

// made a list to choose which exhibition's data needs to be edited
function E_Manage(EList){
    let keys = Object.keys(EList[0]);
    console.log(keys);
    // console.log(EList[0][keys[0]],EList[0][keys[1]],);
    let htmlStr = `<div class="row mt-3">`;
    // console.log(MList.length);
    for (let i=0; i<EList.length; i++){
        htmlStr += `<div class="col-3">${EList[i][keys[0]]}</div><div class="col-6">${EList[i][keys[3]]}</div><div class="col-3"><a href="/edit/E_Edit?E_ID=${EList[i][keys[0]]}" class="btn btn-primary">編輯</a></div></div><div class="row mt-3">`;
    }
    htmlStr += `</div>`;
    // console.log(htmlStr);
    $('#EList').html(htmlStr);
}

// made a list to manage exhibition and model connection
function C_Manage(CList){
    let keys = Object.keys(CList[0]);
    console.log(keys);
    console.log(CList[0][keys[0]],CList[0][keys[1]]);
    let htmlStr = `<div class="row text-center">`;
    // console.log(MList.length);
    for (let i=0; i<CList.length; i++){
        htmlStr += `<div class="col-3">${CList[i][keys[0]]}</div><div class="col-3">${CList[i][keys[1]]}</div><div class="col-3">${CList[i][keys[2]]}</div><div class="col-3"><a href="/edit/C_Edit?C_ID=${CList[i][keys[0]]}" class="btn btn-primary">編輯</a></div></div><div class="row mt-3">`;
    }
    htmlStr += `</div>`;
    console.log(htmlStr);
    $('#CList').html(htmlStr);
}