import { render, screen } from '@testing-library/react';

import { Text } from './Text';
import { TextTones, TextTypes } from './Text.types';

describe('Text', () => {
  it('renders block kinds as a paragraph', () => {
    render(<Text kind={TextTypes.P} label="Hola" />);

    expect(screen.getByText('Hola').tagName).toBe('P');
  });

  it('renders inline kinds as a span', () => {
    render(<Text kind={TextTypes.Label} label="Stack" />);

    expect(screen.getByText('Stack').tagName).toBe('SPAN');
  });

  it('applies the kind and tone styles', () => {
    render(<Text kind={TextTypes.Caption} label="2026" tone={TextTones.Muted} />);

    expect(screen.getByText('2026')).toHaveClass('caption', 'toneMuted');
  });
});
