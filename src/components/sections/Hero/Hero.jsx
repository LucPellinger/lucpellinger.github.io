// components/sections/Hero.jsx
import React from 'react';
import { FaDiscord, FaGithub, FaLinkedin, FaPlay,FaChevronDown } from 'react-icons/fa';
import hfLogo from '../../../assets/Hero/hf-logo.svg';
import HeroImg from '../../../assets/Hero/dev_2.png';
import './Hero.css';

const Hero = ({ onResumeClick }) => (

                <section className='hero-section' id='hero'>                    
                    <div className='hero-section__left'>
                        <div className='hero-section__special-text'>
                            Hello! I am <br /> Luc
                        </div>
                        <div className='hero-section__paragraph'>
                            <h3>
                                Data Scientist and ML Engineer professionally specialized 
                                in time series prediction, and passionate about computer vision technology.
                            </h3>
                        </div>
                        
                        <a onClick={ onResumeClick } className='button'>
                            View Resume
                        </a>
    
                        <div className='video-link'>
                            <div className='link'>
                                <a href='' target='_blank' rel='noopener noreferrer'>
                                    <FaPlay />
                                </a>
                            </div>
                            <span>(not available) Watch my introduction video on Youtube</span>
                        </div>
                    </div>
    
                    <div className='hero-section__right'>
                        <div className='hero-section__image'>
                            <img src={HeroImg} alt='hero image' />
                            <div className='hero-section__image-half-round-shape'></div>
                            <div className='social-links'>
                                {/*
                                <a href="">
                                    <FaDiscord />
                                </a>   
                                */}
                                <a href="https://www.linkedin.com/in/luc-pellinger/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                                <a href="https://github.com/LucPellinger"  target="_blank" rel="noopener noreferrer">
                                    <FaGithub />
                                </a>
                                <a href="https://huggingface.co/LucMarcelPellinger " target="_blank" rel="noopener noreferrer">
                                      <img src={hfLogo} alt="Hugging Face" style={{ width: '60px', height: '60px' }} />
                                </a>

                            </div>
                        </div>
                    </div>
                </section>

);

export default Hero;