import React, { Component, Fragment } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import axios from 'axios'
import NasaLogo from '../NASA.png'
import RoversCard from './RoversCard'


export class Nasa extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      items: []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    axios.get(`https://api.unsplash.com/search/photos?query=space&client_id=1f6b0200db22c2cd781f3e176992a3493efa206febdac3647cb78095efc88629`)
    .then(res => {
      console.log(res.data.results)
      let array = []
      res.data.results.slice(-3).map(photo => {
        let item = {
          src: photo.urls.regular, 
          altText: photo.description +' photo by '+photo.user.name, 
          caption: photo.description.charAt(0).toUpperCase()+ photo.description.slice(1),
          created_at: photo.created_at
        }
        array.push(item)
      })
      this.setState({items:array})
    })
    .catch(err => console.log(err))
   
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
    const { activeIndex } = this.state;
    const {items} = this.state;
    const imgStyle = {maxHeight: 500}
    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="d-block w-100" style={imgStyle} src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.created_at}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <div className="container mb-5">
      <h1 className=" display-4 text-center mb-3">
      <img src={NasaLogo} alt="Nasa Logo"/>
      Goodies
      </h1>
        <Carousel
          style={{ marginTop: -5 }}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
        <RoversCard></RoversCard>
      </div>
    );
  }
}

export default Nasa;

