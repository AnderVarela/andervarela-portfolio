import { fireEvent, render, screen, within } from '@testing-library/react';

import { SECTIONS } from '@/content/sections';
import { usePreferencesStore } from '@/stores/usePreferencesStore';
import { useProjectDetailStore } from '@/stores/useProjectDetailStore';

import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ language: 'es' });
  });

  afterEach(() => {
    useProjectDetailStore.getState().closeProject();
  });

  it('renders the eight sections with their anchors', () => {
    const { container } = render(<App />);

    SECTIONS.forEach((section) => {
      expect(container.querySelector(`section#${section.id}`)).toBeInTheDocument();
    });
  });

  it('presents the name as the page heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ander Varela');
  });

  it('translates the interface when another language is selected', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /English/ }));

    expect(screen.getByText("Hi, I'm")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
  });

  it('translates the content, not only the interface', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /English/ }));

    expect(screen.getByText(/I'm a frontend developer/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Corporate website/ })).toBeInTheDocument();
    expect(screen.getByText('Applied AI', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(/Soy desarrollador/)).not.toBeInTheDocument();
  });

  it('opens the detail of a project from its card', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /RequiFy/ }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'RequiFy' })).toBeInTheDocument();
    expect(window.location.hash).toBe('#proyectos/requify');
  });

  it('shows private projects as a case study without external links', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Gestión de facturas/ }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(/caso de estudio/)).toBeInTheDocument();
    expect(within(dialog).queryByRole('button', { name: /Ver/ })).not.toBeInTheDocument();
  });
});
