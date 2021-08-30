import React from 'react';
import avatar from '../../images/avatar-image.png';
import './About.css';

export default function About() {
  return (
    <section className="about">
      <img
        alt="A woman sitting on some grass meditating with her legs crossed"
        src={avatar}
        className="about__image"
      />
      <div className="about__text-wrapper">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          facilisis sagittis mollis. Nulla condimentum elit sapien, eget iaculis
          odio mattis sit amet. Curabitur eu tellus libero. Aliquam bibendum leo
          quis tellus auctor ullamcorper. Phasellus iaculis maximus ipsum nec
          mattis. Sed nisl enim, fermentum sit amet vulputate id, mattis ac
          tortor.
        </p>
      </div>
    </section>
  );
}
