function LinkOfProject({ tyeLink }: { tyeLink: string }) {
    switch (tyeLink.toLowerCase()) {
        case 'bootstrap':
            return (
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                    crossOrigin="anonymous"
                />
            );
        case 'fontawesome':
            return (
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                />
            );
        default:
            return null; // Luôn trả về null nếu không khớp để tránh lỗi render
    }
}

export default LinkOfProject;