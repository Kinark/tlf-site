/* eslint-disable react/no-array-index-key */
import React from 'react';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Gallery extends React.Component {
   static propTypes = {
      images: PropTypes.arrayOf(PropTypes.shape({
         src: PropTypes.string
      })).isRequired,
      height: PropTypes.string,
   }

   static defaultProps = {
      height: '135'
   }

   state = {
      isOpen: false,
      currentImage: 0,
   };

   openLightbox = (i, e) => {
      if (e && e.preventDefault) e.preventDefault()
      this.setState({ currentImage: i, isOpen: true })
   }

   closeLightbox = () => this.setState({ isOpen: false })

   gotoImage = i => this.setState({ currentImage: i })

   // eslint-disable-next-line react/destructuring-assignment
   nextImage = () => this.gotoImage(this.state.currentImage + 1)

   // eslint-disable-next-line react/destructuring-assignment
   prevImage = () => this.gotoImage(this.state.currentImage - 1)

   render() {
      const { images, height, ...rest } = this.props;
      const { currentImage, isOpen } = this.state;
      return (
         <React.Fragment>
            <div>
               {images.map((img, i) => (
                  <a href={img.src} key={i} onClick={e => this.openLightbox(i, e)}>
                     <img className={styles.thumb} height={height} src={img.src} alt={img.caption || ''} />
                  </a>
               ))}
            </div>
            <Lightbox
               images={images}
               isOpen={isOpen}
               onClose={this.closeLightbox}
               currentImage={currentImage}
               onClickThumbnail={this.gotoImage}
               onClickNext={this.nextImage}
               onClickPrev={this.prevImage}
               backdropClosesModal
               {...rest}
            />
         </React.Fragment>
      );
   }
}
