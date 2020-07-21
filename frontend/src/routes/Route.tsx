import React from 'react';
import {
  Route as RouteDOM,
  RouteProps as RouteDOMProps,
  Redirect,
} from 'react-router-dom';

// import { Container } from './styles';
import { useAuth } from '../hooks';

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
