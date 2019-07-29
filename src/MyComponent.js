import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            awardees: []
        };
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // more records in 1.5 secs
        setTimeout(() => {
            fetch("https://chroniclingamerica.loc.gov/awardees.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        awardees: this.state.awardees.concat(result.awardees)
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    });
                }
            )
        }, 1500);
      };

    componentDidMount() {
        fetch("https://chroniclingamerica.loc.gov/awardees.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        awardees: result.awardees
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, awardees } = this.state;
        if (error) {
            return <div>An error has occurred.</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <InfiniteScroll
                        dataLength={this.state.awardees.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        {awardees.map(awardee => (
                            <p class="awardee">
                                <a href={awardee.url}>{awardee.name}</a>
                            </p>
                        ))}
                    </InfiniteScroll>
                </div>
            );
        }
    }
}

export default MyComponent;
