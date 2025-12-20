function LinkOfProject(tyeLink:string){
    switch (tyeLink.toLowerCase()){
        case 'bootstrap':
            return (
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
                      crossOrigin="anonymous"/>
            )
        case 'fontawesome':
            return (
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
            )
    }
}

export default LinkOfProject;

