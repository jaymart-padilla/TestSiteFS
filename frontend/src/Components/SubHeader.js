export default function SubHeader({ title, description = "" }) {
    return (
        <>
            <h3 className="text-center mb-4 subheader">{title}</h3>
            {description && (
                <p className="text-center font-weight-light">{description}</p>
            )}
            <style jsx>
                {`
                    .subheader {
                        position: relative;
                        text-transform: uppercase;
                        font-weight: bold;
                    }
                    .subheader::after {
                        content: "";
                        position: absolute;
                        bottom: -0.85rem;
                        left: 50%;
                        right: 50%;
                        transform: translateX(-50%);
                        width: 3.5ch;
                        height: 0.175rem;
                        background-color: var(--accent-color);
                    }
                `}
            </style>
        </>
    );
}
