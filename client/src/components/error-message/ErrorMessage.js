import imgError from "./error.gif";

const ErrorMessage = ({ width }) => {
    if (width) {
        return (
            <img src={imgError}
                alt="erorr img"
                style={{ display: "block", width: "100%", height: "250px", objectFit: "contain", margin: "0 auto", borderRadius: "100%" }} />
        );
    }
    return (
        <img src={imgError}
            alt="erorr img"
            style={{ display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "0 auto", borderRadius: "100%" }} />

    );
}

export default ErrorMessage; 