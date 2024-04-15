const img = "/images/loading.svg";

export default function Loading() {
    return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <h2 className="my-5 mr-4">Loading...</h2>
            <img
                className="d-block"
                style={{ marginTop: "-0.75rem" }}
                src={img}
                alt="Loading..."
                height={74}
            />
        </div>
    );
}
