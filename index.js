
// I DO NOT OWN ANY OF THE CODE TO DO WITH D3, THIS IS FROM HERE -> https://bl.ocks.org/mbostock/7607535
var svg = d3.select("svg"),
    margin = 10,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-6, 5])
    .range(["hsl(110,80%,80%)", "hsl(200,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

async function loadPage(month){
    removeD3Elements();
    console.log(month.id);
    console.log('Calling API...');
    result = await callAPI(month.id);
    console.log('Got result!', result);
    data = result.data;
    list = data.map(function(p){return p.content});
    json = list[0];

    loadD3(json);
}
function callAPI(m) {
    var address = "http://67.207.71.67:8080/stack/" + m;
    return axios.get(address);
}

function removeD3Elements(){
    console.log("removing elements");
    g.selectAll("*").remove()

}


function loadD3(j) {
    //ALL OF THE FOLLOWING CODE IS FROM HERE --> https://bl.ocks.org/mbostock/7607535
    d3.json(j , function(error, root) {
        console.log('Continued');
        root  = j;
        root = d3.hierarchy(root)
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

        var txtSize = 15;
        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("font-size",  txtSize + "px")
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
            .text(function(d) { return d.data.name; });

        var node = g.selectAll("circle,text");

        svg
            .style("background", color(-1))
            .on("click", function() { zoom(root); });

        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            var focus0 = focus;
            focus = d;
            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                    var foc = [focus.x, focus.y, focus.r * 2 + margin];
                    var i = d3.interpolateZoom(view, foc);
                    if(view > foc){
                        console.log("zooming in: " + view);
                        txtSize  = 20;
                        g.selectAll("text").style("font-size", txtSize + "px")
                    }else{
                        console.log("zooming out: " +  view);
                        txtSize = 15;
                        g.selectAll("text").style("font-size", txtSize + "px")
                    }

                    return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
                .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline";})
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none";});
        }

        function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });

        }
    });
}
//DROP DOWN LIST TAKEN AND RECREATED FROM HERE -> https://www.w3schools.com/howto/howto_js_dropdown.asp
function dropDown() {
    document.getElementById("myDropdown1").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
// POP UP TAKEN AND RECREATED FROM HERE -> https://www.w3schools.com/howto/howto_js_popup.asp
function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}