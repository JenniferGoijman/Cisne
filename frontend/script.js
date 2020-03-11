//Carga peliculas por popularidad por default
axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then(res => {
        const peliculas = res.data.results
        peliculas.forEach(pelicula => {
            document.querySelector('.peliculas').innerHTML += `
            <div class="card" style="width: 10rem;" id=${pelicula.id}>
                <img src="http://image.tmdb.org/t/p/w185/${pelicula.poster_path}" class="card-img-top" alt="..." 
                onclick="getMovieById(event, ${pelicula.id})">
                <div class="card-body">
                    <h6 class="card-title">${pelicula.title}</h6>
                </div>
            </div>`
        }) //img: data-toggle="modal" data-target="#exampleModal"
    })
    .catch(error => console.error(error))

//Carga generos en dropdown por default
axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res => {
        const generos = res.data.genres;
        generos.forEach(genero => {
            document.querySelector('.listaGeneros').innerHTML += ` <a class="dropdown-item" href="#" id=${genero.id} onclick="getMoviesByGenre(event, ${genero.id})">${genero.name}</a>`;
        })
    })
    .catch(error => console.error(error))

document.querySelector('input.form-control.mr-sm-2').addEventListener("keyup", function (event) {
    busqueda = event.target.value;
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + busqueda)
        .then(res => {
            const peliculas = res.data.results;
            if (peliculas.length > 0) {
                document.querySelector('.peliculas').innerHTML = '';
                peliculas.forEach(pelicula => {
                    document.querySelector('.peliculas').innerHTML += `
                    <div class="card" style="width: 10rem;" id=${pelicula.id}>
                    <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." data-toggle="modal" data-target="#exampleModal">
                    <div class="card-body">
                    <h6 class="card-title">${pelicula.title}</h6>
                    </div>
                    </div>`;
                })
            } else {
                document.querySelector('.peliculas').innerHTML = '';
            }
        })
        .catch(error => console.error(error))
})

function getMovieById(event, movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`)
        .then(res => {
            const pelicula = res.data;
            let generos = '';
            pelicula.genres.forEach(genre => {
                generos += genre.name + ", "
            });
            alert("Titulo: " + pelicula.title + "; Descripción: " + pelicula.overview + "; Generos: " + generos);
        })
        .catch(error => console.error(error))
}

function getMoviesByGenre(event, genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            if (peliculas.length > 0) {
                document.querySelector('.peliculas').innerHTML = '';
                peliculas.forEach(pelicula => {
                    document.querySelector('.peliculas').innerHTML += `
                <div class="card" style="width: 11rem;" id=${pelicula.id}>
                <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." data-toggle="modal" data-target="#exampleModal">
                <div class="card-body">
                <h6 class="card-title">${pelicula.title}</h6>
                </div>
                </div>`;
                })
            } else {
                document.querySelector('.peliculas').innerHTML = '';
            }
        })
        .catch(error => console.error(error))
}


/*
function getMoviesInput (event) {
        if (event.key === "Enter" || event.type === "click") {
            if (document.querySelector('.form-control').value != '') {
            busqueda = event.target.value;
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query='+busqueda)
            .then(res=>{ 
                const peliculas = res.data.results;
                document.querySelector('.peliculas').innerHTML = '';
                console.log(peliculas[0].title);
                peliculas.forEach(pelicula => {
                    console.log(pelicula.title);
                    document.querySelector('.peliculas').innerHTML +=`
                    <div class="card" style="width: 11rem;" id=${pelicula.id}>
                        <img src="http://image.tmdb.org/t/p/w185/${pelicula.poster_path}" class="card-img-top" alt="..." data-toggle="modal" data-target="#exampleModal">
                        <div class="card-body">
                            <h6 class="card-title">${pelicula.title}</h6>
                        </div>
                    </div>`;
                })
            })
            .catch(error => console.error(error))
        }
}
*/

/*
function showModal() {
    document.querySelector('.modal').innerHTML +=`
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Con amor, Simon</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <img src="http://image.tmdb.org/t/p/w342/zaUWIdiXvKWydu9QxtsY7RUu8Kv.jpg" class="card-img-left" alt="...">
                        <div class="modalInfo">
                            <div>
                                Simon Spier es un joven 16 años que no se atreve a revelar su homosexualidad, ya que prefiere
                                esperar al musical que se celebra en secundaria. Pero un día, uno de sus correos electrónicos llega
                                a manos equivocadas y las cosas se complican extraordinariamente.
                            </div><br>
                            <div>
                                Géneros 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
    }



//<p class="card-text">${pelicula.overview}</p>
//<a href="#" class="btn btn-primary">Go somewhere</a>
*/