"use strict";
var graph = new Springy.Graph();

var denominator_input_element = document.getElementById("denominator");
var base_input_element = document.getElementById("base");

var nodes = [];
var buckle_nodes = [];

function updateDiagram() {

  var denominator = denominator_input_element.value | 0;
  var base = base_input_element.value | 0;

  if (denominator != gup('d', 0) || base != gup('b', 0))
    window.history.pushState({}, "", "?d=" + denominator + "&b=" + base);

  for (var n = 0; n < nodes.length; n++)
    graph.detachNode(nodes[n]);

  for (n = nodes.length; n < denominator; n++)
    nodes.push(graph.newNode({label: n}));

  for (n = denominator; n < nodes.length; n++)
    graph.removeNode(nodes[n]);
  nodes.splice(denominator, nodes.length - denominator);

  for (n = 0; n < buckle_nodes.length; n++)
    graph.removeNode(buckle_nodes[n]);
  buckle_nodes.splice(0, buckle_nodes.length);

  for (n = 0; n != denominator; n++) {
    var label = (n * base) / denominator | 0;
    var to_node = (n * base) % denominator;
    if (to_node == n) {
      if (n) {
        var a = graph.newNode();
        var b = graph.newNode();
        buckle_nodes.push(a);
        buckle_nodes.push(b);
        graph.newEdge(nodes[n], a, {directional: false});
        graph.newEdge(a, b, {label: label});
        graph.newEdge(b, nodes[to_node], {directional: false});
      }
    } else {
      graph.newEdge(nodes[n], nodes[to_node], {label: label, length: 2});
    }
  }
}

denominator_input_element.addEventListener("change", updateDiagram);
base_input_element.addEventListener("change", updateDiagram);

function set_input_from_url() {
  denominator_input_element.value = '' + gup('d', 56);
  base_input_element.value = '' + gup('b', 10) | 0
}
set_input_from_url();

window.addEventListener("popstate", function (evt) {
  set_input_from_url();
  updateDiagram();
});

updateDiagram();

$(function () {
  window.springy = $('#springy').springy({
    graph: graph
  });
});