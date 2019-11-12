import _ from 'lodash';

export default class Transformer {
  constructor(format, ...data) {
    this.format = format;
    this.data = _.merge({}, ...data);
    this.transformedData = {};
  }

  transform() {
    if (this.data) {
      const properties = Object.keys(this.data);
      properties.forEach(property => {
        this.traverse(
          this.format[property],
          this.transformedData,
          this.data[property]
        );
      });
    }
    return this.transformedData;
  }

  traverse(tree, transformation, replacement) {
    if (this.isLeaf(tree)) {
      this.handleLeaf(tree, transformation, replacement);
    } else if (tree != null) {
      const branches = Object.keys(tree);
      branches.forEach(branch => {
        this.traverse(
          tree[branch],
          this.createTree(transformation, branch),
          replacement
        );
      });
    }
  }

  createTree(tree, node) {
    if (!tree.hasOwnProperty(node)) {
      tree[node] = {};
    }

    return tree[node];
  }

  handleLeaf(tree, transformation, replacement) {
    if (this.isString(tree)) {
      transformation[tree] = replacement;
    }
    if (this.isFunction(tree)) {
      const [branch, node] = tree(replacement);
      transformation[branch] = node;
    }
  }

  isLeaf(tree) {
    return this.isString(tree) || this.isFunction(tree);
  }

  isString(tree) {
    return typeof tree === 'string';
  }

  isFunction(tree) {
    return typeof tree === 'function';
  }
}
