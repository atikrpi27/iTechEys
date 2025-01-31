import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
// slider
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "../style/homepage.css";
// icon
import { MdOutlineDoubleArrow, MdOutlineSearch } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";

// Component import
import Sidebar from "../components/Home/Sidebar.js";
import Image_with_title_sidebar from "../components/Home/Image_with_title_sidebar";

const Home = () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [post, setPost] = useState([]);
    const [latestPost, setLatestPost] = useState([]);

    const url = `${SERVER_URL}`;
    console.log("home url------", process.env);
    useEffect(() => {
        axios({
            method: "get",
            url: url,
        }).then(function (response) {
            setPost(response.data);
            setLatestPost(response.data[0]);
        });
    }, []);

    // Load more functionality
    const [loadIndex, setloadendIndex] = useState(4);
    function calculateSliceArgs(item) {
        const endIndex = loadIndex + 2;
        console.log(endIndex, item);
        setloadendIndex(endIndex);
    }

    return (
        <div className="Main-Container container-fluid ">
            <section className="Section-1 mt-3">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="home-slider">
                            <Carousel>
                                {post &&
                                    post.map((Item, index) => {
                                        const { id, title, slug, description, image, category } = Item;
                                        return (
                                            <Carousel.Item key={index}>
                                                <div className="banner-img-overla">
                                                    <img className="d-block w-100" src={image} alt="First slide" />
                                                </div>
                                                <Carousel.Caption>
                                                    <h3>{title}</h3>
                                                    <p>{description}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        );
                                    })}
                            </Carousel>
                        </div>
                        {/* <div className="main-banner">
                            <div className="banner-img">
                                <div className="banner-img-overlay">
                                    <img src={latestPost.image} alt="image" />
                                </div>
                            </div>
                            <div className="post-content text-white">
                                <Link
                                    className="post-title post_title"
                                    to={`blog-details/${slug}`}
                                    state={{ title, description, image }}
                                >
                                    {latestPost.title}
                                </Link>
                                <span className="latestPostDec">
                                    {latestPost.description}
                                </span>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 pl-0 side-title">
                        <ul className="ps-0">
                            {post.map((Item, index) => {
                                const { id, title, slug, description, image, category } = Item;
                                return (
                                    <li key={index}>
                                        <Link
                                            className="d-flex align-items-center"
                                            to={`blog-details/${slug}`}
                                            state={{ id, title, description, image }}
                                        >
                                            <IoChevronForwardOutline />
                                            <p className="text-justify post_title m-0">{title}</p>
                                        </Link>
                                        <hr className="m-2 ms-0" />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>
            <section className="Section-2 my-4">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div className="Sec-2-title d-flex align-items-center p-2">
                            <MdOutlineDoubleArrow />
                            {/* <marquee behavior="scroll" direction="left"> */}
                            <h6 className="m-0">
                                <Link to={`blog-details/${latestPost?.slug}`}>{latestPost?.title}</Link>
                            </h6>
                            {/* </marquee> */}
                            <Link to={`blog-details/${latestPost?.slug}`} className="button button-pulse ms-auto">
                                বিস্তারিত
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="search mt-sm-2 mt-md-0 mt-lg-0">
                            <MdOutlineSearch className="fa fa-search" />
                            <input type="text" className="form-control" placeholder="সার্চ করুন iTecheys জুড়ে" />
                            <button className="btn btn-primary p-0">Search</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="Section-3">
                <div className="row mb-30">
                    <div className="col-lg-8 col-md-8 Card-container">
                        <div className="Card-body">
                            <div className="row">
                                {post.slice(0, loadIndex).map((Item, index) => (
                                    <PostCard item={Item} key={index} />
                                ))}
                                <div className="col-lg-12 mb-3 text-center">
                                    <button
                                        className="btn-animate"
                                        onClick={() => calculateSliceArgs(2)}
                                        disabled={post.length === loadIndex ? "true" : ""}
                                    >
                                        <span>Load More</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 blog-aside">
                        <Sidebar post={post} />
                        <div className="Sidebar bg-white p-3 mt-4">
                            <Image_with_title_sidebar post={post} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="Section-4">
                <div className="row mb-30">
                    <div className="col-lg-8 col-md-8">
                        <div className="Post__gallary">
                            {post &&
                                post.slice(0, 6).map((item, index) => {
                                    const { title, slug, author, category, image } = item;
                                    const gridClass =
                                        index === 0
                                            ? "big"
                                            : "" || index === 1
                                            ? "vertical"
                                            : "" || index === 3
                                            ? "vertical"
                                            : "" || index === 5
                                            ? "horizontal"
                                            : "";

                                    return (
                                        <div className={`gallery-item ${gridClass}`}>
                                            <div className="gallery_img">
                                                <img src={image} />
                                            </div>
                                            <div className="overlay">
                                                <Link to={`blog-details/${slug}`}>
                                                    <TextTruncate line={2} element="p" text={title} />
                                                </Link>
                                                <div className="post-card-meta pb-1">
                                                    <Link to={`/author-profile/${author.username}`}>
                                                        <div className="post-card-author">
                                                            <div className="post-author-image">
                                                                <img
                                                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                                    alt="author profile image"
                                                                />
                                                            </div>
                                                            <div className="post-author-username">
                                                                {author.username}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <p className="post-tag">
                                                        <Link to={`blog-details/${slug}`}>Read More</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4"></div>
                </div>
            </section>
            {/* <section-5>
                <div className="row">
                    <div className="owl-carousel owl-theme">
                        <div className="card hoverable">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator" src="http://placehold.it/1920/999/fff" />
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    Card Title<i className="material-icons right">more_vert</i>
                                </span>
                                <p>
                                    <a href="https://codepen.io/collection/nbBqgY/" target="_blank">
                                        This is a link
                                    </a>
                                </p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    Card Title<i className="material-icons right">close</i>
                                </span>
                                <p>
                                    Here is some more information about this product that is only revealed once clicked
                                    on.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section-5> */}
            <OwlCarousel className="owl-theme" loop margin={10} nav>
                <div className="item">
                    <h4>1</h4>
                </div>
                <div className="item">
                    <h4>2</h4>
                </div>
                <div className="item">
                    <h4>3</h4>
                </div>
                <div className="item">
                    <h4>4</h4>
                </div>
                <div className="item">
                    <h4>5</h4>
                </div>
                <div className="item">
                    <h4>6</h4>
                </div>
                <div className="item">
                    <h4>7</h4>
                </div>
                <div className="item">
                    <h4>8</h4>
                </div>
                <div className="item">
                    <h4>9</h4>
                </div>
                <div className="item">
                    <h4>10</h4>
                </div>
                <div className="item">
                    <h4>11</h4>
                </div>
                <div className="item">
                    <h4>12</h4>
                </div>
            </OwlCarousel>
            ;
        </div>
    );
};

const PostCard = ({ item }) => {
    const { id, title, slug, description, image, author, category } = item;
    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
            <Link to={`blog-details/${slug}`}>
                <div className="post-card">
                    <div className="post-card-img">
                        <img className="post-banner" src={image} alt="post image" />
                        <div className="post-card-meta">
                            <Link to={`/author-profile/${author.username}`}>
                                <div className="post-card-author">
                                    <div className="post-author-image">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                            alt="author profile image"
                                        />
                                    </div>
                                    <div className="post-author-username">{author.username}</div>
                                </div>
                            </Link>
                            <p className="post-tag">{category.name}</p>
                        </div>
                    </div>
                    <div className="post-card-body">
                        <abbr title={title}>
                            <h4 className="post-title">{title}</h4>
                        </abbr>
                        <p className="post-body">{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Home;
