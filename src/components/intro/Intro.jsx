import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import './intro.css';
const Intro = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D&w=1000&q=80" },
    { url: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-types-feature-1280x720.jpg" },
    { url: "https://phototraces.b-cdn.net/wp-content/uploads/2020/01/id_Wildlife_Photography_24_Eagle_Hunting_Fish_in_River.jpg" },
    { url: "https://beautifulglobal.com/wp-content/uploads/2020/03/Drone-Camera-and-Accessories-1024x769.jpg" },
    { url: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fHww&w=1000&q=80" },
  ];

  return (
    <div className='intro'>
      <div className="introDiscription">
        <p>The Photography Club at the university is a vibrant and engaging community that brings together students with a shared passion for photography. The club provides a platform for photography enthusiasts to explore their creativity, learn new skills, and connect with like-minded individuals.</p>
        <p>The club organizes a wide range of activities and events that cater to photographers of all levels, from beginners to advanced practitioners. These activities include workshops, photo walks, guest lectures by renowned photographers, photo competitions, exhibitions, and collaborative projects.</p>
        <p>One of the primary goals of the club is to foster a supportive and inclusive environment where members can learn from each other, exchange ideas, and grow as photographers. Whether someone is just starting out or has been practicing photography for years, they will find opportunities to enhance their skills, gain valuable insights, and receive constructive feedback on their work.</p>
      </div>
      <div className="introPhotos introBorder">
  <div className="slider-container">
    <SimpleImageSlider
      width={250}
      height={160}
      images={images}
      showBullets={true}
      showNavs={true}
      autoPlay={true}
      slideDuration={0.5}
    />
  </div>
</div>
    </div>
  )
}

export default Intro
