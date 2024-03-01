const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    // const newsList = data.data.news_category;
    // console.log(newsList);
    const categoryContainer = document.getElementById('category-bar-container');
    data.data.news_category.forEach(item => {
        // console.log(item);
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadNews('${item.category_id}')" class="btn btn-accent">${item.category_name}</button>
        `
        categoryContainer.appendChild(div);
    });
}

const loadNews = async (catId) => {
    toogleHandleSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await res.json();
    // const newsList = data.data;
    // console.log(newsList);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    data.data.forEach(item => {
        toogleHandleSpinner(false);
        //console.log(item);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="${item.image_url}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${item.title}</h2>
                    <p>${item.details.slice(0, 200)}</p>
                    <div class="card-actions justify-end">
                        <button onclick="loadTitle('${item.title}')" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div);
    });

}

const loadTitle = (title) => {
    console.log(title);
}

const handleSearch = () => {
    const searchValue = document.getElementById("search-box").value;
    if (searchValue) {
        loadNews(searchValue)
    }

    else {
        alert("Please enter a valid category id")
    }
}

const toogleHandleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");
    }
}

loadNews("01");
loadCategory();