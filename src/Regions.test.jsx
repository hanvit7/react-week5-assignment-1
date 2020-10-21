import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import regions from '../__fixtures__/regions';

import Regions from './Regions';

jest.mock('react-redux');

describe('Regions', () => {
  const handleClickRegion = jest.fn();
  it('show button text', () => {
    const selectedRegion = '서울';

    const { container } = render((
      <Regions
        regions={regions}
        selectedRegion={selectedRegion}
        onClick={handleClickRegion}
      />
    ));

    regions.forEach(({ name }) => {
      const buttonText = selectedRegion === name
        ? `${name}(v)`
        : name;
      expect(container).toHaveTextContent(buttonText);
    });
  });

  context('when the button clicked', () => {
    it('run onClick function', () => {
      const { container, getByText } = render((
        <Regions
          regions={regions}
          onClick={handleClickRegion}
        />
      ));

      regions.forEach(({ name }) => {
        expect(container).toHaveTextContent(name);
        fireEvent.click(getByText(name));
      });

      expect(handleClickRegion).toBeCalledTimes(regions.length);
    });
  });
});
