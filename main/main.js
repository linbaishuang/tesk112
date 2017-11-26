const main = require('../main/main');
var datbase = require('../main/datbase');
module.exports.main = function main() {
    console.log("Debug Info");
    return 'Hello World!';

};

module.exports.printInventory = function printInventory(inputs) {
    var str = "";
    var name = "";
    var money = 0;
    var loadarr = [];
    var norarr = [];
    var givearr = [];
    var loadthings = [];
    var printstr =  '***<没钱赚商店>购物清单***\n';
    var loadPromotions = datbase.loadPromotions();
    var loadAll = datbase.allItems();

    for(var i=0;i<inputs.length;i++){
        //筛选出有几个
        var inputitem = inputs[i];
        var itemnum;
        var count1 = 0;
        var count2 = 1;
        var barcode;
        if(inputitem.length > 10){
            var index = inputitem.indexOf("-");
            str = inputitem.substr(0,index);
            count1 = Number(inputitem.substr(index+1,inputitem.length));
            for(var b=0;b<loadAll.length;b++){
                if(str === loadAll[b].barcode){
                    name = loadAll[b].name;
                    barcode = loadAll[b].barcode;
                    money = loadAll[b].price;
                    loadthings.push(名称 = name);
                    loadthings.push(二维码 = barcode);
                    loadthings.push(数量 = count1);
                    loadthings.push(单价 = money.toFixed(2));
                }

            }
        }
        else{
            str = inputitem;
            for(var c=0;c<loadAll.length;c++){
                if(str === loadAll[c].barcode){
                    name = loadAll[c].name;
                    barcode = loadAll[c].barcode;
                    money = loadAll[c].price;
                }
            }
            for(var a=0;a<inputs.length;){
                if(inputs[i] === inputs[a] && i != a){
                    count2 ++;
                    inputs.splice(a,1);
                }else {
                    a++;
                }
            }
            loadthings.push(名称 = name);
            loadthings.push(二维码 = barcode);
            loadthings.push(数量 = count2);
            loadthings.push(单价 = money.toFixed(2));
        }
    }

    //判断是否满足满二赠一
    for(var d=1;d<loadthings.length;){
        for(var e=0;e<loadPromotions[0].barcodes.length;e++){
            if(loadthings[d] === loadPromotions[0].barcodes[e]){
                var givenum = parseInt(loadthings[d+1]/2);
                if(givenum){
                    givearr.push(名称 = loadthings[d-1]);
                    givearr.push(数量 = 1);
                }
            }
        }
        d = d+4;
    }

    //字符串拼接  loadthings  givearr
    var allmoney = 0;
    var savemoney =0;
    for(var f=0;f<loadthings.length;){
        var printstrs1 = "名称：" +loadthings[f]+ "，数量：" +parseFloat(loadthings[f+2])+ "瓶，单价：" + loadthings[f+3];
        var printstrs2 = "名称：" +loadthings[f]+ "，数量：" +parseFloat(loadthings[f+2])+ "斤，单价：" + loadthings[f+3];

        for(var g=0;g<givearr.length;){
            var deletemoney1 = loadthings[f+2] * loadthings[f+3] - givearr[g+1] * loadthings[f+3];
            if(loadthings[f] === givearr[g] && loadthings[f] === "方便面"){
                printstr += "名称：" +loadthings[f]+ "，数量：" +parseFloat(loadthings[f+2])+ "袋，单价：" + loadthings[f+3] + "(元)，小计：" + deletemoney1.toFixed(2) + "(元)\n";
                allmoney += deletemoney1;
                savemoney += givearr[g+1] * loadthings[f+3];
                break;
            }
            else if(loadthings[f] === givearr[g] && loadthings[f] === "雪碧"){
                printstr += "名称：" +loadthings[f]+ "，数量：" +parseFloat(loadthings[f+2])+ "瓶，单价：" + loadthings[f+3] + "(元)，小计：" + deletemoney1.toFixed(2) + "(元)\n";
                allmoney += deletemoney1;
                savemoney += givearr[g+1] * loadthings[f+3];
                break;
            }
            else if(g === givearr.length-2){
                var deletemoney2 = loadthings[f+2] * loadthings[f+3];
                printstr += printstrs2 + "(元)，小计：" + deletemoney2.toFixed(2) + "(元)\n";
                allmoney +=  deletemoney2;
                break;
            }
            else {
                g = g+2;
            }
        }
        f = f+4;
    }
    printstr += '----------------------\n挥泪赠送商品：\n';
    for(var h=0;h<givearr.length;){
        if(givearr[h] === "方便面"){
            printstr += '名称：' +givearr[h]+ '，数量：' + givearr[h+1] + '袋\n';
        }else{
            printstr += '名称：' +givearr[h]+ '，数量：' + givearr[h+1] + '瓶\n';

        }
        h = h+2;
    }
    printstr += '----------------------\n总计：' + allmoney.toFixed(2) + '(元)\n节省：' + savemoney.toFixed(2) + '(元)\n**********************' ;
    //


    console.log(printstr);
    // console.log(allmoney);
    // console.log(loadthings);

}







