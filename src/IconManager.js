import React from 'react';
import { Image } from 'react-native';

export default class IconManager {
  icons = {};

  addIcon(icon, { provider, name, size, color }) {
    this.icons[icon] = new Icon({
      provider,
      name,
      size,
      color
    });
  }

  getIcon(icon) {
    return this.icons[icon];
  }

  getIconComponent(icon) {
    return this.icons[icon].getComponent();
  }

  getIconImageSource(icon) {
    return this.icons[icon].getImageSource();
  }

  loadIcons() {
    return new Promise((resolve, reject) => {
      new Promise.all(
        Object.keys(this.icons).map(icon => this.icons[icon].fetchImageSource())
      ).then(sources => {
        Object.keys(this.icons).forEach((icon, index) =>
          this.icons[icon].setImageSource(sources[index])
        );
        resolve(true);
      });
    });
  }
}

export class Icon {
  constructor({ provider, name, size, color }) {
    this.provider = provider;
    this.name = name;
    this.size = size;
    this.color = color;
  }

  fetchImageSource() {
    return this.provider.getImageSource(this.name, this.size, this.color);
  }

  setImageSource(imageSource) {
    this.imageSource = imageSource;
  }

  getImageSource() {
    if (this.imageSource === undefined) {
      this.fetchImageSource();
    }

    return this.imageSource;
  }

  propertyExtractor(props) {
    return property => {
      if (props && props.hasOwnProperty(property)) return props[property];
      return this[property];
    };
  }

  getComponent(props) {
    const propertyExtractor = this.propertyExtractor(props);
    return (
      <this.provider
        name={propertyExtractor('name')}
        size={propertyExtractor('size')}
        color={propertyExtractor('color')}
      />
    );
    return (
      <Image
        source={this.imageSource}
        style={{
          width: this.size,
          height: this.size
        }}
      />
    );
  }
}
