import Button from "../components/button"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

test("Button to be in Nav", () => {
    render(<Button />);
    const login = screen.getByRole("button");
    expect(login).toBeInTheDocument();
});