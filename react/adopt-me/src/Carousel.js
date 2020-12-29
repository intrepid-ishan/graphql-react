import React from 'react';

class Carousel extends React.Component {

    //syntax reformat - babelrc
    state = {
        photos: [],
        active: 0
    };

    //or this.props.media.map in return
    static getDerivedStateFromProps({ media }) {
        let photos = ["http://placecorgi.com/600/600"];
        // console.log(media);
        if (media.length) {
            //extract large images only
            photos = media.map(({ large }) => large);
        }

        return { photos };
    }

    handleIndexClick = event => {
        this.setState({
            //dataset reads the data-xx, dataset.xx
            active: +event.target.dataset.index
        });
    };

    render() {
        const { photos, active } = this.state;
        return (
            <div className="carousel">
                {/* display image left */}
                <img src={photos[active]} alt="animal" />
                {/* active */}
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        //eslint-disable-next-line
                        <img
                            key={photo}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            src={photo}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;