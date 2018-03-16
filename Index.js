var d3 = require('d3');
var axios = require('axios');


var width = 1400;
var height = 800;

var data = [];

axios.get("http://127.0.0.1:8000/stack/tags/")
    .then(function(res){
        data = (res.data);
        console.log(data.map(function(p){return p.count}));
        createCircle(data);
    })
    .catch(function(error){
        console.log(error)
    });




function createCircle(d){
    var col;
    var svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
    for(var i = 0;i<d.length;i++){

        svg.append('circle')
            .style('fill', getRandomColor())
            .style('stroke', 'black')
            .attr('cx', locationX[i])
            .attr('cy', locationY[i])
            .attr('r', (d[i].count)/15)
            .on('mouseover', function(){
                col = d3.select(this).style('fill');
                d3.select(this)
                    .style('fill', 'orange');
            })
            .on('mouseout', function(){
                d3.select(this).style('fill', col);
            });
            svg.append('text')
                .attr('x', locationX[i])
                .attr('y', locationY[i])
                .attr('font-size', d[i].count/100)
                .text(d[i].name);

    }

}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomNumGen(num, axis){
    var locX,locY = [];

    locX = Math.floor(Math.random() * num) + 50;
    locY = Math.floor(Math.random() * num) + 50 ;
    if(axis === 'x'){

        return locX;
    }else if(axis === 'y'){
        console.log(locY + ',');
        return locY;
    }

}
var locationY= [705,
    714,
    415,
    137,
    575,
    347,
    220,
    151,
    415,
    620,
    590,
    266,
    396,
    359,
    101,
    571,
    261,
    547,
    439,
    690,
    553,
    699,
    100,
    416,
    344,
    52,
    528,
    460,
    158,
    532];

var locationX = [136,
    496,
    779,
    1026,
    632,
    931,
    1099,
    118,
    446,
    1275,
    496,
    66,
    1196,
    335,
    706,
    1178,
    1281,
    804,
    1080,
    270,
    351,
    1024,
    437,
    157,
    590,
    1121,
    182,
    595,
    864,
    931];
