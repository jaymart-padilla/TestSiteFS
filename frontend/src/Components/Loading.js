const img = "/images/loading.svg";

export default function Loading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center h-100"
            style={{ marginTop: "-1.5rem" }}
        >
            <h2 className="mr-4">Loading...</h2>
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
