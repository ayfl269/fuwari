import { visit } from "unist-util-visit";

export function rehypeLazyLoadImage() {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "img") {
				node.properties = node.properties || {};
				node.properties.loading = "lazy";
				node.properties.decoding = "async";

				const classes = node.properties.className || [];
				node.properties.className = [
					...(Array.isArray(classes) ? classes : [classes]),
					"opacity-0",
					"transition-opacity",
					"duration-500",
				];
				node.properties.onload = "this.classList.remove('opacity-0')";
			}
		});
	};
}
