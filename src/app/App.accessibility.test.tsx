import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';

import { SECTIONS } from '@/content/sections';
import { Languages } from '@/i18n/languages';
import { useMobileMenuStore } from '@/stores/useMobileMenuStore';
import { usePreferencesStore } from '@/stores/usePreferencesStore';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';

import { App } from './App';

/* jsdom no pinta, así que el contraste se comprueba aparte y aquí se desactiva. */
const AXE_OPTIONS: axe.RunOptions = { rules: { 'color-contrast': { enabled: false } } };

async function findAccessibilityViolations(container: Element): Promise<string[]> {
  const results = await axe.run(container, AXE_OPTIONS);

  return results.violations.map((violation) => `${violation.id}: ${violation.help}`);
}

describe('App accessibility', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ language: Languages.Spanish });
  });

  afterEach(() => {
    useProjectDetailStore.getState().closeProject();
    useMobileMenuStore.getState().closeMenu();
  });

  it('has no automatically detectable violations on the page', async () => {
    const { container } = render(<App />);

    expect(await findAccessibilityViolations(container)).toEqual([]);
  });

  it('has no automatically detectable violations with a project detail open', async () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /RequiFy/ }));

    expect(await findAccessibilityViolations(container)).toEqual([]);
  });

  it('has no automatically detectable violations with the mobile menu open', async () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Menú' }));

    expect(await findAccessibilityViolations(container)).toEqual([]);
  });

  it('names every section region after its heading', () => {
    render(<App />);

    expect(screen.getAllByRole('region')).toHaveLength(SECTIONS.length);
    expect(screen.getByRole('region', { name: 'Proyectos' })).toBeInTheDocument();
  });

  it('offers a keyboard link at the start of every section to skip it', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Saltar a Sobre mí' })).toHaveAttribute(
      'href',
      '#sobre-mi',
    );
    expect(screen.getByRole('link', { name: 'Saltar a Contacto' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute(
      'href',
      '#inicio',
    );
  });

  it('takes the rest of the page out of reach while a dialog is open', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /RequiFy/ }));

    expect(screen.getByRole('main', { hidden: true }).closest('[inert]')).not.toBeNull();
  });

  it('closes the project detail with Escape once it has collapsed', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /RequiFy/ }));

    fireEvent.keyDown(window, { key: 'Escape' });
    vi.advanceTimersByTime(600);

    expect(useProjectDetailStore.getState().openProjectIndex).toBeNull();
    vi.useRealTimers();
  });

  it('moves between projects with the arrow keys', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /RequiFy/ }));

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(screen.getByRole('heading', { name: 'Este portfolio' })).toBeInTheDocument();
  });

  it('moves focus into the mobile menu and closes it with Escape', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Menú' }));
    vi.advanceTimersByTime(600);

    expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
