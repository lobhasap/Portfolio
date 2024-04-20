function createTree() {
  treeJSON = d3.json("interests.json", function (g) {
    console.log(g), console.log("running");
    var o,
      h = 0,
      D = 0,
      u = 750,
      v = $(window).width(),
      p = $(window).height();
    $(window).resize(function () {
      (v = $(window).width()),
        (p = $(window).height()),
        console.log("doc height is " + $(window).height());
    });
    var s = d3.layout.tree(),
      m = d3.svg.diagonal().projection(function (t) {
        return [t.y, t.x];
      });
    (function k(t, n, r) {
      if (t) {
        n(t);
        var c = r(t);
        if (c) for (var d = c.length, f = 0; f < d; f++) k(c[f], n, r);
      }
    })(
      g,
      function (t) {
        h = Math.max(t.name.length, h);
      },
      function (t) {
        return t.children && t.children.length > 0 ? t.children : null;
      }
    ),
      console.log(h);
    var a = d3.behavior
        .zoom()
        .scaleExtent([0.1, 3])
        .on("zoom", function X() {
          l.attr(
            "transform",
            "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"
          );
        }),
      Y = d3
        .select("#tree-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "overlay")
        .call(a);
    function _(t) {
      t.children &&
        ((t._children = t.children),
        t._children.forEach(_),
        (t.children = null));
    }
    var j = function (t) {
        (selectedNode = t), N();
      },
      H = function (t) {
        (selectedNode = null), N();
      },
      N = function () {
        var t = [];
        null !== draggingNode &&
          null !== selectedNode &&
          (t = [
            {
              source: { x: selectedNode.y0, y: selectedNode.x0 },
              target: { x: draggingNode.y0, y: draggingNode.x0 },
            },
          ]);
        var n = l.selectAll(".templink").data(t);
        n
          .enter()
          .append("path")
          .attr("class", "templink")
          .attr("d", d3.svg.diagonal())
          .attr("pointer-events", "none"),
          n.attr("d", d3.svg.diagonal()),
          n.exit().remove();
      };
    function S(t) {
      (scale = a.scale()),
        (x = -t.y0),
        (y = -t.x0),
        (x = x * scale + v / 2),
        (y = y * scale + p / 2),
        d3
          .select("g")
          .transition()
          .duration(u)
          .attr(
            "transform",
            "translate(" + x + "," + y + ")scale(" + scale + ")"
          ),
        a.scale(scale),
        a.translate([x, y]);
    }
    function B(t) {
      A(
        (t = (function W(t) {
          return (
            t.children
              ? ((t._children = t.children), (t.children = null))
              : t._children &&
                ((t.children = t._children), (t._children = null)),
            t
          );
        })(t))
      ),
        S(t);
    }
    function A(t) {
      var n = [1],
        r = function (e, i) {
          i.children &&
            i.children.length > 0 &&
            (n.length <= e + 1 && n.push(0),
            (n[e + 1] += i.children.length),
            i.children.forEach(function (J) {
              r(e + 1, J);
            }));
        };
      r(0, o);
      var c = 25 * d3.max(n),
        d = (s = s.size([c, v])).nodes(o).reverse(),
        f = s.links(d);
      d.forEach(function (e) {
        e.y = e.depth * (10 * h);
      }),
        (node = l.selectAll("g.node").data(d, function (e) {
          return e.id || (e.id = ++D);
        }));
      var w = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (e) {
          return "translate(" + t.y0 + "," + t.x0 + ")";
        })
        .on("click", B);
      w
        .append("circle")
        .attr("class", "nodeCircle")
        .attr("r", 5)
        .style("fill", function (e) {
          return e._children ? "lightsteelblue" : "";
        }),
        w
          .append("text")
          .attr("x", function (e) {
            return e.children || e._children ? -10 : 10;
          })
          .attr("dy", ".35em")
          .attr("text-anchor", function (e) {
            return e.children || e._children ? "end" : "start";
          })
          .text(function (e) {
            return e.name;
          })
          .style("fill-opacity", 0),
        w
          .append("circle")
          .attr("class", "ghostCircle")
          .attr("r", 30)
          .attr("opacity", 0.2)
          .style("fill", "red")
          .attr("pointer-events", "mouseover")
          .on("mouseover", function (e) {
            j(e);
          })
          .on("mouseout", function (e) {
            H(e);
          }),
        node
          .select("text")
          .attr("x", function (e) {
            return e.children || e._children ? -10 : 10;
          })
          .attr("text-anchor", function (e) {
            return e.children || e._children ? "end" : "start";
          })
          .text(function (e) {
            return e.name;
          }),
        node
          .select("circle.nodeCircle")
          .attr("r", 2)
          .style("fill", function (e) {
            return e._children ? "lightsteelblue" : "#fff";
          }),
        node
          .transition()
          .duration(u)
          .attr("transform", function (e) {
            return "translate(" + e.y + "," + e.x + ")";
          })
          .select("text")
          .style("fill-opacity", 1);
      var T = node
        .exit()
        .transition()
        .duration(u)
        .attr("transform", function (e) {
          return "translate(" + t.y + "," + t.x + ")";
        })
        .remove();
      T.select("circle").attr("r", 0),
        T.select("text").style("fill-opacity", 0);
      var C = l.selectAll("path.link").data(f, function (e) {
        return e.target.id;
      });
      C.enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function (e) {
          var i = { x: t.x0, y: t.y0 };
          return m({ source: i, target: i });
        }),
        C.transition().duration(u).attr("d", m),
        C.exit()
          .transition()
          .duration(u)
          .attr("d", function (e) {
            var i = { x: t.x, y: t.y };
            return m({ source: i, target: i });
          })
          .remove(),
        d.forEach(function (e) {
          (e.x0 = e.x), (e.y0 = e.y);
        });
    }
    var l = Y.append("g");
    a.scale(1.7),
      console.log(a.scale() + "SDFDSFDSF"),
      ((o = g).x0 = p / 2),
      (o.y0 = 0),
      (function E(t) {
        t.children && (t.children.forEach(E), _(t));
      })(o),
      A(o),
      S(o);
  });
}
