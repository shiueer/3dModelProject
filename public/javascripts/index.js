let lang = true;
let g_Mdata = undefined;

// show E_Pic
function showEPic(Edata) {
    //console.log(Edata);
    let htmlStr = `<div class="row align-items-center"><div class="col-12"><p class="h1 text-center text-white pt-5">- 主題展覽 -</p></div>`
    for (let i = 0; i < Edata.length; i++) {
        // console.log(Edata[i].E_Pic);
        htmlStr += `<div class="col-6"><a href="/ExhibitionList?id=${i + 1}"><img class="img-thumbnail w-50" src="${Edata[i]["E_Pic"]}"></a></div>`
        if ((i + 1) % 4 == 0) {
            htmlStr += `</div><div class="row">`
        }
    }
    htmlStr += `</div>`
    // console.log(htmlStr);
    $('#exhibition').append(htmlStr);
}

// show M_Pic
function showMPic(Mdata) {
    // console.log(Mdata);
    let htmlStr = `<div class="row align-items-center">`
    for (let i = 0; i < Mdata.length; i++) {
        // console.log(Mdata[i].M_Pic);
        // console.log(Mdata[i].M_ID);
        htmlStr += `<div class="col-4"><div class="card bg-white"><a href="/ModelView?id=${Mdata[i]["M_ID"]}"><img class="img-fluid img-thumbnail card-img" src="${Mdata[i]["M_Pic"]}"></a><div class="card-body"><h5 class="card-title text-center">${Mdata[i]["M_Name"]}</h5></div></div></div>`
        if ((i + 1) % 3 == 0) {
            htmlStr += `</div><div class="row">`
        }
    }
    // htmlStr += `</div>`
    // console.log(htmlStr);
    $('#exhibitionList').append(htmlStr);
}

// show models
function showModel(Mdata){
    g_Mdata = Mdata
    // console.log(Object.keys(Mdata[0]));
    // console.log(typeof(Mdata));
    // console.log(Mdata);
    let htmlStr = ``
    let keys = Object.keys(Mdata[0])
    var title = ['編號：', '作品名稱：', '創作年代：', '作品尺寸：', '作者：', '作品說明：', '作品說明：', '', '', '', '']
    // console.log(typeof(keys));
    // console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        if(keys[i] != "M_R_N" && keys[i] != "M_R_S" && keys[i] != "M_Pic" && keys[i] != "M_Path" && keys[i] != "M_Name" && keys[i] != "M_Story_C"&& keys[i] != "M_Story_T"){
            htmlStr += `<div class="row" id="${keys[i]}"><div class="col-md-12 pt-3">${title[i]}${Mdata[0][keys[i]]}</div></div>`
            // console.log("this is not showing : ",htmlStr);
        }
        if(keys[i] == "M_Name"){
            htmlStr += `<div class='row'><div class="col-md-12 pt-3"><audio id = "a" controls><source src="${Mdata[0][keys[7]]}" type="audio/mpeg"></audio></div></div><div class="row" id="${keys[i]}"><div class="col-md-12 pt-3">${title[i]}${Mdata[0][keys[i]]}</div></div>`
            // htmlStr += `<div class='row'><div class="col-md-12 pt-3"><audio controls><source src="${Mdata[0][keys[7]]}" type="audio/mpeg"></audio></div></div><div class="row" id="${keys[i]}"><div class="col-md-12 pt-3">${title[i]}${Mdata[0][keys[i]]}</div></div>`
            // console.log("this is M_Name : ",htmlStr);
        }
        if(keys[i] == "M_Story_T"){
            if (lang) {
                htmlStr += `<div class='row'><div class="col-md-4 pt-3"><audio controls><source src="${Mdata[0][keys[8]]}" type="audio/mpeg"></audio></div><div class="col-md-6 pt-3"><button onclick="changeLanguage()" type="button" class="btn btn-secondary btn-md">顯示國語</button>
                </div></div><div class="row" id="${keys[i]}"><div class="col-md-10 pt-3">${title[i]}${Mdata[0][keys[i]]}</div></div>`
            } else {
                htmlStr += `<div class='row'><div class="col-md-4 pt-3"><audio controls><source src="${Mdata[0][keys[8]]}" type="audio/mpeg"></audio></div><div class="col-md-6 pt-3"><button onclick="changeLanguage()" type="button" class="btn btn-secondary btn-md">顯示臺語</button>
                </div></div><div class="row" id="${keys[6]}"><div class="col-md-10 pt-3">${title[6]}${Mdata[0][keys[6]]}</div></div>`
            }
            // console.log(Mdata[0][keys[5]]);
            // console.log("this is M_story : ", htmlStr);
        };
    };
    // htmlStr += `</div>`
    // console.log(htmlStr);
    $('#modeldisplay').html(htmlStr);
}

// change story's language
function changeLanguage(){
    // console.log('g_Mdata');
    // console.log(g_Mdata);
    lang = !lang;
    showModel(g_Mdata)
}