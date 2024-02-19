import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FollowingFollowersHeader from './FollowingFollowersHeader';
import '@testing-library/jest-dom';
describe('FollowingFollowersHeader Component', () => {
    const mockProps = {
        name: 'John Doe',
        username: 'johndoe',
        curPage: 0,
        setCurPage: jest.fn(),
        navigateBack: jest.fn(),
    };

    it('should render FollowingFollowersHeader component', () => {
        const { getByText } = render(
            <FollowingFollowersHeader {...mockProps} />
        );
        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('@johndoe')).toBeInTheDocument();
    });

    it('should call navigateBack when go back button is clicked', () => {
        const { getByText } = render(
            <FollowingFollowersHeader {...mockProps} />
        );
        const goBackButton = getByText('🡠');
        fireEvent.click(goBackButton);
        expect(mockProps.navigateBack).toHaveBeenCalled();
    });

    it('should call setCurPage with correct value when Followers button is clicked', () => {
        const { getByText } = render(
            <FollowingFollowersHeader {...mockProps} />
        );
        const followersButton = getByText('Followers');
        fireEvent.click(followersButton);
        expect(mockProps.setCurPage).toHaveBeenCalledWith(0);
    });

    it('should call setCurPage with correct value when Following button is clicked', () => {
        const { getByText } = render(
            <FollowingFollowersHeader {...mockProps} />
        );
        const followingButton = getByText('Following');
        fireEvent.click(followingButton);
        expect(mockProps.setCurPage).toHaveBeenCalledWith(1);
    });
});
