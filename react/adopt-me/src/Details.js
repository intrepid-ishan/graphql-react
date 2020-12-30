import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
class Details extends React.Component {
    state = { loading: true };

    componentDidMount() {
        pet
            .animal(+this.props.id)//id is string, + used to convert in in number
            .then(({ animal }) => {
                this.setState({
                    name: animal.name,
                    animal: animal.type,
                    location: `${animal.contact.address.city}, ${animal.contact.address.state
                        }`,
                    description: animal.description,
                    media: animal.photos,
                    breed: animal.breeds.primary,
                    loading: false
                });
            })
            .catch(err => this.setState({ error: err }));
        // throw new Error("lol");
    }


    render() {
        if (this.state.loading) {
            return <h1>loading....</h1>;
        }

        const { animal, breed, location, description, media, name } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {/* {[theme,setTheme] => ()} */}
                        {(theme) => (
                            <button style={{ backgroundColor: theme[0].buttonColor }}>
                                Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

//to wrap Details 
const DetailsErrorBoundary = (props) => {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
};

export default DetailsErrorBoundary;
