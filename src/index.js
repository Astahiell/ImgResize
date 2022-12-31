var prompt = require('prompt');
prompt.start();
console.log("Choose resize option:")
console.log("1. Select 1 photo to change height and width.")
console.log("2. Select directory to change height and width")
prompt.get(['option'], function (err, result){
    switch(result.option){
        case "1":
            console.log("1. Automatically selected longer side and scale.");
            console.log("2. Select height and width by myself.");
            prompt.start;
            prompt.get(['option'], function (err, result){
                switch(result.option){
                    case "1":
                        prompt.get([{
                            name: 'file',
                            required: true
                        },{
                            name: 'value',
                            required: true
                        }], function (err, result) {
                            console.log(singleResizeLonger(result.file,result.value))
                        })                        
                        break;
                    case "2":
                        prompt.get([{
                            name: 'file',
                            required: true
                        },{
                            name: 'height',
                            required: true
                        },{
                            name:'width',
                            required: true
                        }], function (err, result) {
                            console.log(singleResize(result.file,result.height,result.width))
                        })
                        break;
                    default:
                        console.log("No option provided")
                }
            })
            break;
        case "2":
            console.log("1. Automatically selected longer side and scale.");
            console.log("2. Select height and width by myself.");
            prompt.get(['option'], function (err, result){
                switch(result.option){
                    case "1":
                        prompt.get([{
                            name: 'file',
                            required: true
                        },{
                            name: 'directory',
                            required: true
                        },{
                            name: 'value',
                            required: true
                        }], function (err, result) {
                            console.log(massResizeLonger(result.file,result.directory,result.value))
                        })                        
                        break;
                    case "2":
                        prompt.get([{
                            name: 'file',
                            required: true
                        },{
                            name: 'directory',
                            required: true
                        },{
                            name: 'height',
                            required: true
                        },{
                            name: 'width',
                            required: true
                        }], function (err, result) {
                            console.log(massResize(result.file,result.directory,result.height,result.width))
                        })
                        break;
                    default:
                        console.log("No option provided")
                }
            })
            break;
        default:
            console.log("No option provided")

    }
});
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function singleResizeLonger(file,value){
    answer = "Everything done correctly now wait for result image."
    var Jimp = require('jimp');
    var sizeOf = require('image-size');
    var dimensions = sizeOf(file);
    var lastThree = file.substr(file.length - 3);
    const fileEdit = file.slice(0,-4);
    if (dimensions.width > dimensions.height){
        Jimp.read(file, (err, lenna) => {
            if (err) throw err;
            lenna
            .resize(parseInt(value),Jimp.AUTO) 
            .quality(100) 
            .write(fileEdit + "-edit." + lastThree); 
        });
        return answer;
    }
    if (dimensions.height > dimensions.width){
        Jimp.read(file, (err, lenna) => {
            if (err) throw err;
            lenna
            .resize(Jimp.AUTO,parseInt(value)) 
            .quality(100) 
            .write(fileEdit + "-edit." + lastThree); 
        });
        return answer;
    }
    if (dimensions.height == dimensions.width)
        Jimp.read(file, (err, lenna) => {
            if (err) throw err;
            lenna
            .resize(parseInt(value),parseInt(value)) 
            .quality(100) 
            .write(fileEdit + "-edit." + lastThree); 
        });
    return answer;
}
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function singleResize(file,height,width){
    answer = "Everything done correctly now wait for result image."
    var Jimp = require('jimp');
    const fileedit = file.slice(0,-4);
    Jimp.read(file, (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(parseInt(height),parseInt(width)) 
          .quality(100) 
          .write(fileedit+"-edit"+".JPG"); 
      });
    return answer;
}
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function massResize (pathline,dir,height,width){
    const path = require('path');
    var sizeOf = require('image-size');
    var Jimp = require('jimp');
    var fs = require('fs');
    var files = fs.readdirSync(pathline);
    var answer = "";
    if (!fs.existsSync(pathline + "/" + dir)){
        fs.mkdirSync(pathline + "/" + dir);
    }
    files.forEach(file => {
        var stat = fs.lstatSync(pathline + "/" + file)
        if (stat.isDirectory()== false){
        if (path.extname(file) == ".jpg" || ".png" ){
            var dimensions = sizeOf(pathline + "/" + file);
            console.log (file)
            console.log (dimensions.width, dimensions.height);
            if (dimensions.width > dimensions.height){
                Jimp.read(pathline + "/" + file, (err, lenna) => {
                    if (err) throw err;
                    lenna
                      .resize(parseInt(width), parseInt(height)) 
                      .quality(100) 
                      .write(pathline + "/" + dir + "/" + file); 
                  });
            }
            if (dimensions.height > dimensions.width){
                Jimp.read(pathline + "/" + file, (err, lenna) => {
                    if (err) throw err;
                    lenna
                      .resize(parseInt(width), parseInt(height)) 
                      .quality(100) 
                      .write(pathline + "/" + dir + "/" + file); 
                  });
            }
        }
        } else {
            console.log(file);
            console.log("Log: Folder");
        }

    })
    return answer;
}
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function massResizeLonger (pathline,dir,value){
    const path = require('path');
    var sizeOf = require('image-size');
    var Jimp = require('jimp');
    var fs = require('fs');
    var files = fs.readdirSync(pathline);
    var answer = "";
    if (!fs.existsSync(pathline + "/" + dir)){
        fs.mkdirSync(pathline + "/" + dir);
    }
    files.forEach(file => {
        var stat = fs.lstatSync(pathline + "/" + file)
        if (stat.isDirectory()== false){
        if (path.extname(file) == ".jpg" || ".png" ){
            var dimensions = sizeOf(pathline + "/" + file);
            console.log (file)
            console.log (dimensions.width, dimensions.height);
            if (dimensions.width > dimensions.height){
                Jimp.read(pathline + "/" + file, (err, lenna) => {
                    if (err) throw err;
                    lenna
                      .resize(parseInt(value), Jimp.AUTO) 
                      .quality(100) 
                      .write(pathline + "/" + dir + "/" + file); 
                  });
            }
            if (dimensions.height > dimensions.width){
                Jimp.read(pathline + "/" + file, (err, lenna) => {
                    if (err) throw err;
                    lenna
                      .resize(Jimp.AUTO, parseInt(value)) 
                      .quality(100) 
                      .write(pathline + "/" + dir + "/" + file); 
                  });
            }
        }
        } else {
            console.log(file);
            console.log("Log: Folder");
        }

    })
    return answer;
}