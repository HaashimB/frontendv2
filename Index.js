var d3 = require('d3');
var axios = require('axios');


var width = 1400;
var height = 800;

var data = [];
var dataChild = [];
axios.get("http://127.0.0.1:8000/stack/tags/")
    .then(function(res){
        data = (res.data);
        console.log(data.map(function(p){return p.content}));
        //createCircle(data);
    })
    .catch(function(error){
        console.log(error)
    });
dataChild = data.map(function(p){return p.content});

var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.json(datachild, function(error, root) {
    if (error) throw error;

    root = d3.hierarchy(root.content)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });

    var focus = root,
        nodes = pack(root).descendants(),
        view;

    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) { return d.children ? color(d.depth) : null; })
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

    var text = g.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
        .text(function(d) { return d.data.name; });

    var node = g.selectAll("circle,text");

    svg
        .style("background", color(-1))
        .on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
        var focus0 = focus; focus = d;

        var transition = d3.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function(d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function(t) { zoomTo(i(t)); };
            });

        transition.selectAll("text")
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
        var k = diameter / v[2]; view = v;
        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        circle.attr("r", function(d) { return d.r * k; });
    }
});


function getRandomColor(upperLim){
    var color = d3.scaleLinear()
        .domain([0,upperLim])
        .range(["#b7d3ff","#1a55b2"]);

    return color(Math.floor(Math.random()* upperLim));
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
    599,
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
