function Banner(props) {

    const BannerSize = {
        fontSize: props.size + 'px',
    };

    return (
    <div style={BannerSize}>
        {props.text}
    </div>
    );
}

export default Banner;