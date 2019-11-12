export default function StackNavigation(Component, options, passProps) {
  return {
    stack: {
      children: [
        {
          component: {
            name: typeof Component === 'function' ? Component.name : Component,
            passProps
          }
        }
      ],
      options
    }
  };
}
