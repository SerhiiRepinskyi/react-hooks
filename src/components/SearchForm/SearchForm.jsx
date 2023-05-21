import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
state = {
  searchQuery: ''
}

handleFormSubmit = (e) => {
e.preventDefault();
this.props.onSubmit(this.state.searchQuery)
this.setState({searchQuery: ''})
}
  render() {
    
    return <SearchFormStyled onSubmit={this.handleFormSubmit}>
    <FormBtn type="submit">
      <FiSearch size="16px" />
    </FormBtn>
    <InputSearch
      placeholder="What do you want to write?"
      name="search"
      required
      autoFocus
      value={this.state.searchQuery}
      onChange={(e) => this.setState({searchQuery: e.target.value})}
    />
  </SearchFormStyled>;
  }
}
