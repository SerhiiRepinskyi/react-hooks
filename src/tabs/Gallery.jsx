import { useState, useEffect } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const hendleSubmit = query => {
    setSearch(query);
    setPhotos([]);
    setPage(1);
  };

  useEffect(() => {
    if (search === '') {
      return 
    }

    ImageService.getImages(search, page).then(response => {
      setPhotos(prevState => [...prevState, ...response.data.photos]);
      setIsVisible(
        response.data.page <
          Math.ceil(response.data.total_results / response.data.per_page)
      );
    });
  }, [search, page]);

  const loadMoreBtn = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchForm onSubmit={hendleSubmit} />
      <Grid>
        {photos.length > 0 &&
          photos.map(({ id, avg_color, src, alt }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
      </Grid>

      {!photos.length && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {isVisible && <Button onClick={loadMoreBtn}>Load More</Button>}
    </>
  );
};
