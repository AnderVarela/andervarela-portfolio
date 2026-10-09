import { fireEvent, render, screen } from '@testing-library/react';

import { IconNames } from '@/components/ui/Icon/Icon.types';

import { Button } from './Button';
import { ButtonLabelVisibilities } from './Button.types';

describe('Button', () => {
  it('calls onClick when pressed', () => {
    const handleClick = vi.fn();
    render(<Button label="Descargar CV" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Descargar CV' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('keeps an accessible name when the label is hidden', () => {
    render(
      <Button
        label="Cerrar"
        iconName={IconNames.Close}
        labelVisibility={ButtonLabelVisibilities.Never}
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });
});
