import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

const rehypeNormalizeComponents: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: any) => {
      // List of components we want to normalize
      const components = ['log'];
      
      if (node && typeof node.tagName === 'string' && components.includes(node.tagName.toLowerCase())) {
        // Convert to title case (e.g., 'log' -> 'Log')
        node.tagName = node.tagName.charAt(0).toUpperCase() + 
                      node.tagName.slice(1).toLowerCase();
      }
    });
  };
};

export default rehypeNormalizeComponents;