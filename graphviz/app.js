$(function() {
	function newNode(name, label) {
		return "  " + name + " [color=\"0.0, 0.0, 0.85\", label=\"" + label.toLowerCase() + "\"];";
	}
	function newEdge(parent, child) {
		return "  " + parent + " -> " + child;
	}
	function recurse(code, jqNode, path) {
		jqNode.children().each(function(i, child) {
			var jqChild = $(child);
			var childName = jqChild.prop("tagName").toLowerCase();
			var childPath = path + "_" + childName + i;
			code.push(newNode(childPath, childName));
			code.push(newEdge(path, childPath));
			
			recurse(code, jqChild, childPath);
		});
	}
	
	var root = $(document.documentElement);
	var code = [];
	code.push("digraph G {");
	code.push(newNode("html", root.prop("tagName")));
	recurse(code, root, "html");
	code.push("}");
	$("#code").val(code.join("\n"));
});
