import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    page: 1,
    photos: [],
    isVisible: false,
  };

  hendleSubmit = query => {
    this.setState({ search: query, photos: [], page: 1 });
  };

  componentDidUpdate(props, prevState) {
    if (this.state.search === '') {
      return <h1>Sorry, type some text in search form</h1>;
    }
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      ImageService.getImages(this.state.search, this.state.page).then(
        response =>
          this.setState(prevState => ({
            photos: [...prevState.photos, ...response.data.photos],
            isVisible:
              response.data.page <
              Math.ceil(response.data.total_results / response.data.per_page),
          }))
      );
    }
  }
  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.hendleSubmit} />
        <Grid>
          {this.state.photos.length > 0 &&
            this.state.photos.map(({ id, avg_color, src, alt }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>

        {!this.state.photos.length && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {this.state.isVisible && <Button onClick={this.loadMoreBtn}>Load More</Button>}
      </>
    );
  }
}
