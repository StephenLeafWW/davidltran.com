import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PostListing from '../components/PostListing';

const ArchivesPage = styled.div`
  ul {
    list-style: none;
    margin: 0;
  }
`;

export default class Archives extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              id: PropTypes.string,
              fields: PropTypes.shape({
                slug: PropTypes.string,
              }),
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
              }),
            }),
          })
        ),
      }),
    }),
  };

  static defaultProps = {
    data: {
      allMarkdownRemark: {
        edges: [
          {
            node: {
              id: 'Default',
              fields: {
                slug: '/default/',
              },
              frontmatter: {
                title: 'Default Title',
                date: '1970-01-01',
              },
            },
          },
        ],
      },
    },
  };

  render() {
    const { data } = this.props;

    return (
      <ArchivesPage>
        <h1>Archives</h1>
        <ul>
          {data.allMarkdownRemark.edges.map(({ node: post }) => (
            <PostListing
              key={post.id}
              slug={post.fields.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
            />
          ))}
        </ul>
      </ArchivesPage>
    );
  }
}

export const query = graphql`
  query ArchivesQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;
