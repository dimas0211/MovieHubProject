/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ioc } from '../index';

const connectWithIoC = (dependencies) => (WrappedComponent) => {
  const resolveDependenciesList = (iocContainer) => {
    if (!iocContainer) {
      throw new Error('[connectWithIoC] Could not find "iocContainer"');
    }

    if (!Array.isArray(dependencies)) {
      throw new Error('[connectWithIoC] dependencies should be an array');
    }
    const listOfSevices = dependencies.reduce(
      (result, serviceName) => {
        const service = iocContainer.resolve(serviceName);

        if (typeof service === 'undefined') {
          throw new Error(`[connectWithIoC] "${serviceName}" was not found in IocContainer`);
        }
        // eslint-disable-next-line no-param-reassign
        result[serviceName] = service;

        return result;
      },
      {}
    );

    return listOfSevices;
  };

  return function (props) {
    return (
      <WrappedComponent
        {...resolveDependenciesList(ioc)}
        {...props}
      />
    );
  };
};

export default connectWithIoC;

