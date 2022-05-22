(async () => {

    const repository = document.currentScript.getAttribute('repository');
    const icon_star  = document.currentScript.getAttribute('star') ?? null;
    const text       = document.currentScript.getAttribute('text') ?? null;

    if (repository) {

        let request = await fetch(`https://api.github.com/repos/${ repository }`);

        try {

            let data = await request.json();

            if (document.querySelector(".dpxgithubrating")) {

                let elements;

                if (document.querySelector(`.dpxgithubrating[repository='${ repository }']`)) {

                    elements = document.querySelectorAll(`.dpxgithubrating[repository='${ repository }']`);

                }else{

                    elements = document.querySelectorAll(`.dpxgithubrating`);

                }

                for (let i = 0; i < elements.length; i++) {

                    elements[i].appendChild(DPXCreateGithubRatingElement(data.html_url, data.stargazers_count, data.full_name, text, icon_star));

                }

            }else{

                document.body.appendChild(DPXCreateGithubRatingElement(data.html_url, data.stargazers_count, data.full_name, text, icon_star));

            }

        }catch(e) {

            console.log("DPXGithubRating Error : ", e);

        }
        
    }

})();

const DPXCreateGithubRatingElement = (repository_url, stargazers_count, title, text = null, star = null) => {

    let anchor    = document.createElement('a');
    anchor.href   = repository_url;
    anchor.title  = title;
    anchor.target = "_blank";
    anchor.rel    = "noopener";
    anchor.classList.add('DPXGithubRatingButton');

    if (star) {
        
        let i = document.createElement('i');
        i.classList.add(star);
        anchor.appendChild(i);

    }

    if (text) {

        let span = document.createElement('span');
        span.innerText = text;
        anchor.appendChild(span);

    }

    let b = document.createElement('b');
    b.innerText = stargazers_count;
    anchor.appendChild(b);

    return anchor;

};