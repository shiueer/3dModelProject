// made a list to choose which model's data needs to be edited
function M_Edit(MData){
    // console.log(MData);
    let keys = Object.keys(MData[0]);
    let title = ['編號：', '作品名稱：', '創作年代：', '作品尺寸：', '作者：', '作品說明：', '作品說明：', '作品名稱錄音：', '作品說明錄音：', '作品模型：', '作品照片：']
    let htmlStr = ``;
    // console.log(keys);
    for (let i=0; i<keys.length; i++){
        htmlStr += `<div class="row mt-3 text-center" id="${keys[i]}"><div class="col-4">${title[i]}</div><div class="col-8">${MData[0][keys[i]]}</div></div></div>`;
        console.log(MData[0][keys[i]]);
    }
    console.log(htmlStr);
    $('#MData').html(htmlStr);
}

// made a list to choose which exhibition's data needs to be edited