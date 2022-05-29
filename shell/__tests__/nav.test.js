import Nav from "../components/nav"
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

afterEach(cleanup)

test("Nav Img to be in Document", () => {

    render(<Nav user={true} login={jest.fn()} logout={jest.fn()}/>);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('alt', 'profile');
});

test("Nav Img to Not to be in Document", () => {
    
    render(<Nav user={false} login={jest.fn()} logout={jest.fn()}/>);
    const logo = screen.queryByRole('img');
    expect(logo).toBeNull();
});
