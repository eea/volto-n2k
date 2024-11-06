import { render } from '@testing-library/react';
import Chart from './Chart';
import '@testing-library/jest-dom/extend-expect';

describe('Chart', () => {
  it('renders with children and correctly sets up the SVG and context', () => {
    const { getByTestId, container } = render(
      <Chart width="100%" height="400px">
        <div data-testid="bars">Bars</div>
        <div data-testid="legend">Legend</div>
      </Chart>,
    );

    // Check if SVG is rendered with correct properties
    expect(container.querySelector('.chart-wrapper')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 100% 400px',
    );

    // Check for the presence of Bars and Legend
    expect(getByTestId('bars')).toBeInTheDocument();
    expect(getByTestId('legend')).toBeInTheDocument();
  });
});
