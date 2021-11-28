let lang = true;
let g_Mdata = undefined;
// make choose E button and show the model list of the exhibiton
function EButton(EData) {
    let htmlStr = `<div class="col-3"><a class="btn btn-primary" href="/AllModelList">所有模型</a></div>`
    for (let i = 0; i < EData.length; i++) {
        console.log(EData);
        htmlStr += `<div class="col-3"><a class="btn btn-primary" href="/AllModelList?id=${EData[i]["E_ID"]}">${EData[i]["E_Name"]}</a></div>`
        if ((i + 1) % 4 == 0) {
            htmlStr += `</div><div class="row">`
        }
    }
    htmlStr += `</div>`
    // console.log(htmlStr);
    $('#choosebtn').append(htmlStr);
}
// show E_Pic
function showEPic(exData) {
    let htmlStr = `<div class="row text-center ml-0 mr-0">`
    for (let i = 0; i < exData.length; i++) {
        // console.log(exData[i].E_Pic);
        htmlStr += `<div class="col-4 pt-5"><a href="/ExhibitionList?id=${i + 1}"><img class="img-thumbnail w-75" src="${exData[i]["E_Pic"]}"></a></div>`
        if ((i + 1) % 3 == 0) {
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
                htmlStr += `<div class='row'><div class="col-md-4 pt-3"><audio controls><source src="${Mdata[0][keys[8]]}" type="audio/mpeg"></audio></div></div><div class="row" id="${keys[i]}"><div class="col-md-10 pt-3">${title[i]}${Mdata[0][keys[i]]}</div></div><div class="row"><div class="col-md-6 pt-3"><button onclick="changeLanguage()" type="button" class="btn btn-secondary btn-md">顯示國語</button>
                </div></div>`
            } else {
                htmlStr += `<div class='row'><div class="col-md-4 pt-3"><audio controls><source src="${Mdata[0][keys[8]]}" type="audio/mpeg"></audio></div></div><div class="row" id="${keys[6]}"><div class="col-md-10 pt-3">${title[6]}${Mdata[0][keys[6]]}</div></div><div class="row"><div class="col-md-6 pt-3"><button onclick="changeLanguage()" type="button" class="btn btn-secondary btn-md">顯示臺語</button>
                </div></div>`
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
    showModel(g_Mdata);
}

// panellum
function showP(modelData){
    console.log(modelData);
    let keys = Object.keys(modelData[0]);
    // console.log(keys);
    pannellum.viewer('panorama', {
        "type": "cubemap",
        "cubeMap": [
            "/images/P_Pic/cube_front.jpg", // F
            "/images/P_Pic/2圖-5000.png",     // R
            "/images/P_Pic/cube_front.jpg", // B
            "/images/P_Pic/2字-5000.png",     // L
            "/images/P_Pic/cube_T.png",  //TOP
            "/images/P_Pic/cube_T.png"  //BOTTOM
        ],
        "autoLoad": true,
        "autoRotate": -3,
        "maxLevel":6,
        "hfov":200,
        "cssClass": "custom-hotspot",
        // "hotSpotDebug": true,
        "hotSpots": [
         {
             "pitch": -10,
             "yaw": 0,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[0][keys[1]],
                 "text": modelData[0][keys[2]],
                 "glb": modelData[0][keys[3]],
                 "img": modelData[0][keys[4]]
            }
         },
         {
             "pitch": -10,
             "yaw": 35,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[1][keys[1]],
                 "text": modelData[1][keys[2]],
                 "glb": modelData[1][keys[3]],
                 "img": modelData[1][keys[4]]
            }
         },
         {
             "pitch": -10,
             "yaw": -35,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[2][keys[1]],
                 "text": modelData[2][keys[2]],
                 "glb": modelData[2][keys[3]],
                 "img": modelData[2][keys[4]]
            }
         },
         {
             "pitch": -10,
             "yaw": 145,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[3][keys[1]],
                 "text": modelData[3][keys[2]],
                 "glb": modelData[3][keys[3]],
                 "img": modelData[3][keys[4]]
            }
         },
         {
             "pitch": -10,
             "yaw": 180,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[4][keys[1]],
                 "text": modelData[4][keys[2]],
                 "glb": modelData[4][keys[3]],
                 "img": modelData[4][keys[4]]
            }
         },
         {
             "pitch": -10,
             "yaw": 215,
             "createTooltipFunc": setHotspot,
             "createTooltipArgs": {
                 "id": modelData[5][keys[1]],
                 "text": modelData[5][keys[2]],
                 "glb": modelData[5][keys[3]],
                 "img": modelData[5][keys[4]]
            }
          },
          {
            "pitch": 10,
            "yaw": 0,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[6][keys[1]],
                "text": modelData[6][keys[2]],
                "glb": modelData[6][keys[3]],
                "img": modelData[6][keys[4]]
           }
         },
         {
            "pitch": 10,
            "yaw": 35,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[7][keys[1]],
                "text": modelData[7][keys[2]],
                "glb": modelData[7][keys[3]],
                "img": modelData[7][keys[4]]
           }
         },
         {
            "pitch": 10,
            "yaw": -35,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[8][keys[1]],
                "text": modelData[8][keys[2]],
                "glb": modelData[8][keys[3]],
                "img": modelData[8][keys[4]]
           }
         },
         {
            "pitch": 10,
            "yaw": 145,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[9][keys[1]],
                "text": modelData[9][keys[2]],
                "glb": modelData[9][keys[3]],
                "img": modelData[9][keys[4]]
           }
         },
         {
            "pitch": 10,
            "yaw": 180,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[10][keys[1]],
                "text": modelData[10][keys[2]],
                "glb": modelData[10][keys[3]],
                "img": modelData[10][keys[4]]
           }
         },
         {
            "pitch": 10,
            "yaw": 215,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[11][keys[1]],
                "text": modelData[11][keys[2]],
                "glb": modelData[11][keys[3]],
                "img": modelData[11][keys[4]]
           }
         },
         {
            "pitch": 0,
            "yaw": 50,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[12][keys[1]],
                "text": modelData[12][keys[2]],
                "glb": modelData[12][keys[3]],
                "img": modelData[12][keys[4]]
           }
         },
         {
            "pitch": 0,
            "yaw": 95,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[13][keys[1]],
                "text": modelData[13][keys[2]],
                "glb": modelData[13][keys[3]],
                "img": modelData[13][keys[4]]
           }
         },
         {
            "pitch": 0,
            "yaw": 130,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[14][keys[1]],
                "text": modelData[14][keys[2]],
                "glb": modelData[14][keys[3]],
                "img": modelData[14][keys[4]]
           }
         },
         {
            "pitch": 0,
            "yaw": -50,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[15][keys[1]],
                "text": modelData[15][keys[2]],
                "glb": modelData[15][keys[3]],
                "img": modelData[15][keys[4]]
           }
         },{
            "pitch": 0,
            "yaw": -95,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[16][keys[1]],
                "text": modelData[16][keys[2]],
                "glb": modelData[16][keys[3]],
                "img": modelData[16][keys[4]]
           }
         },{
            "pitch": 0,
            "yaw": -130,
            "createTooltipFunc": setHotspot,
            "createTooltipArgs": {
                "id": modelData[17][keys[1]],
                "text": modelData[17][keys[2]],
                "glb": modelData[17][keys[3]],
                "img": modelData[17][keys[4]]
           }
         }
        ]
    });
};


function setHotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('custom-tooltip');
    var span = document.createElement('span');
    span.innerHTML = args.text;

    //console.log(hotSpotDiv,args)
    hotSpotDiv.appendChild(span);

    var elem = document.createElement("img");
    hotSpotDiv.appendChild(elem);
    elem.setAttribute("id",args.id);
    elem.setAttribute("width", "130vw");
    elem.setAttribute("data-bs-toggle", "modal");  // set an inner window to put model
    elem.setAttribute("data-bs-target", "#exampleModal");
    elem.setAttribute("alt",args.text);
    elem.style.marginRight = 15 + 'vw';
    elem.style.paddinfRight = 15 + 'vw';
    
    elem.src = args.img;
    elem.addEventListener("click", function(e)  { //function(e) 去 get id
        // console.log(e.target.id);
        const myEvent = new CustomEvent('clickPic', {detail:{id:e.target.id}});
        window.dispatchEvent(myEvent);
        // functionname(e.target.id)
    });
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';
}
