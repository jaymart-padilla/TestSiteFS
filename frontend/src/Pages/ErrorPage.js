const img = "/images/card-grid/snow.svg";

export default function ErrorPage({ message = "404 Not Found" }) {
    return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <h2 className="my-5 mr-4">{message}</h2>
            <img
                className="d-block"
                style={{ marginTop: "-0.75rem" }}
                src={img}
                alt={message}
                height={74}
            />
        </div>
    );
}
