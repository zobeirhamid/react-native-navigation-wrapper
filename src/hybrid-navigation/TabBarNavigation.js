function Hybrid(Tab, Stack) {
  function TabBarNavigation(tabBarOptions, tabContainerFunction) {
    const tabContainerFunctionHOC = tabCallback =>
      tabContainerFunction((tabOptions, index) => {
        const Component = Stack.createStackRoot(tabOptions.route);
        Tab.initiateScreen(
          'tab-' + index,
          Tab.Screen({
            Component,
            options: {
              header: { visible: false },
              tabBar: { drawBehind: true }
            }
          })
        );
        return tabCallback({
          ...tabOptions,
          route: 'tab-' + index
        });
      });

    return Tab.createTabRoot(tabBarOptions, tabContainerFunctionHOC);
  }

  return TabBarNavigation;
}

export default Hybrid;
