
const searchBook = () => {
    const searchField = document.getElementById('search-Field');
    const loading = document.getElementById('loading-content');
    const searchText = searchField.value;

    // Checking Whether the Input value Is Not Empty
    if(searchField.value !== '' ){
        loading.classList.remove("hide");
        loading.classList.add("show");

        // Calling the Function for based on Search Text
        const urlforText = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(urlforText)
        .then( res => res.json())
        .then( data => displaySearchResult(data.docs))

        // calling the Function for the showing the Total Result
        const urlforTextAmount = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(urlforTextAmount)
        .then( res => res.json())
        .then( data => displayResultAmount(data.docs))
    }

    // checking the Input is Null
   if ( searchField.value.trim() === '' ) {
        alert('Enter a Book Name ');
   }
        searchField.value = '';
}

const displayResultAmount = docs => {   
    const displayResult = document.getElementById('Display-Result');
    displayResult.textContent = ''; // making the display result Empty
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100 bg-success text-white">
             <div class="card-body">
                 <h5 class="card-title"> Showing Result Out Of ${docs.length} . . . </h5>
             </div>
         </div>
        `;
        displayResult.appendChild(div);
    ;
}

const displaySearchResult = books => {
    const loading = document.getElementById('loading-content');
    loading.classList.remove("show");
    loading.classList.add("hide");
    const slice = books.slice(0, 20);
    const searchResult = document.getElementById('search-Result');
    searchResult.textContent = ''; // Making the searchResult Null
    slice.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
         <div class="card h-100">
             <img width=" " src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
             <div class="card-body">
                 <h5 class="card-title fw-1 fw-bolder">Title: ${book.title} </h5>
                 <h5 class="card-title fw-3 text-success">Aurthor: ${book.author_name} </h5>
                 <p class="card-text fw-4 "> First Publish Year: ${book.first_publish_year} </p>
                 <p class="card-text fw-5">Publisher: ${book.publisher} </p>
             </div>
         </div>
        `;
        searchResult.appendChild(div);
    });
}


