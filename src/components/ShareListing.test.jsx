import React from 'react';
import { render } from '@testing-library/react';
import ShareListing from './ShareListing';

describe('ShareListing component', () => {
  const testShares = [
    {
      id: 1,
      title: 'Test Share 1',
      user: { email: 'testuser1@example.com' },
      likes: 10,
      dislikes: 2,
      description: 'Lorem ipsum dolor sit amet',
      uid: 'abc123'
    },
    {
      id: 2,
      title: 'Test Share 2',
      user: { email: 'testuser2@example.com' },
      likes: 5,
      dislikes: 1,
      description: 'Consectetur adipiscing elit',
      uid: 'def456'
    }
  ];

  it('should render share listings correctly', () => {
    const { getAllByTestId } = render(<ShareListing items={testShares} />);

    // Ensure that each share's title, user, likes, dislikes, and description are rendered
    testShares.forEach((share, index) => {
      const title = getAllByTestId('share-title')[index];
      expect(title).toHaveTextContent(share.title);

      const user = getAllByTestId('share-user')[index];
      expect(user).toHaveTextContent(`Shared by: ${share.user.email}`);

      const description = getAllByTestId('share-description')[index];
      expect(description).toHaveTextContent(share.description.slice(0, 150));
    });
  });

  it('should render the YouTube video for each share', () => {
    const { getAllByTestId } = render(<ShareListing items={testShares} />);

    // Ensure that each share's YouTube video is rendered
    testShares.forEach((share, index) => {
      const video = getAllByTestId('share-video')[index];
      expect(video).toHaveAttribute('src', `https://www.youtube.com/embed/${share.uid}?rel=0`);
      expect(video).toHaveAttribute('allowFullScreen', '');
    });
  });
});
