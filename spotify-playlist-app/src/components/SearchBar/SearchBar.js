import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    handleEnter(e) {
        if (e.charCode === 13) {
            this.search();
        }
    }

    render() {
        return (
            <div className="SearchBar" onKeyPress={this.handleEnter}>
                <input onChange={this.handleTermChange}
                    placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;