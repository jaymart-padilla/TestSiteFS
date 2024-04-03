import IndexLayout from "../Layouts/IndexLayout";

const err_msg = "404 Not Found";
const img = "/images/card-grid/snow.svg";

export default function ErrorPage() {
    return (
        <IndexLayout>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <h2 className="my-5 mr-4">{err_msg}</h2>
                <img
                    className="d-block"
                    style={{ marginTop: "-0.75rem" }}
                    src={img}
                    alt={err_msg}
                    height={74}
                />
            </div>
        </IndexLayout>
    );
}
