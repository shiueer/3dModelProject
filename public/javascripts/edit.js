let enable = true;
let g_MData = undefined;


// made a list to choose which model's data needs to be edited
function M_Edit(MData){
    g_MData = MData;
    // console.log(MData);
    let keys = Object.keys(MData[0]);
    let title = ['編號：', '作品名稱：', '創作年代：', '作品尺寸：', '作者：', '作品說明：', '作品說明：', '作品名稱錄音：', '作品說明錄音：', '作品模型：', '作品照片：']
    let htmlStr = ``;
    // console.log(keys);
    for (let i=0; i<keys.length; i++){
        htmlStr += `
        <div class="row mt-3 text-center">
            <div class="col-4">
                ${title[i]}
            </div>`
        if(enable){
            htmlStr += 
                `<div class="col-6" id="${keys[i]}">
                    ${MData[0][keys[i]]}
                </div>
            </div>`;
        }else{
            htmlStr +=
            `<div class="col-6" id="${keys[i]}">
            <input type="text" value="${MData[0][keys[i]]}">
            </div>
        </div>`
        }
    }
    htmlStr += `<div class="row text-center mt-3 mb-5">
    <div class="col-12">
    <button type="button" class="btn btn-primary" onclick="editable()">編輯/儲存</button>
    </div>
    </div>
    </div>`;
    // console.log(htmlStr);
    $('#MData').html(htmlStr);
}

// update text
function editable(){
    enable = !enable;
    M_Edit(g_MData);
    data = document.getElementById("#MData").value;
    console.log(data);
}
